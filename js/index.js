/**
 * chargement de base de mon app
 */
function loadingDOM() {
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();
  loadNavbarEvents();
  //loadEditorEvent();
}
/**
 * Fonction de chargement des events de navbar
 */
function loadNavbarEvents() {
  var aList = document.querySelectorAll("a");
  // for(var i=0;i<aList.length;i++){
  //   aList[i].addEventListener('click',function(evt){
  //     evt.preventDefault();
  //     console.log('navigate to ',evt.target.href);
  //   })
  // }
  aList.forEach(function (element) {
    element.addEventListener("click", (evt) => {
      evt.preventDefault();
      router.navigate(evt.target.attributes.href.value);
    });
  });
}
document.addEventListener("DOMContentLoaded", loadingDOM);
var router=new Router(document.getElementById('wrapper'));
