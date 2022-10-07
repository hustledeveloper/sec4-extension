let window = self;
try {
  importScripts('./jsrsasign-all-min.js');
} catch (e) {
  console.log(e);
};
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension have been successfully installed!");
  });
   
  chrome.action.onClicked.addListener(function (tab) {
    console.log(tab);
  });

  
