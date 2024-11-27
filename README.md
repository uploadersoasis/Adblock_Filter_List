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
Rules in this list also frequently contain comments to explain what the rule does
and to assist in troubleshooting should the it need to be changed or removed in the future.
 
NOTES:

    1.  The rules which utilize scriptlets which have "trusted" in the name,
        such as "trusted-set-attr.js", "trusted-set-constant.js",
        "trusted-replace-node-text.js", "trusted-set-cookie.js",
        "trusted-replace-fetch-response.js", "trusted-replace-xhr-response.js",
        "trusted-click-element.js", "trusted-set-local-storage-item.js",
        "trusted-set-session-storage-item.js", "trusted-prune-inbound-object.js",
        "trusted-prune-outbound-object.js", and "trusted-replace-argument.js",
        must also be listed under the "My Filters" tab and not just in this list
        AND " user-" must be added to the end of the "trustedListPrefixes" line
        on uBlock Origin's "advanced settings" screen, e.g.
        "trustedListPrefixes ublock- user-".
        The reason for this is these scriptlets have the "requiresTrust"
        property set to "true" in the scriptlets.js file.

    2.  The rules with the "replace=" directive after the URL also have the
        "trusted" restrictions, and therefore must also be listed under the
        "My Filters" tab and not just in this list.

    3.  Some of these rules utilize the add-on scriptlets like "replace attribute"
        (rpla) and "rename attribute" (rna) from the javascript @
        https://raw.githubusercontent.com/uBlockO/uBO-Scriptlets/master/scriptlets.js
        so add that URL to the "userResourcesLocation" value in the advanced settings
        so that those rules will work.
        example.com##+js(rpla, [selector], oldattr, newattr, newvalue)  ! newvalue is optional but is "" by default.
        example.com##+js(rna, [selector], oldattr, newattr)  ! don't need to first remove existing attribute with same name

    4.  Many of these rules utilize the "trusted-set-attr" scriptlet now found in
        uBlock Origin via https://github.com/gorhill/uBlock/commit/11ca4a39239478e35605ec072fca140ac4c70d3b
        example.com##+js(trusted-set-attr, [selector], attribute, value)
        Multiple attributes can be separated with | , but each attribute will be assigned the same value.
        Value isn't type checked, but since this scriptlet uses function element.setAttribute(name, value)
        to set the value, the value is always a string even without quotation marks.
        This scriptlet runs once when the page loads then afterward on DOM mutations.

    5.  Rules in this list redirect normal YouTube video links to an embedded
        version of the video which displays it in the entire page/tab rather than
        on a normal YouTube page.
        Another advantage of this is that standard Youtube ads are not run in
        the embedded video player.
        The downside of this though is that some videos, such as the free ad-supported
        movies from Google Play, will not play in the embedded player, and it will
        appear as if the video does not exist.

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
wikipedia.org##html:style(width: 99vw !important; height: 99vh !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1510px !important; max-width: 1510px !important;)
wikipedia.org##div[class="mw-page-container"]:style(width: 99vw !important; height: 99vh !important; margin-left: 10px !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1510px !important; max-width: 1510px !important;)
wikipedia.org##div[class="mw-content-container"]:style(width: 1190px !important; height: 99vh !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 0  !important; padding-right: 0 !important; min-width: 1190px !important; max-width: 1190px !important;)
