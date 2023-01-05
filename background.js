//extension yüklenince konsola bildirim gönderen fonksiyon
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension have been successfully installed!");
});
//update olunca kullanıcıya bildirim gönderen fonksiyon
//bunu lokalde deneme imkanım yok ama çalışıyordur muhtemelen
chrome.runtime.onUpdateAvailable.addListener(hasUpdate);
function hasUpdate(e) {
  console.log("hasUpdate", e);
  chrome.runtime.reload();
}

//aktif tab alındı

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //aktif tab localden çekildi

  chrome.storage.local.get(["asseturl"]).then((result) => {
    console.log(result.asseturl);
  });
  //api token localden çekildi
  chrome.storage.local.get(["apitoken"]).then((result) => {
    console.log(result.apitoken);
  });
});

//FREE SCAN fonksiyonu olacak, listener free-scan call'ı alınca buradaki fonksiyon çalışacak
/* 
let button = form.submit.addEventListener('click', (e) => {
  e.preventDefault();
  fetch ('https://core.securityforeveryone.com/api/scans/start-guest', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
  "asset": "user_info.asset,",
  "slug": "user_info.slug,",
  "guest_token": "f2b946a8db1bf8e366ae9597e3ebf8b685d4d9aa710db72f79b316073085975b",
    }),
})
  .then((response) => response.json())
  .then((freetools) => {
  console.log(freetools);
  });
});
*/

//Premium SCAN fonksiyonu olacak, listener premium-scan call'ı alınca buradaki fonksiyon çalışacak
/*   

let button = form.submit.addEventListener('click', (e) => {
  e.preventDefault();
  fetch ('https://core.securityforeveryone.com/api/scans/start-from-request', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
  "asset": "abc.com",
  "slug": "txt-record-lookup",
  "guest_token": "f2b946a8db1bf8e366ae9597e3ebf8b685d4d9aa710db72f79b316073085975b",
  "time": 1635606153
    }),
})
  .then((response) => response.json())
  .then((freetools) => {
  console.log(freetools);
  });
});
*/
