import os
import sys
import traceback
import regex as re

from colorama import init, Fore as F, Back as B, Style as S

S.R = S.RESET_ALL
F.R = F.RESET
B.R = B.RESET

# Global Hardcoded Constants
RESOURCES_FOLDER_NAME = "corePyApp/Resources"

__all__ = ['os', 'sys', 're', 'traceback', 'F', 'B', 'S', 'init', 'RESOURCES_FOLDER_NAME']