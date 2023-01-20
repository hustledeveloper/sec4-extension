chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension have been successfully installed!");
});
/*Bu kod, eklentide bir güncelleme olduğunda çalışacak. 
 uygulamayı yeniden yükler ve güncellemeyi uygular.Bu sayede 
 kullanıcının manuel olarak uygulamayı yeniden başlatmasına gerek kalmaz. */
chrome.runtime.onUpdateAvailable.addListener(hasUpdate);
function hasUpdate(e) {
  console.log("hasUpdate", e);
  chrome.runtime.reload();
}

//default scan oluşturuldu
chrome.storage.local.set({ scan_aktive: "a-record-lookup" }).then(() => {});

//kaydedlmiş verilerin konsolda kontrölü için yazdım, geliştirme süreci bittiğinde kaldırabiliriz
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

  chrome.storage.local.get(["jobslug"], function (result) {
    console.log(result.jobslug);
  });
});
//bunu kullanrak el edilen json dosyasını autocomplete in kullanacağı json olarak bağlamak gerekiyor sanırım, denedim olmadı
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
//scan başlat mesajını dinleyip fonksiyonları çalıştıran kısım, diğer listener'lar buraya eklenebilir
//port kullanılmasının sebebi scan işleminin zaman almasıdır
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "scan_port") {
    port.onMessage.addListener((message) => {
      if (message === "start_scan") {
        scan_function();
      }
    });
  }
});
//scan başlatan ve bitince sonucu newtab olarak açan fonksiyon
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
      "https://core.securityforeveryone.com/api/v2/start",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: asset,
          slug: slug,
          token: token,
        }),
      }
    );
    const jsonData = await response.json();
    var jobslug = jsonData.value.job_slugs[0];
    chrome.storage.local.set({ jobslug: jobslug }, function () {
      console.log("Value is set to " + jobslug);
    });
    chrome.storage.local.get(["jobslug"], function (result) {
      const jobslug = result.jobslug;
      const url = "https://app.securityforeveryone.com/reports/" + jobslug;
      chrome.tabs.create({ url: url });
    });
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

function openNewTab(url) {
  chrome.tabs.create({
    url: url,
    active: true,
  });
}

*/
