version = "2.16.10"
configVersion = 31
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
# Import other module files
# print("Importing Script Modules...")
from Scripts.shared_imports import *
import json
import Scripts.auth as auth
import Scripts.validation as validation
import Scripts.utils as utils
import Scripts.files as files
import Scripts.logging as logging
import Scripts.operations as operations
import Scripts.prepare_modes as modes
from Scripts.community_downloader import main as get_community_comments #Args = post's ID, comment limit
import Scripts.community_downloader as community_downloader
from Scripts.utils import choice

# print("Importing Standard Libraries...")
# Standard Libraries
import time
import ast
from dataclasses import dataclass
from datetime import datetime, timedelta
from collections import namedtuple
import platform
import json
from pkg_resources import parse_version

# print("Importing Third-Party Modules...")
# Other Libraries
from googleapiclient.errors import HttpError



##########################################################################################
##########################################################################################
###################################### MAIN ##############################################
##########################################################################################
##########################################################################################


def main():
  # Declare Global Variables
  global YOUTUBE
  global CURRENTUSER
  User = namedtuple('User', 'id name configMatch')

  # Some Typehints
  scanMode: str
  config: dict
  jsonData: dict
  versionInfoJson: dict

  # Authenticate with the Google API - If token expired and invalid, deletes and re-authenticates
  YOUTUBE = auth.first_authentication()

           #### Prepare Resources ####
  resourceFolder = RESOURCES_FOLDER_NAME
  whitelistPathWithName = os.path.join(resourceFolder, "whitelist.txt")
  spamListFolder = os.path.join(resourceFolder, "Spam_Lists")
  spamListDict = {
      'Lists': {
        'Domains':  {'FileName': "SpamDomainsList.txt"},
        'Accounts': {'FileName': "SpamAccountsList.txt"},
        'Threads':  {'FileName': "SpamThreadsList.txt"}
      },
      'Meta': {
        'VersionInfo': {'FileName': "SpamVersionInfo.json"},
        'SpamListFolder': spamListFolder
        #'LatestLocalVersion': {}
      }
  }
  resourcesDict = {
    'Whitelist': {
      'PathWithName': whitelistPathWithName,
      'FileName': "whitelist.txt",
    }
  }

  # print("Checking for updates to program and spam lists...")
  # Check if resources and spam list folders exist, and create them
  if not os.path.isdir(resourceFolder):
    try:
      os.mkdir(resourceFolder)
      # Create readme
      with open(os.path.join(resourceFolder, "_What_Is_This_Folder.txt"), "w") as f:
        f.write("# This Resources folder is used to store resources required for the YT Spammer Purge program.\n")
        f.write("# Note: If you had a previous spam_lists folder that was created in the same folder as \n")
        f.write("# the .exe file, you can delete that old spam_lists folder. The resources folder is the \n")
        f.write("# new location they will be stored.\n")
                
    except:
      print("\nError: Could not create folder. To update the spam lists, try creating a folder called 'Resources',")
      print("       then inside that, create another folder called 'Spam_Lists'.")
      print("Press Enter to continue...")

  if os.path.isdir(resourceFolder) and not os.path.isdir(spamListFolder):
    try:
      os.mkdir(spamListFolder)
    except:
      print("\nError: Could not create folder. To update the spam lists, go into the 'Resources' folder,")
      print("       then inside that, create another folder called 'Spam_Lists'.")

  # Prepare to check and ingest spammer list files
  # Iterate and get paths of each list
  for x,spamList in spamListDict['Lists'].items():
    spamList['Path'] = os.path.join(spamListFolder, spamList['FileName'])
  spamListDict['Meta']['VersionInfo']['Path'] = os.path.join(spamListFolder, spamListDict['Meta']['VersionInfo']['FileName']) # Path to version included in packaged assets folder

  # Check if each spam list exists, if not copy from assets, then get local version number, calculate latest version number
  latestLocalSpamListVersion = "1900.12.31"
  for x, spamList in spamListDict['Lists'].items():
    if not os.path.exists(spamList['Path']):
      files.copy_asset_file(spamList['FileName'], spamList['Path'])

    listVersion = files.get_list_file_version(spamList['Path'])
    spamList['Version'] = listVersion
    if listVersion and parse_version(listVersion) > parse_version(latestLocalSpamListVersion):
      latestLocalSpamListVersion = listVersion

  spamListDict['Meta']['VersionInfo']['LatestLocalVersion'] = latestLocalSpamListVersion

  # Check for version info file, if it doesn't exist, get from assets folder
  if not os.path.exists(spamListDict['Meta']['VersionInfo']['Path']):
    files.copy_asset_file(spamListDict['Meta']['VersionInfo']['FileName'], spamListDict['Meta']['VersionInfo']['Path'])

  # Get stored spam list version data from json file
  jsonData = open(spamListDict['Meta']['VersionInfo']['Path'], 'r', encoding="utf-8")
  versionInfoJson = str(json.load(jsonData)) # Parses json file into a string
  versionInfo = ast.literal_eval(versionInfoJson) # Parses json string into a dictionary
  spamListDict['Meta']['VersionInfo']['LatestRelease'] = versionInfo['LatestRelease']
  spamListDict['Meta']['VersionInfo']['LastChecked'] = versionInfo['LastChecked']

  # # Check for primary config file, load into dictionary 'config'. If no config found, loads data from default config in assets folder
  config = files.load_config_file(configVersion)
  validation.validate_config_settings(config)

  # While loop until user confirms they are logged into the correct account
  confirmedCorrectLogin = False
  while confirmedCorrectLogin == False:
    # Get channel ID and title of current user, confirm with user
    userInfo = auth.get_current_user(config)
    CURRENTUSER = User(id=userInfo[0], name=userInfo[1], configMatch=userInfo[2]) # Returns [channelID, channelTitle, configmatch]
    auth.CURRENTUSER = CURRENTUSER
    # print("\n    >  Currently logged in user: " + f"{F.LIGHTGREEN_EX}" + str(CURRENTUSER.name) + f"{S.R} (Channel ID: {F.LIGHTGREEN_EX}" + str(CURRENTUSER.id) + f"{S.R} )")
    confirmedCorrectLogin = True
    # Ask if this is the right user
    # if choice("       Continue as this user?", CURRENTUSER.configMatch) == True:
    #   confirmedCorrectLogin = True
    # else:
    #   auth.remove_token()
    #   YOUTUBE = auth.get_authenticated_service()

    # In all scenarios, load spam lists into memory  
  for x, spamList in spamListDict['Lists'].items():
    spamList['FilterContents'] = files.ingest_list_file(spamList['Path'], keepCase=False)

    ####### Load Other Data into MiscData #######
  # print("\nLoading other assets..\n")
  @dataclass
  class MiscDataStore:
    resources:dict
    spamLists:dict
    totalCommentCount:int
    channelOwnerID:str
    channelOwnerName:str

  miscData = MiscDataStore(
    resources = {}, 
    spamLists = {}, 
    totalCommentCount = 0, 
    channelOwnerID = "", 
    channelOwnerName = "",
    )
    
  miscData.resources = resourcesDict
  rootDomainListAssetFile = "rootZoneDomainList.txt"
  rootDomainList = files.ingest_asset_file(rootDomainListAssetFile)
  miscData.resources['rootDomainList'] = rootDomainList
  miscData.spamLists['spamDomainsList'] = spamListDict['Lists']['Domains']['FilterContents']
  miscData.spamLists['spamAccountsList'] = spamListDict['Lists']['Accounts']['FilterContents']
  miscData.spamLists['spamThreadsList'] = spamListDict['Lists']['Threads']['FilterContents']

  # Create Whitelist if it doesn't exist,
  if not os.path.exists(whitelistPathWithName):
    with open(whitelistPathWithName, "a") as f:
      f.write("# Commenters whose channel IDs are in this list will always be ignored. You can add or remove IDs (one per line) from this list as you wish.\n")
      f.write("# Channel IDs for a channel can be found in the URL after clicking a channel's name while on the watch page or where they've left a comment.\n")
      f.write("# - Channels that were 'excluded' will also appear in this list.\n")
      f.write("# - Lines beginning with a '#' are comments and aren't read by the program. (But do not put a '#' on the same line as actual data)\n\n")
    miscData.resources['Whitelist']['WhitelistContents'] = []
  else:
    miscData.resources['Whitelist']['WhitelistContents'] = files.ingest_list_file(whitelistPathWithName, keepCase=True)
  
  # Declare Classes
  @dataclass
  class ScanInstance:
    matchedCommentsDict: dict         #Comments flagged by the filter
    duplicateCommentsDict: dict       #Comments flagged as duplicates
    repostedCommentsDict: dict          #Comments stolen from other users
    otherCommentsByMatchedAuthorsDict: dict #Comments not matched, but are by a matched author
    scannedThingsList: list           #List of posts or videos that were scanned
    spamThreadsDict: dict             #Comments flagged as parent of spam threads
    allScannedCommentsDict: dict      #All comments scanned for this instance
    vidIdDict: dict                   #Contains the video ID on which each comment is found
    vidTitleDict: dict                #Contains the titles of each video ID
    matchSamplesDict: dict            #Contains sample info for every flagged comment of all types
    authorMatchCountDict: dict        #The number of flagged comments per author
    scannedRepliesCount: int          #The current number of replies scanned so far
    scannedCommentsCount: int         #The current number of comments scanned so far
    logTime: str                      #The time at which the scan was started
    logFileName: str                  #Contains a string of the current date/time to be used as a log file name or anything else
    errorOccurred:bool                #True if an error occurred during the scan

  ##############################################
  ######### PRIMARY INSTANCE FUNCTION ##########
  ##############################################
  ## Allows Re-running Program From Main Menu ##
  ##############################################
  def primaryInstance(miscData):
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    scanMode = "chosenVideos"
    filterMode = "AutoSmart"
    filterSubMode = config['filter_submode']

    # Instantiate class for primary instance
    current = ScanInstance(
      matchedCommentsDict={},
      duplicateCommentsDict={},
      repostedCommentsDict={},
      otherCommentsByMatchedAuthorsDict={},
      scannedThingsList=[],
      spamThreadsDict = {},
      allScannedCommentsDict={},
      vidIdDict={}, 
      vidTitleDict={}, 
      matchSamplesDict={}, 
      authorMatchCountDict={},
      scannedRepliesCount=0, 
      scannedCommentsCount=0,
      logTime = timestamp, 
      logFileName = None,
      errorOccurred = False,
    )

    # Declare Default Variables
    maxScanNumber = 999999999
    scanVideoID = None
    videosToScan = sys.argv
    recentPostsListofDicts = []
    postURL = ""
    loggingEnabled = False
    userNotChannelOwner = False

    ### Prepare Filtering Modes ###
    # Default values for filter criteria
    inputtedSpammerChannelID = None
    inputtedUsernameFilter = None
    inputtedCommentTextFilter = None
    regexPattern = ""

    filterSettings = modes.prepare_filter_mode_smart(scanMode, config, miscData)
    inputtedUsernameFilter = filterSettings[0]
    inputtedCommentTextFilter = filterSettings[0]

    # Prepare scan mode info dictionary
    # current.scannedThingsList = list(item['videoID'] for item in videosToScan)
    current.scannedThingsList = list(videosToScan)

    ##################### START SCANNING #####################
    filtersDict = { 
      'filterSettings': filterSettings,
      'filterMode': filterMode,
      'filterSubMode': filterSubMode,
      'CustomChannelIdFilter': inputtedSpammerChannelID,
      'CustomUsernameFilter': inputtedUsernameFilter,
      'CustomCommentTextFilter': inputtedCommentTextFilter,
      'CustomRegexPattern': regexPattern
      }
  
    
    # Scan the video
    def scan_video(miscData, config, filtersDict, scanVideoID, videosToScan=None, currentVideoDict={}, videoTitle=None, showTitle=False, i=1):
        nextPageToken, currentVideoDict = operations.get_comments(current, filtersDict, miscData, config, currentVideoDict, scanVideoID, videosToScan=videosToScan)
        if nextPageToken == "Error":
            return "Error"   
        if showTitle == True and len(videosToScan) > 0:
          # Prints video title, progress count, adds enough spaces to cover up previous stat print line
          offset = 95 - len(videoTitle)
          if offset > 0:
            spacesStr = " " * offset
          else:
            spacesStr = ""
          # print(f"Scanning {i}/{len(videosToScan)}: " + videoTitle + spacesStr + "\n")

        operations.print_count_stats(current, miscData, videosToScan, final=False)# Prints comment scan stats, updates on same line
        # After getting first page, if there are more pages, goes to get comments for next page
        while nextPageToken != "End" and current.scannedCommentsCount < maxScanNumber:
          nextPageToken, currentVideoDict = operations.get_comments(current, filtersDict, miscData, config, currentVideoDict, scanVideoID, nextPageToken, videosToScan=videosToScan)
          if nextPageToken == "Error":
            return "Error"
        return "OK"
      # ----------------------------------------------------------------------------------------------------------------------

    if scanMode == "entireChannel":
      status = scan_video(miscData, config, filtersDict, scanVideoID)
      if status == "Error":
        pass

    elif scanMode == "recentVideos" or scanMode == "chosenVideos":
        i = 1
        if len(videosToScan) == 3:
          currentVideoDict = {}
          scanVideoID = videosToScan[1]
          videoTitle = videosToScan[2]
          status = scan_video(miscData, config, filtersDict, scanVideoID, videosToScan=videosToScan, currentVideoDict=currentVideoDict, videoTitle=videoTitle, showTitle=True, i=i)
          if status == "Error":
            print('Error')
            sys.exit()

        if len(videosToScan) > 3:
          for video in videosToScan:
            currentVideoDict = {}
            # scanVideoID = str(video['videoID'])
            # videoTitle = str(video['videoTitle'])
            scanVideoID = str(video[1])
            videoTitle = str(video[2])
            status = scan_video(miscData, config, filtersDict, scanVideoID, videosToScan=videosToScan, currentVideoDict=currentVideoDict, videoTitle=videoTitle, showTitle=True, i=i)
            if status == "Error":
              break
            i += 1
          else:
            print('Error: no videos identified')
            sys.exit()

    # if current.errorOccurred == False:
    #   operations.print_count_stats(current, miscData, videosToScan, final=True)  # Prints comment scan stats, finalizes
    # else:
    #   utils.print_break_finished(scanMode)
    
    ##########################################################
    bypass = False
    if config['enable_logging'] != 'ask':
      logSetting = config['enable_logging']
      if logSetting == True:
        loggingEnabled = True
        bypass = True
      elif logSetting == False:
        loggingEnabled = False
        bypass = True
      elif logSetting == "ask":
        bypass = False
      else:
        bypass = False
        print("Error Code C-2: Invalid value for 'enable_logging' in config file:  " + logSetting)

    # This is very messy for now, will later consolidate the parameters
    # current, excludedCommentsDict, authorsToExcludeSet, commentIDExcludeSet, rtfFormattedExcludes, plaintextFormattedExcludes = operations.exclude_authors(current, config, miscData, excludedCommentsDict, authorsToExcludeSet, commentIDExcludeSet, excludeDisplayString, inputtedString=confirmDelete, logInfo=logInfo, only=onlyBool)
    miscData.resources['Whitelist']['WhitelistContents'] = files.ingest_list_file(whitelistPathWithName, keepCase=True)
    exclude = True

    # Counts number of found spam comments and prints list
    # if not current.matchedCommentsDict and not current.duplicateCommentsDict and not current.spamThreadsDict and not current.repostedCommentsDict: # If no spam comments found, exits
    #   print("No matches found!")
      # print(f"If you see missed spam or false positives, you can submit a filter suggestion here: {F.YELLOW}TJoe.io/filter-feedback{S.R}")

      # Can still log to json even though no comments
      # if config['json_log_all_comments'] and config['json_log'] and config['enable_logging'] != False:
      #   # print(f"Because you enabled '{F.LIGHTCYAN_EX}json_log_all_comments{S.R}' in config, {F.LIGHTCYAN_EX}continuing on to log anyway{S.R}.")
      #   jsonSettingsDict = {}
      #   current, logMode, jsonSettingsDict = logging.prepare_logFile_settings(current, config, miscData, jsonSettingsDict, filtersDict, bypass)
      #   jsonDataDict = logging.get_extra_json_data([], jsonSettingsDict)
      #   logging.write_json_log(current, config, jsonSettingsDict, {}, jsonDataDict)

      # if config['auto_close'] == False:
      #   print("\nPress Enter to return to main menu...")
      #   return True
      # elif config['auto_close'] == True:
      #   print("\nAuto-close enabled in config. Exiting in 5 seconds...")
      #   time.sleep(5)
      #   sys.exit()
    # print(f"Number of {S.BRIGHT}{F.LIGHTRED_EX}Matched{S.R} Comments Found: {B.RED}{F.WHITE} {str(len(current.matchedCommentsDict))} {F.R}{B.R}{S.R}")
    # if current.spamThreadsDict:
    #   print(f"\nNumber of {S.BRIGHT}{F.RED}Spam Bot Threads{S.R} Found: {S.BRIGHT}{B.RED}{F.WHITE} {str(len(current.spamThreadsDict))} {F.R}{B.R}{S.R}")
    # if current.duplicateCommentsDict:
    #   print(f"\nNumber of {S.BRIGHT}{F.LIGHTBLUE_EX}Non-Matched But Duplicate{S.R} Comments Found: {S.BRIGHT}{F.WHITE}{B.BLUE} {str(len(current.duplicateCommentsDict))} {F.R}{B.R}{S.R}")
    # if current.repostedCommentsDict:
    #   print(f"\nNumber of {S.BRIGHT}{F.LIGHTBLUE_EX}Non-Matched But Stolen & Reposted{S.R} Comments Found: {S.BRIGHT}{F.WHITE}{B.BLUE} {str(len(current.repostedCommentsDict))} {F.R}{B.R}{S.R}")

    # If spam comments were found, continue
    if bypass == False:
      # Asks user if they want to save list of spam comments to a file
      # print(f"\nComments ready to display. Also {F.LIGHTGREEN_EX}save a log file?{S.R} {B.GREEN}{F.BLACK} Highly Recommended! {F.R}{B.R}{S.R}")
      # print(f"        (It even allows you to {F.LIGHTGREEN_EX}restore{S.R} deleted comments later)")
      loggingEnabled = True
      if loggingEnabled == None:
        return True # Return to main menu
      # print("")

    # Print comments  and write to log files
    logFileContents, logMode = logging.print_comments(current, config, scanVideoID, loggingEnabled, scanMode)

    # print(f"\n{F.WHITE}{B.RED} NOTE: {S.R} Check that all comments listed above are indeed spam.")
    # print(f" > If you see missed spam or false positives, you can submit a filter suggestion here: {F.YELLOW}TJoe.io/filter-feedback{S.R}")
    # print(videosToScan)
    # print()

    # print('\nmatchedCommentsDict:')    
    print(json.dumps(current.matchedCommentsDict))

    # print('\nscannedThingsList:')
    # print(current.scannedThingsList)

    # print('\nallScannedCommentsDict:')
    print(json.dumps(current.allScannedCommentsDict))

    # print('\nmatchSamplesDict:')
    # print(current.matchSamplesDict)
    
    # print('\nscannedCommentsCount:')
    print(current.scannedCommentsCount)

    # print('\nscannedRepliesCount:')
    print(current.scannedRepliesCount)

    # print('\nlogTime:')
    # print(current.logTime)


    
  ##############################################
  ######### PRIMARY INSTANCE FUNCTION ##########
  ##############################################

  # Loops Entire Program to Main Menu
  continueRunning = True
  while continueRunning == True:
    continueRunning = primaryInstance(miscData)
  
  sys.stdout.flush()


# Runs the program
if __name__ == "__main__":
#   #For speed testing

  # import cProfile
  # cProfile.run('main()', "output.dat")
  # import pstats
  # from pstats import SortKey
  # with open("output_time.txt", "w") as f:
  #   p = pstats.Stats("output.dat", stream=f)
  #   p.sort_stats("time").print_stats()
  # with open("output_calls.txt", "w") as f:
  #   p = pstats.Stats("output.dat", stream=f)
  #   p.sort_stats("calls").print_stats()


# -------------------------------------------------------------------------------------------------------------------------------------------------
  # print("Running Main Program...")
  try:
    # print('Swiper')
    # print(sys.argv[1])
    main()


  except SystemExit:
    sys.exit()
  except HttpError as hx:
    traceback.print_exc()
    print("------------------------------------------------")
    print("Error Message: " + str(hx))
    if hx.status_code:
      print("Status Code: " + str(hx.status_code))
      if hx.error_details[0]["reason"]: # If error reason is available, print it
          reason = str(hx.error_details[0]["reason"])
          utils.print_exception_reason(reason)
      print(f"\nAn {F.LIGHTRED_EX}'HttpError'{S.R} was raised. This is sometimes caused by a remote server error. See the error info above.")
      print(f"If this keeps happening, consider posting a bug report on the GitHub issues page, and include the above error info.")
      print(f"Short Link: {F.YELLOW}TJoe.io/bug-report{S.R}")
      # input("\nPress Enter to Exit...")
    else:
      print(f"{F.LIGHTRED_EX}Unknown Error - Code: Z-1{S.R} occurred. If this keeps happening, consider posting a bug report on the GitHub issues page, and include the above error info.")
      print(f"Short Link: {F.YELLOW}TJoe.io/bug-report{S.R}")
      # input("\n Press Enter to Exit...")
  except UnboundLocalError as ux:
    traceback.print_exc()
    print("------------------------------------------------")
    print("Error Message: " + str(ux))
    if "referenced before assignment" in str(ux):
      print(f"\n{F.LIGHTRED_EX}Error - Code: X-2{S.R} occurred. This is almost definitely {F.YELLOW}my fault and requires patching{S.R} (big bruh moment)")
      # print(f"Please post a bug report on the GitHub issues page, and include the above error info.")
      # print(f"Short Link: {F.YELLOW}TJoe.io/bug-report{S.R}")
      # print("    (In the mean time, try using a previous release of the program.)")
      # input("\n Press Enter to Exit...")
    else:
      traceback.print_exc()
      print("------------------------------------------------")
      print(f"\n{F.LIGHTRED_EX}Unknown Error - Code: Z-2{S.R} occurred. If this keeps happening,")
      # print("consider posting a bug report on the GitHub issues page, and include the above error info.")
      # print(f"Short Link: {F.YELLOW}TJoe.io/bug-report{S.R}")
      # input("\n Press Enter to Exit...")
  except KeyError as kx:
    traceback.print_exc()
    # print("------------------------------------------------")
    if "config" in str(kx):
      print(f"{F.LIGHTRED_EX}Unknown Error - Code: X-3{S.R}")
      # print("Are you using an outdated version of the config file? Try re-creating the config file to get the latest version.")
      # print(f"{F.LIGHTYELLOW_EX}If that doesn't work{S.R}, consider posting a {F.LIGHTYELLOW_EX}bug report{S.R} on the GitHub issues page, and include the above error info.")
    else:
      print(f"{F.RED}Unknown Error - Code: X-4{S.R} occurred. This is {F.YELLOW}probably my fault{S.R},")
    #   print(f"please a {F.LIGHTYELLOW_EX}bug report{S.R} on the GitHub issues page, and include the above error info.")
    # print(f"Short Link: {F.YELLOW}TJoe.io/bug-report{S.R}")
    # input("\n Press Enter to Exit...")
  except TypeError:
    traceback.print_exc()
    print("------------------------------------------------")
    print(f"{F.RED}Unknown Error - Code: X-5{S.R} occurred. This is {F.YELLOW}probably my fault{S.R},")
    # print(f"please a {F.LIGHTYELLOW_EX}bug report{S.R} on the GitHub issues page, and include the above error info.")
    # print(f"Short Link: {F.YELLOW}TJoe.io/bug-report{S.R}")
    # input("\n Press Enter to Exit...")
  except KeyboardInterrupt:
    print("\n\nProcess Cancelled via Keyboard Shortcut")
    sys.exit()
  except Exception as x:
    traceback.print_exc()
    print("------------------------------------------------")
    print("Error Message: " + str(x))
    print(f"\n{F.LIGHTRED_EX}Unknown Error - Code: Z-3{S.R} occurred. If this keeps happening, consider posting a bug report")
    print("on the GitHub issues page, and include the above error info.")
    print(f"Short Link: {F.YELLOW}TJoe.io/bug-report{S.R}")
    # input("\n Press Enter to Exit...")
  else:
    print("\nFinished Executing.")