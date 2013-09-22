function isEnabled()
{
    return localStorage["disabled"] == undefined;
}

function setIcon()
{
    if (isEnabled())
        chrome.browserAction.setIcon({path: "online-icon.png"});
    else
        chrome.browserAction.setIcon({path: "blocked-icon.png"});
}

function getCurrentMission()
{
    return localStorage["mission"];
}

