const cikis_buton = document.querySelector(".cikis");
const home = document.querySelector(".navbar-home");
const navbar_scan_butonu = document.querySelector(".navbar-scan");
const reset_button = document.querySelector("#reset-btn");
const reset_asset_buton = document.querySelector("#reset-asset");
const go_to_verified_button = document.querySelector("#verified-btn");

home.addEventListener("click", () => {
  window.location.replace("./popup-sign-out.html");
});

go_to_verified_button.addEventListener("click", () => {
  window.location.replace("./verified-asset.html");
});

cikis_buton.addEventListener("click", () => {
  chrome.storage.local.set({ apitoken: 0 }).then(() => {});
  window.location.replace("./popup-sign-in.html");
});

navbar_scan_butonu.addEventListener("click", () => {
  window.location.replace("./free-popup-sign-out.html");
});

document.getElementById("asset-form").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const assets = document.getElementById("asset-input").value;

  if (!isValidUrl(assets)) {
    document.getElementById("warning-message").style.display = "block";
    return;
  }

  chrome.storage.local.get("verifiedAssets", function (result) {
    const assetList = document.getElementById("asset-list");
    let assetArray = [];
    if (result.verifiedAssets) {
      assetArray = result.verifiedAssets;
    }
    assetArray.push(assets);
    chrome.storage.local.set({ verifiedAssets: assetArray }, function () {
      console.log("Assets saved: ", assetArray);
    });

    const option = document.createElement("option");
    option.textContent = assets;
    assetList.insertBefore(option, assetList.firstChild);
    assetList.value = assets;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("verifiedAssets", function (result) {
    const assetList = document.getElementById("asset-list");
    let assetSet = new Set();
    if (result.verifiedAssets) {
      result.verifiedAssets.forEach(function (asset) {

        if (assetSet.has(asset)) {

          let index = result.verifiedAssets.indexOf(asset);
          result.verifiedAssets.splice(index, 1);
          chrome.storage.local.set(
            { verifiedAssets: result.verifiedAssets },
            function () {
              console.log(`Duplicate asset removed: ${asset}`);
            }
          );
          return; 
        }
        assetSet.add(asset);
        const option = document.createElement("option");
        option.textContent = asset;
        assetList.insertBefore(option, assetList.firstChild);
      });
    }
  });
});

document.getElementById("reset-btn").addEventListener("click", function () {
  chrome.storage.local.remove("verifiedAssets", function () {
    console.log("Assets removed from chrome storage.");
  });
  const assetList = document.getElementById("asset-list");
  assetList.innerHTML = "";
});

document.getElementById("scan-btn").addEventListener("click", function () {
  const selectElement = document.getElementById("asset-list");
  const selectedAsset =
    selectElement.options[selectElement.selectedIndex].value;

  try {
    let url = new URL(selectedAsset);
    let hostname = url.hostname;

    chrome.storage.local.set({ asseturl: hostname }).then(() => {});
    window.location.replace("./popup-sign-out.html");
  } catch (e) {
    document.getElementById("warning-message").style.display = "block";
  }
});
function isValidUrl(url) {

  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(url);
}

reset_asset_buton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let hostname = activeTab.url;
    if (!isValidUrl(hostname)) {
      document.getElementById("warning-message").style.display = "block";
      return;
    }

    chrome.storage.local.get("verifiedAssets", function (result) {
      let assetList = [];
      if (result.verifiedAssets) {
        assetList = result.verifiedAssets;
      }

      if (assetList.includes(hostname)) {        
        //make selected option our hostname
        const assetllist = document.getElementById("asset-list");
        const option = assetllist.querySelector(`option[value="${hostname}"]`);
        option.selected = true;
        return;
      }

      assetList.push(hostname);

      chrome.storage.local.set({ verifiedAssets: assetList }, function () {});

      const assetllist = document.getElementById("asset-list");
      const option = document.createElement("option");
      option.value = hostname;
      option.textContent = hostname;
      assetllist.insertBefore(option, assetllist.firstChild);
      option.selected = true;
    });
  });
});
