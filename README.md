# Paraswiper: YouTube Antispam Tool (MVP)
Paraswiper fetches comments on any YouTube video, scans them through, and filters out spam, scam, and impersonators. The user can instantly report spam comments to the YouTube moderation team or remove them.
<br>

🔗 <strong>Link to project:</strong> [https://paraswiper.com/](https://paraswiper.com/)

<img src="https://github.com/roman-vasi1enko/files/blob/main/paraswiper-readme-assets/paraswiper-home.png?raw=true"  width="700" style="border-radius: 20px; display: block; margin: auto">

<br>

<aside style="padding: 10px 15px; border: 1px solid grey; border-radius: 10px;">
☝ <strong>Note</strong>: This is an MVP of the app designed for testing demand and does only one job - filters and handles spam. If I see an interest in the YouTube community, I will continue improving the software.

</aside>
<br>

⭐ **How to get access.** The app consumes a lot of server resources (which are expensive), so there is no public access for now. If you want to test/use it, please send an email to roman@vasilenko.co

<br>
<aside style="padding: 10px 15px; border: 1px solid grey; border-radius: 10px;">

🔥 **Scan result example:**
The video below had 5,472 comments ([link](https://www.youtube.com/watch?v=U9KxB0BKf-I)). After running the Paraswiper, it identified and presented 4,084 spam comments. **74.6%** of all comments are spam.

<img src="https://github.com/roman-vasi1enko/files/blob/main/paraswiper-readme-assets/paraswiper-step-3.png?raw=true"  style="border-radius: 15px;">
</aside>

<br>

## How It's Made

- **Tech used:** MERN + Python
- **Styling:** TailwindCSS + DaisyUI
- **APIs:** Google Cloud, YouTube API v3

The backend is built on Node.js, with the main web framework being Express. The app uses a MongoDB database to store user information and various configurations. The Redis database is used for queueing and running background jobs for Python scripts responsible for filtering spam comments. The front end is built using React.js, with a focus on providing a smooth user experience.

The app relies on various third-party services and APIs, such as Google's OAuth2 API for user authentication and YouTube API for fetching video data. It also uses the Bull library for handling background jobs and message queuing. The app's architecture is designed to be scalable and maintainable, with the use of the Model-View-Controller (MVC) pattern, error-handling middleware, and input validation.

### User flow highlights

1. Create an account and log in.
2. Enter the link to the YouTube video for scanning.

    <img src="https://github.com/roman-vasi1enko/files/blob/main/paraswiper-readme-assets/paraswiper-step-1.png?raw=true"  width="700" style="border-radius: 10px;">

3. The app presents the video snippet with quick stats to confirm with the user the correct selection.

    <img src="https://github.com/roman-vasi1enko/files/blob/main/paraswiper-readme-assets/paraswiper-step-2.png?raw=true"  width="700" style="border-radius: 10px;">

4. Click the “Analyze comments” button. This button triggers the Python script that does the heavy lifting. The process takes a little less than a minute for every thousand comments.
5. Once the analysis is completed, the app presents the analysis stats and a table of all spam comments it was able to filter.
6. Review the output, deselect false positive comments (if any), choose to remove or report selected comments, and click the “SWIPE ‘EM” button.

    <img src="https://github.com/roman-vasi1enko/files/blob/main/paraswiper-readme-assets/paraswiper-step-3.png?raw=true"  width="700" style="border-radius: 10px;">

7. After completing the selected action, a user is redirected to the confirmation screen.

    <img src="https://github.com/roman-vasi1enko/files/blob/main/paraswiper-readme-assets/paraswiper-step-4.png?raw=true"  width="700" style="border-radius: 10px;">

Overall, Paraswiper is a complex and modern application that combines various technologies to provide a unique solution to the problem of spam comments on YouTube. The app's user interface is designed to be user-friendly and intuitive, allowing users to navigate through the process easily.

## Optimizations

Following the classic MVC pattern structure, the app was initially based on server and client folders. Since I introduced Python script to communicate with Node, I decided to place it into the server folder, as running it on the client devices would be a bad idea. It worked smoothly during testing on my local machine with 32 GB of RAM. However, it turned into a problem after deploying the app on the Heroku server with 512 MB of RAM.

After rolling out all the filters and regular expressions, the Python script turned out quite heavy. It also took a while to complete the scan. Heroku has a 30-second server request timeout, so everything that takes longer will be killed.

To solve the problem, I created a new folder called “worker” in the app’s root to fire Python, added an extra dyno, and set it as a background job with Redis. Now, when the Python script fires, Node sends a request to the worker and waits while it resolves. This helps to prevent the Node server from crashing on reaching the memory limit and avoids the 30-sec timeout for server requests.

### Future updates

1. **UX improvements:**
    - user-friendly navigation;
    - account settings;
    - user-defined custom filters;
    - history page previous scans;
2. **Complexity and output quality improvements:**
    - Add scan queuing and scheduling to use server resources optimally.
    - Implement ML model to catch non-obvious spam (fake advisors, crypto pump and dump, etc.)
    - Implement profile image comparison (comment author vs channel author) to catch impersonators.
3. **Fixes:**
    - Solve the problem of reporting/deleting too many comments.
    - Allow refresh during the scan.
    - Allow access to results with URL.
4. **Other:**
    - Talk to YouTube to increase the API limit.

## Lessons Learned

- Google Cloud and YouTube API documentation.
- Python basics (I didn’t use it before).
- How to set up Node app to run and communicate with Python app using child-process or python-shell packages.
- How to run long and memory-consuming tasks as background jobs on Heroku using Redis and Bull.

## References

Below are the open-source resources that helped me to build the Paraswiper app:

- [Confusables](https://github.com/woodgern/confusables): Python package that provides functionality for analyzing and matching words that "appear" to be the same or similar but use different characters.
- [Spammer Purge](https://github.com/ThioJoe/YT-Spammer-Purge): desktop Python program that filters and searches for spammer comments.
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss): CSS framework
- [DaisyUI](https://github.com/saadeghi/daisyui): Tailwind CSS component library
