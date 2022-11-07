const giris_buton = document.querySelector("#gir");

giris_buton.addEventListener("mouseover", () => {
  giris_buton.style.backgroundColor = "black";
  giris_buton.style.color = "white";
  giris_buton.style.transform = "scale(1.3)";
});

giris_buton.addEventListener("mouseleave", () => {
  giris_buton.style.backgroundColor = "#6366F1";
  giris_buton.style.color = "white";
  giris_buton.style.transform = "scale(1)";
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const apitoken = document.querySelector("#api-token").value;

  if (apitoken) {
    chrome.runtime.sendMessage(
      { message: "login", payload: { apitoken } },
      function (response) {
        if (response === "success")
          window.location.replace("./popup-sign-out.html");
      }
    );
  } else {
    document.querySelector("#api-token").placeholder = "Enter a api token.";
  }
});

/* 
function save_options() {
  var token = document.getElementById("api-token").text;
  chrome.storage.sync.set({
    token: token,
  });
  chrome.storage.sync.get({
    token: token,
  });
  console.log("token");
}
// Restores select checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get(
    {
      token: token,
    },
    function (items) {
      document.getElementById("api-token").text = items.token;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("gir").addEventListener("click", save_options);
*/
