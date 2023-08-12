# Adblock_Filter_List
This repository contains a text file currently named OutlawAdblockList.txt which will automatically update the uBlock Origin filters for users who link this text file in their list of filters.

Add the URL to OutlawAdblockList.txt ( https://raw.githubusercontent.com/uploadersoasis/Adblock_Filter_List/master/OutlawAdblockList.txt ) under the "Custom" section of the "Filter lists" tab in uBlock Origin.

See https://github.com/gorhill/uBlock/wiki/Filter-lists-from-around-the-web for general details on how to add custom filter lists.

While the rules in this list were tested at the time of inclusion in this list,
given that websites on the Internet are continually changing, some may not work
now or in the future.
Therefore regularly update your filters in uBlock, and report any websites which
do not work to https://github.com/uploadersoasis/Adblock_Filter_List/issues .
 
NOTES:

   1.  Some of these rules utilize the add-on scriptlets like "replace attribute" (replace-attr)
       from the javascript @ https://raw.githubusercontent.com/uBlock-user/uBO-Scriptlets/master/scriptlets.js
       so add that URL to the "userResourcesLocation" value in the advanced settings
       so that those rules will work.

   2.  The rules which utilize the "replace-node-text" / "rpnt" scriptlet must also
       be listed under the "My Filters" tab and not just in this list because that
       scriptlet has the "requiresTrust" set to true.

   3.  Some of these rules utilize the "set attribute any value" (set-attr-any.js / saa) scriptlet 
       from the javascript @ https://github.com/uploadersoasis/Adblock_Filter_List/raw/master/outlaw_scriptlets.js
       so add that URL preceded by a space to the end of the "userResourcesLocation"
        value in the advanced settings so that those rules will work.

   4.  Filters in this list block ads on YouTube.com.  This used to cause a black
       screen to appear for each ad that would have otherwise played along with
       an associated delay, but it doesn't appear to be the case any longer.
       The video would play or continue to play after this pause.  The delay may
       still have been shorter than the ad(s) would have been.

   5.  The countdown period of some file hosts has been removed or shortened.
       In some of these cases the countdown may not display, so press the
       button to perform the download anyway.  For file hosts that do
       server-side checks on the countdown, you will still have to wait the
       normal period before downloading.

   6.  A relative few websites still require the use of a custom Javascript
       snippet to be fully functional.  Such a script can be saved as a
       bookmark in the web browser and selected when on the webpage which
       requires it.
       filecr.com currently doesn't require the following script for the
       download button to work IF uBlock Origin is used and Brave's native
       adblocking is disabled for filecr.com.
       The script to activate the download button @ filecr.com is:
       javascript:(function(){DD = document.querySelector("a.download_allow.download_allow.btn-primary_dark.full");downloadLink = document.createElement("input");downloadLink.type="submit";DD.appendChild(downloadLink);})();

   7.  Due to the way that Wikipedia's responsive website design currently
       works or rather doesn't work, these rules force a style suited to a
       1920 pixel width screen.  If you screen is a different size, adjust the
       three rules which set this style:
       wikipedia.org##html:style(width: 100vw !important; height: 100vh !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1510px !important; max-width: 1510px !important;)
       wikipedia.org##div[class="mw-page-container"]:style(width: 100vw !important; height: 100vh !important; margin-left: 10px !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1510px !important; max-width: 1510px !important;)
       wikipedia.org##div[class="mw-content-container"]:style(width: 1190px !important; height: 100vh !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1190px !important; max-width: 1190px !important;)

<b>NOTE:</b><br>
Due to a behavior in uBlock Origin regarding the asterisk as a wildcard that was previously unknown to me, if you previously downloaded this list, you should delete it and replace it with the 9a7a291 commit version on April 10, 2022 or later.<br>
If you added this list to your uBlock Origin custom filter list before the 9a7a291 commit on April 10, 2022, simply update to this fixed version or to the latest version by clicking the clock icon at the end of this filter's line and then click the "update now" button at the top of the page/tab.
