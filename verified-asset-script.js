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
    option.addEventListener("click", function () {
      window.location.href = "popup-welcome.html";
    });
    assetList.appendChild(option);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("verifiedAssets", function (result) {
    const assetList = document.getElementById("asset-list");
    if (result.verifiedAssets) {
      result.verifiedAssets.forEach(function (asset) {
        const option = document.createElement("option");
        option.textContent = asset;
        option.addEventListener("click", function () {
          window.location.href = "popup-welcome.html";
        });
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
