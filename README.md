# Adblock_Filter_List
This repository contains a text file currently named OutlawAdblockList.txt which will automatically update the uBlock Origin filters for users who link this text file in their list of filters.

The filters in this list are optimized for use with uBlock Origin to be used in addition to four of the five built-in filters except the main one, "uBlock filters – Ads", with an emphasis on removing the annoyances from video streaming and file host websites.

Add the URL to OutlawAdblockList.txt ( https://raw.githubusercontent.com/uploadersoasis/Adblock_Filter_List/master/OutlawAdblockList.txt ) under the "Custom" section of the "Filter lists" tab in uBlock Origin.

See https://github.com/gorhill/uBlock/wiki/Filter-lists-from-around-the-web for general details on how to add custom filter lists.

While the rules in this list were tested at the time of inclusion in this list,
given that websites on the Internet are continually changing, some may not work
now or in the future.
Therefore regularly update your filters in uBlock and report any websites which
do not work to https://github.com/uploadersoasis/Adblock_Filter_List/issues .
 
NOTES:

    1.  The rules which utilize scriptlets which have "trusted" in the name,
        such as "trusted-set-constant.js", "trusted-replace-node-text.js",
        "trusted-set-cookie.js", "trusted-replace-fetch-response.js",
        "trusted-replace-xhr-response.js", "trusted-click-element.js",
        "trusted-set-local-storage-item.js", "trusted-set-session-storage-item.js",
        "trusted-prune-inbound-object.js", "trusted-prune-outbound-object.js",
        and "trusted-replace-argument.js", must also be listed under the
        "My Filters" tab and not just in this list AND " user-" must be added
        to the end of the "trustedListPrefixes" line on uBlock Origin's
        "advanced settings" screen, e.g. "trustedListPrefixes ublock- user-".
        The reason for this is these scriptlets have the "requiresTrust"
        property set to "true" in the scriptlets.js file.

    2.  The rules with the "replace=" directive after the URL also have the
        "trusted" restrictions, and therefore must also be listed under the
        "My Filters" tab and not just in this list.

    3.  Some of these rules utilize the add-on scriptlets like "replace attribute"
        (rpla) and "rename attribute" (rna) from the javascript @
        https://raw.githubusercontent.com/uBlock-user/uBO-Scriptlets/master/scriptlets.js
        so add that URL to the "userResourcesLocation" value in the advanced settings
        so that those rules will work.
        example.com##+js(rpla, [selector], oldattr, newattr, newvalue)  ! newvalue is optional but is "" by default.
        example.com##+js(rna, [selector], oldattr, newattr)  ! don't need to first remove existing attribute with same name

    4.  Some of these rules utilize the "set attribute any value" (set-attr-any.js / saa) scriptlet 
        from the javascript @ https://github.com/uploadersoasis/Adblock_Filter_List/raw/master/outlaw_scriptlets.js
        so add that URL preceded by a space to the end of the "userResourcesLocation"
        value in the advanced settings so that those rules will work.

    5.  Filters in this list block ads on YouTube.com.  This causes a black screen
        to appear for each ad that would have otherwise played along with an
        associated delay.
        The video will play or continue to play after this pause.  The delay may
        still be shorter than the ad(s) would have been.

    6.  The countdown period of some file hosts has been removed or shortened.
        In some of these cases the countdown may not display, so press the
        button to perform the download anyway.  For file hosts that do server-side
        checks on the countdown, such as Filefactory, you will still have to wait
        the normal period before downloading even if no countdown timer is displayed.

    7.  A relative few websites may still require the use of a custom Javascript
        snippet to be fully functional even when using these rules.  Such a
        script can be saved as a bookmark in the web browser and selected when
        on the webpage which requires it.
        filecr.com currently doesn't require the following script for the
        download button to work, but it did in the past.
        The script to activate the download button @ filecr.com is:
javascript:(function(){DD = document.querySelector("a.download_allow.download_allow.btn-primary_dark.full");downloadLink = document.createElement("input");downloadLink.type="submit";DD.appendChild(downloadLink);})();

    8.  Due to the way that Wikipedia's responsive website design currently
        works or rather doesn't work, these rules force a style suited to a
        1920 pixel width screen.  If your screen is a different size, adjust the
        three rules which set this style:
wikipedia.org##html:style(width: 100vw !important; height: 100vh !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1510px !important; max-width: 1510px !important;)
wikipedia.org##div[class="mw-page-container"]:style(width: 100vw !important; height: 100vh !important; margin-left: 10px !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1510px !important; max-width: 1510px !important;)
wikipedia.org##div[class="mw-content-container"]:style(width: 1190px !important; height: 100vh !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1190px !important; max-width: 1190px !important;)
