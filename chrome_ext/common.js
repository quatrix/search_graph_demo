function isEnabled()
{
    return localStorage["enabled"] == 1;
}

function setIcon()
{
    if (isEnabled())
        chrome.browserAction.setIcon({path: "blocked-icon.png"});
    else
        chrome.browserAction.setIcon({path: "online-icon.png"});
}

function getCurrentMission()
{
    return localStorage["mission"];
}

