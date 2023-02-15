const cikis_buton = document.querySelector(".cikis");
const home = document.querySelector(".navbar-home");
const navbar_scan_butonu = document.querySelector(".navbar-scan");
const reset_button = document.querySelector("#reset-btn");
const reset_asset_buton = document.querySelector("#reset-asset");
const go_to_verified_button = document.querySelector("#verified-btn");

//scan sayfasına gidecek sonra
home.addEventListener("click", () => {
  window.location.replace("./popup-sign-out.html");
});
//go verified
go_to_verified_button.addEventListener("click", () => {
  window.location.replace("./verified-asset.html");
});
//logout butonu, apitokeni sıfırlayıp çıkış yapıyor
cikis_buton.addEventListener("click", () => {
  chrome.storage.local.set({ apitoken: 0 }).then(() => {});
  window.location.replace("./popup-sign-in.html");
});

//scan sayfasına gidecek sonra
navbar_scan_butonu.addEventListener("click", () => {
  window.location.replace("./free-popup-sign-out.html");
});

//asset add

document.getElementById("asset-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from submitting

  // Get assets from input field
  const assets = document.getElementById("asset-input").value;
  //kontrol
  if (!isValidUrl(assets)) {
    document.getElementById("warning-message").style.display = "block";
    return;
  }
  // Save assets in chrome storage
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
    // Display assets in a list on the page
    const option = document.createElement("option");
    option.textContent = assets;
    assetList.insertBefore(option, assetList.firstChild);
    assetList.value = assets;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("verifiedAssets", function (result) {
    const assetList = document.getElementById("asset-list");
    if (result.verifiedAssets) {
      result.verifiedAssets.forEach(function (asset) {
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
  //Regex kontrolü
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(url);
};

reset_asset_buton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let hostname = activeTab.url;
    if (!isValidUrl(hostname)) {
      document.getElementById("warning-message").style.display = "block";
      return;
    }

    // Get asset list from storage
    chrome.storage.local.get("verifiedAssets", function (result) {
      let assetList = [];
      if (result.verifiedAssets) {
        assetList = result.verifiedAssets;
      }
      // Add hostname to asset list
      assetList.push(hostname);
      // Save updated asset list to storage
      chrome.storage.local.set({ verifiedAssets: assetList }, function () {});
      //make selected option our hostna
      const assetllist = document.getElementById("asset-list");
      const option = document.createElement("option");
      option.textContent = hostname;
      assetllist.insertBefore(option, assetllist.firstChild);
      option.selected = true;
    });
  });
});
