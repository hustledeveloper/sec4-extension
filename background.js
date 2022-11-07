//extension yüklenince konsola bildirim gönderen fonksiyon
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension have been successfully installed!");
});
//update olunca kullanıcıya bildirim gönderen fonksiyon(bunu lokalde deneme imkanım yok ama çalışıyordur muhtemelen)
chrome.runtime.onUpdateAvailable.addListener(hasUpdate);
function hasUpdate(e) {
  console.log("hasUpdate", e);
  chrome.runtime.reload();
}
/* 
//LOGIN BÖLÜMÜ

let user_signed_in = false;
let return_session = false;

function is_user_signed_in() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["userStatus", "user_info"], function (response) {
      if (chrome.runtime.lastError)
        resolve({ userStatus: false, user_info: {} });
      resolve(
        response.userStatus === undefined
          ? { userStatus: false, user_info: {} }
          : { userStatus: response.userStatus, user_info: response.user_info }
      );
    });
  });
}

function flip_user_status(signIn, user_info) {
  if (signIn) {
    console.log(user_info.email);
    console.log(user_info.password);
    console.log(user_info.apitoken);
    return fetch("https://core.securityforeveryone.com/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, ",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user_info.email,
        password: user_info.password,
      }),
    })
      .then((res) => {
        return new Promise((resolve) => {
          if (res.status !== 200) resolve("fail");

          chrome.storage.local.set(
            { userStatus: signIn, user_info },
            function (response) {
              if (chrome.runtime.lastError) resolve("fail");

              user_signed_in = signIn;
              resolve("success");
            }
          );
        });
      })
      .catch((err) => console.log(err));
  } else if (!signIn) {
    return new Promise((resolve) => {
      chrome.storage.local.get(
        ["userStatus", "user_info"],
        function (response) {
          console.log(response);
          if (chrome.runtime.lastError) resolve("fail");

          if (response.userStatus === undefined) resolve("fail");
          console.log("hi");
          fetch("https://core.securityforeveryone.com/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: user_info.email,
              password: user_info.password,
            }),
          })
            .then((res) => {
              console.log(res);
              if (res.status !== 200) resolve("fail");

              chrome.storage.local.set(
                { userStatus: signIn, user_info: {} },
                function (response) {
                  if (chrome.runtime.lastError) resolve("fail");

                  user_signed_in = signIn;
                  resolve("success");
                }
              );
            })
            .catch((err) => console.log(err));
        }
      );
    });
  }
}

is_user_signed_in()
  .then((res) => {
    if (res.userStatus) return_session = true;
    user_signed_in = res.userStatus;
  })
  .catch((err) => console.log(res));

//click kontrol
chrome.action.onClicked.addListener(function () {
  is_user_signed_in()
    .then((res) => {
      if (res.userStatus) {
        if (return_session) {
          window.location.replace("./popup-welcome.html");
        } else {
          window.location.replace("./popup-sign-out.html");
        }
      } else {
        window.location.replace("./popup-sign-in.html");
      }
    })
    .catch((err) => console.log(err));
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "login") {
    flip_user_status(true, request.payload)
      .then((res) => sendResponse(res))
      .catch((err) => console.log(err));
    return true;
  } else if (request.message === "logout") {
    flip_user_status(false, null)
      .then((res) => sendResponse(res))
      .catch((err) => console.log(err));
    return true;
  } else if (request.message === "userStatus") {
    is_user_signed_in()
      .then((res) => {
        sendResponse({
          message: "success",
          userStatus: res.userStatus,
          user_info: res.user_info.email,
        });
      })
      .catch((err) => console.log(err));
    return true;
  } else if (request.message === "free-scan") {
    //guest için scan kısmı
    return true;
  } else if (request.message === "premium-scan") {
    //member için scan kısmı
    //alınan bu değerleri lokalde saklayıp api
    //call yollayan, background'da tanımlanmış 2 scan fonksiyonu ile
    //fetch yaparken asset ve slug olarak kullanacağım
    return true;
  }
});




*/
// search e tıklayınca bütün free tools tarama isimlerini alsın ve bunu search bara bağlayalım

//FREE SCAN fonksiyonu olacak, listener free-scan call'ı alınca buradaki fonksiyon çalışacak
/* 
let button = form.submit.addEventListener('click', (e) => {
  e.preventDefault();
  fetch ('https://core.securityforeveryone.com/api/scans/start-guest', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
  "asset": "user_info.asset,",
  "slug": "user_info.slug,",
  "guest_token": "f2b946a8db1bf8e366ae9597e3ebf8b685d4d9aa710db72f79b316073085975b",
    }),
})
  .then((response) => response.json())
  .then((freetools) => {
  console.log(freetools);
  });
});
*/

//Premium SCAN fonksiyonu olacak, listener free-scan call'ı alınca buradaki fonksiyon çalışacak
/*   

let button = form.submit.addEventListener('click', (e) => {
  e.preventDefault();
  fetch ('https://core.securityforeveryone.com/api/scans/start-from-request', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
  "asset": "abc.com",
  "slug": "txt-record-lookup",
  "guest_token": "f2b946a8db1bf8e366ae9597e3ebf8b685d4d9aa710db72f79b316073085975b",
  "time": 1635606153
    }),
})
  .then((response) => response.json())
  .then((freetools) => {
  console.log(freetools);
  });
});
*/
