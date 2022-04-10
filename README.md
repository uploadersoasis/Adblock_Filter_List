# Adblock_Filter_List
This repository contains a text file currently named OutlawAdblockList.txt which will automatically update the uBlock Origin filters for users who link this text file in their list of filters.

Add the URL to OutlawAdblockList.txt ( https://raw.githubusercontent.com/uploadersoasis/Adblock_Filter_List/master/OutlawAdblockList.txt ) under the "Custom" section of the "Filter lists" tab in uBlock Origin.

See https://github.com/gorhill/uBlock/wiki/Filter-lists-from-around-the-web for general details on how to add custom filter lists.

While the rules in this list were tested at the time of inclusion in this list, given that websites on the Internet are continually changing, some may not work now or in the future.  Therefore regularly update your filters in uBlock, and report any websites which do not work to https://github.com/uploadersoasis/Adblock_Filter_List/issues .

NOTES:

	1.  Filters in this list block ads on YouTube.com, but this causes a black,
        screen to appear for each ad that would otherwise be played along with
        an associated delay.  The video will play or continue to play after
        this pause so patiently wait for it.  The delay may still be shorter
        than the ad(s) would have been.

    2.  The countdown period of some file hosts has been removed or shortened.
        In some of these cases the countdown may not display, so press the
        button to perform the download anyway.  For file hosts that do
        server-side checks on the countdown, you will still have to wait the
        normal period before downloading.

    3.  A relative few websites still require the use of a custom Javascript
        snippet to be fully functional.  Such a script can be saved as a
        bookmark in the web browser and selected when on the webpage which
        requires it.
        One such website is filecr.com.  The script to activate the download
        button on its pages is:
javascript:(function(){DD = document.querySelector("a.download_allow.download_allow.btn-primary_dark.full");downloadLink = document.createElement("input");downloadLink.type="submit";DD.appendChild(downloadLink);})();

NOTE:
Due to a behavior in uBlock Origin regarding the asterisk as a wildcard that was previously unknown to me, if you previously downloaded this list, you should delete it and replace it with the 9a7a291 commit version on April 10, 2022 or later.
If you added this list to your uBlock Origin custom filter list before the 9a7a291 commit on April 10, 2022, simply update to this fixed version by clicking the clock icon at the end of this filter's line and then click the "update now" button at the top of the page/tab.
