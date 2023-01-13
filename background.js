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
//search sonucu istenen apiye giden call
//chrome.runtime.onInstalled.addListener(deneme10);
async function scan_function() {
  let asset;
  let slug;
  let token;
  await chrome.storage.local.get(["scan_aktive"]).then((result) => {
    slug = result.scan_aktive;
  });

  await chrome.storage.local.get(["asseturl"]).then((result) => {
    asset = result.asseturl;
  });
  await chrome.storage.local.get(["apitoken"]).then((result) => {
    token = result.apitoken;
  });

  try {
    const response = await fetch(
      "https://core.securityforeveryone.com/api/scans/start-from-request",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: asset,
          slug: slug,
          guest_token: token,
          time: 1635606153,
        }),
      }
    );
    const result = await response.json();

    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "start_scan") {
    scan_function();
    //sendResponse(freetools);
    //token check eklenecek message a
  } else if (message.request === "token_check") {
    token_check_function();
  }
});

//token check
chrome.runtime.onInstalled.addListener(token_check_function);
async function token_check_function() {
  let token;
  await chrome.storage.local.get(["apitoken"]).then((result) => {
    token = result.apitoken;
  });
  try {
    const response = await fetch(
      "https://core.securityforeveryone.com/api/user/password-token-check",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    //responsa göre kontrol kurulmalı
    //window.location.replace("./popup-sign-out.html");
  } catch (err) {
    console.log(err);
  }
}

//TOOL SEARCH KISMI İÇİN NOT VE KODLAR
//Bu mehmet beyin istediği yoldu ama bunu da uyarlayamadım autocomplete'e
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
/// bunlarla attığım fetch çağrısı ile aldığım
// json dosyasını bg dan dışarı iletmeye çalıştım autocomplete için ama olmadı

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

//SHOW RESULT AREA
//scan sonucunu bu şekilde yeni tab olarak döndürecek
//job slug id'yi lokalde kaydedip de çekebilirsin?
function openNewTab(url) {
  chrome.tabs.create({
    url: url,
    active: true,
  });
}
async function processData() {
  //scan bitince job slug id içeren sonuç linkini döndürecek fonksiyon ile bağlanacak
  //const result = await scan_edecek_fonksiyon();
  openNewTab(result.url);
  return result;
}
