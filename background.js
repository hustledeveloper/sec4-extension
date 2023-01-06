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
//default scan oluşturuldu
chrome.storage.local.set({ scan_aktive: "a-record-lookup" }).then(() => {});

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

  chrome.storage.local.get(["scan_aktive"]).then((result) => {
    console.log(result.scan_aktive);
  });
});

chrome.runtime.onInstalled.addListener(deneme6);
async function deneme6() {
  try {
    const response = await fetch(
      "https://core.securityforeveryone.com/api/scans/list",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: "1",
          per_page: "10",
          query: "Gen",
        }),
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

//search sonucu istenen apiye giden call
chrome.runtime.onInstalled.addListener(deneme5);
async function deneme5() {
  try {
    const response = await fetch(
      "https://core.securityforeveryone.com/api/scans/detail",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: "command-injection-vulnerability-scanner",
        }),
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

//FREE SCAN fonksiyonu olacak, listener free-scan call'ı alınca buradaki fonksiyon çalışacak
/* 
let button = form.submit.addEventListener('click', (e) => {
  e.preventDefault();
  fetch ('https://core.securityforeveryone.com/api/scans/list', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
  "page": "1",
  "per_page": "100",
  "query": "gene",
    }),
})
  .then((response) => response.json())
  .then((freetools) => {
  console.log(freetools);
  });
});
*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "start_scan") {
    chrome.storage.local.get(["scan_aktive"]).then((result) => {});
    chrome.storage.local.get(["asseturl"]).then((result) => {});
    const asset = asseturl.result;
    const slug = scan_aktive.result;
    fetch("https://core.securityforeveryone.com/api/scans/start-from-request", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        asset: asset,
        slug: slug,
        guest_token:
          "f2b946a8db1bf8e366ae9597e3ebf8b685d4d9aa710db72f79b316073085975b",
        time: 1635606153,
      }),
    })
      .then((response) => response.json())
      .then((freetools) => {
        console.log(freetools);
      });

    sendResponse(freetools);
  }
});
