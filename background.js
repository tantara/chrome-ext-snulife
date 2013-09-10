      var AnimalTheme = {
        start: function() {
          this.active = true;
	  localStorage['snu-animal'] = true;
	  chrome.browserAction.setBadgeText({
            text: "O"
          });
        },

        stop: function() {
          this.active = false;
	  localStorage['snu-animal'] = false;
	  chrome.browserAction.setBadgeText({
            text: "X"
          });
        }
      };

	if(localStorage['snu-animal'] == "true") {
      AnimalTheme.active = true;
      } else {
      AnimalTheme.active = false;
      }

      chrome.browserAction.onClicked.addListener(function(tab) {
        AnimalTheme[AnimalTheme.active ? 'stop' : 'start']();
	chrome.tabs.sendRequest(tab.id, {active: AnimalTheme.active});
      });
        AnimalTheme[AnimalTheme.active ? 'start' : 'stop']();

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      sendResponse({active: localStorage['snu-animal']});
});
