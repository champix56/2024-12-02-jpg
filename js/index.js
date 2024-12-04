function loadingDOM() {
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();
}

document.addEventListener("DOMContentLoaded", loadingDOM);
