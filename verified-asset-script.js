let assets = [];
document.getElementById("asset-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from submitting

  // Get asset from input field
  const asset = document.getElementById("asset-input").value;
  assets.push(asset);
  // Save assets in chrome storage
  chrome.storage.local.set({ verifiedAssets: assets }, function () {
    console.log("Assets saved: ", assets);
  });

  // Display assets in a list on the page
  const assetList = document.getElementById("asset-list");
  assetList.innerHTML = "";
  assets.forEach(function (asset) {
    const li = document.createElement("li");
    li.textContent = asset;
    assetList.appendChild(li);
  });
});
