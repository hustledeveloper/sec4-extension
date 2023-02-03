/* Chrome extensions with persistent background pages are reloaded only when the browser is restarted. For most users this does not happen very often. To fix this, we need to manually restart (and thus install the update to the) extension. Chrome has an API for extension update handling (chrome.runtime.onUpdateAvailable), that checks for updates with a few-hour-long interval, and notifies the extension when it found one.*/
chrome.runtime.onUpdateAvailable.addListener(hasUpdate);
function hasUpdate(e) {
  console.log("hasUpdate", e);
  chrome.runtime.reload();
}

//scan başlatan ve bitince sonucu newtab olarak açan fonksiyon
async function scan_function() {
  let asset;
  let slug;
  let APItoken;
  await chrome.storage.local.get(["scan_aktive"]).then((result) => {
    slug = result.scan_aktive;
  });

  await chrome.storage.local.get(["asseturl"]).then((result) => {
    asset = result.asseturl;
  });
  await chrome.storage.local.get(["apitoken"]).then((result) => {
    APItoken = result.apitoken;
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
          token: APItoken,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          chrome.runtime.sendMessage({
            type: "error",
            message: "Hata: " + response.status,
          });
          return;
        }
        return response.json();
      })
      .then((jsonData) => {
        let kontrol = jsonData.code;
        if (kontrol !== 200) {
          chrome.runtime.sendMessage({
            type: "error",
            message: "Error: " + jsonData.value.status,
          });
          return;
        }
        let jobslug = jsonData.value.job_slugs[0];
        chrome.storage.local.set({ jobslug: jobslug }, function () {
          console.log("Value is set to " + jobslug);
        });
        chrome.storage.local.get(["jobslug"], function (result) {
          const jobslugz = result.jobslug;
          const url = "https://app.securityforeveryone.com/reports/" + jobslugz;
          chrome.tabs.create({ url: url });
        });
      });
  } catch (err) {
    console.log(err);
  }
}
/*
listener buna bağlanırsa direkt scan çalışacaktır, 
timer olana mesaj gelirse porttan ona bağlanır ve scan fonksiyonunu 
çalıştırmak için timer sayar, yapılacak olan şudur : yapılan scan verified 
asset scan ise (buna dönülen sonuçtan ulaşılabilir sanırım) timer sonraki verified 
asset scan için 5 dakika bekler. free scan ise timer olmayan listener a girer ve 
zamansız çalışır */
/*
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "scan_port") {
    port.onMessage.addListener((message) => {
      if (message === "start_scan") {
        scan_function();
      }
    });
  }
});
*/

//deneme alanıdeneme alanıdeneme alanıdeneme alanıdeneme alanı
let timeLeft = 0;

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "scan_port") {
    port.onMessage.addListener(function (message) {
      if (message === "start_scan") {
        // Check if timer is running
        if (timeLeft > 0) {
          port.postMessage({ type: "timer", timeLeft: timeLeft });
          return;
        }

        // Start timer
        timeLeft = 20;

        // Send scan result
        scan_function();

        let timerInterval = setInterval(function () {
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft = 0;
            // send notification
            chrome.notifications.create({
              type: "basic",
              iconUrl: "images/icon_128.png",
              title: "Timer has ended(you wait for 5 minutes for this)",
              message:
                "Your timer has reached 0.(come and get more verified asset scans)",
            });

            return;
          }

          timeLeft--;
        }, 1000);
      }
    });
  }
});
