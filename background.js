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

//lokal veri kontrolü
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.storage.local.get(["asseturl"]).then((result) => {
    console.log(result.asseturl);
  });
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

//Bu mehmet beyin istediği yoldu ama bunu da uyarlayamadım autocomplete
/* 
scan_butonu.addEventListener("click", () => {
  list({ page, per_page, query, scan_parent_id, min_score, max_score });
});
const apiPrefix = "https://core-test.s4e.link/api/scans/";

const page = 1;
const per_page = 100;
const query = "gene";

export const list = ({
  page,
  per_page,
  query,
  scan_parent_id,
  min_score,
  max_score,
}) => {
  return request.post(`${apiPrefix}/list`, {
    page,
    per_page,
    query,
    scan_parent_id,
    min_score,
    max_score,
  });
};
*/
//Bg'da attığım fetch'i sign out'taki autocomplete'e
//implamente etmem lazım. response.json() kullanarak

/* 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "start_scan") {
    chrome.storage.local.get(["scan_aktive"]).then((result) => {});
    chrome.storage.local.get(["asseturl"]).then((result) => {});
    chrome.storage.local.get(["apitoken"]).then((result) => {});
    const asset = asseturl.result;
    const slug = scan_aktive.result;
    const token = apitoken.result;

    fetch("https://core.securityforeveryone.com/api/scans/start-from-request", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        asset: asset,
        slug: slug,
        guest_token: token,
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
*/
/*
/// bunlarla json dosyasını bg dan dışarı iletmeye çalıştım autocomplete için ama olmadı
function sendDataToPopup(data) {
  chrome.runtime.sendMessage({
    data: data,
  });
}
sendDataToPopup(data);

chrome.runtime.onMessage.addListener((request) => {
  const data = request.data;
});
*/
