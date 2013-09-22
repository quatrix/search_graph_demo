search_graph_demo
=================


chrome extension:
===========

1. open chrome://extensions/
2. click the "Developer Mode" check box on top
3. click "Load unpacked extension..."
4. navigate to the "chrome_ext" directory in the project and click "select"


backend:
========

python deps:

pip install tornado networkx git+https://github.com/mongodb/motor.git

starting the collector:

python server.py

what's being collected:
======================

{
    "history_result": {
        "typedCount": 332,
        "title": "Twitter",
        "url": "https://twitter.com/",
        "lastVisitTime": 1379873269641.16,
        "visitCount": 340,
        "id": "41313"
    },
    "tabId": 1730,
    "changeInfo": {
        "status": "complete"
    },
    "visit": {
        "tabId": 1730,
        "transition": "reload",
        "referringVisitId": "0",
        "visitTime": 1379873269641.16,
        "visitId": "311325",
        "id": "41313"
    },
    "mission": "hey ho lets go",
    "tab": {
        "status": "complete",
        "index": 8,
        "title": "Twitter",
        "pinned": false,
        "selected": true,
        "highlighted": true,
        "url": "https://twitter.com/",
        "windowId": 23,
        "active": true,
        "favIconUrl": "https://abs.twimg.com/favicons/favicon.ico",
        "id": 1730,
        "incognito": false
    },
    "id": "evil.legacy@gmail.com"
}

