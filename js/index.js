/**
 * chargement de base de mon app
 */
function loadingDOM() {
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();
  loadNavbarEvents();
}
/**
 * Fonction de chargement des events de navbar
 */
function loadNavbarEvents() {
  var aList = document.querySelectorAll("nav a");
  // for(var i=0;i<aList.length;i++){
  //   aList[i].addEventListener('click',function(evt){
  //     evt.preventDefault();
  //     console.log('navigate to ',evt.target.href);
  //   })
  // }
  aList.forEach(function (element) {
    element.addEventListener("click", function (evt) {
      evt.preventDefault();
    });
  });
}
document.addEventListener("DOMContentLoaded", loadingDOM);
