function loadingDOM() {
  var js = document.querySelector("#js-notification");
  js.style.backgroundColor = "GREEN";
  js.innerHTML =
    'le <span style="font-weight:900;color :blue;">JS</span> est OK';
  document
    .querySelector("button.btn-danger")
    .addEventListener("click", function (evt) {
      console.log('button',evt);
      console.log("button du header clické");
    });
    document
    .querySelector("#header")
    .addEventListener("click", function (evt) {
      console.log('header',evt);
      console.log("header clické");
    });
}

document.addEventListener("DOMContentLoaded", loadingDOM);
