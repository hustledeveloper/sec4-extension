//TASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIM
const reset_button = document.querySelector("#reset-btn");

reset_button.addEventListener("mouseover", () => {
  reset_button.style.backgroundColor = "black";
  reset_button.style.color = "white";
  reset_button.style.transform = "scale(1.3)";
});

reset_button.addEventListener("mouseleave", () => {
  reset_button.style.backgroundColor = "#6366F1";
  reset_button.style.color = "white";
  reset_button.style.transform = "scale(1)";
});
const scan_button = document.querySelector("#scan-btn");

scan_button.addEventListener("mouseover", () => {
  scan_button.style.backgroundColor = "black";
  scan_button.style.color = "white";
  scan_button.style.transform = "scale(1.3)";
});

scan_button.addEventListener("mouseleave", () => {
  scan_button.style.backgroundColor = "#6366F1";
  scan_button.style.color = "white";
  scan_button.style.transform = "scale(1)";
});
const aseet_add_button = document.querySelector("#asset-add");

aseet_add_button.addEventListener("mouseover", () => {
  aseet_add_button.style.backgroundColor = "black";
  aseet_add_button.style.color = "white";
  aseet_add_button.style.transform = "scale(1.3)";
});

aseet_add_button.addEventListener("mouseleave", () => {
  aseet_add_button.style.backgroundColor = "#6366F1";
  aseet_add_button.style.color = "white";
  aseet_add_button.style.transform = "scale(1)";
});

//TASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIMTASARIM

document.getElementById("asset-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from submitting

  // Get assets from input field
  const assets = document.getElementById("asset-input").value;
  //kontrol
  if (!isValidUrl(assets)) {
    alert("Invalid URL. Please enter a valid URL.");
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

    assetList.appendChild(option);
  });
});
function isValidUrl(url) {
  //Regex kontrolü
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(url);
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("verifiedAssets", function (result) {
    const assetList = document.getElementById("asset-list");
    if (result.verifiedAssets) {
      result.verifiedAssets.forEach(function (asset) {
        const option = document.createElement("option");
        option.textContent = asset;

        assetList.appendChild(option);
      });
    }
  });
});
document.getElementById("reset-btn").addEventListener("click", function () {
  // Clear assets from chrome storage
  chrome.storage.local.remove("verifiedAssets", function () {
    console.log("Assets removed from chrome storage.");
  });

  // Clear assets from list on the page
  const assetList = document.getElementById("asset-list");
  assetList.innerHTML = "";
});
document.getElementById("scan-btn").addEventListener("click", function () {
  const selectElement = document.getElementById("asset-list");
  const selectedAsset =
    selectElement.options[selectElement.selectedIndex].value;
  var url = new URL(selectedAsset);
  var hostname = url.hostname;

  chrome.storage.local.set({ asseturl: hostname }).then(() => {});
  window.location.replace("./popup-sign-out.html");
});