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

  let apitoken = document.querySelector("#api-token").value;

  //apitoken localde kaydedildi

  chrome.storage.local.set({ apitoken: apitoken }).then(() => {});

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
