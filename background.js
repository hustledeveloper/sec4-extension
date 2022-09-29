chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension have been successfully installed!");
  });
   
  chrome.action.onClicked.addListener(function (tab) {
    console.log(tab);
  });

  
