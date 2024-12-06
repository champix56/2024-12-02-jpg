import {router, initRouter} from './router.js';
/**
 * chargement de base de mon app
 */
function loadingDOM() {
  console.log('====================================');
  console.log('%c%s','font-size:xx-large;text-decoration:underline;color:skyblue;',"DOM CHARGE");
  console.log('====================================');
  initRouter(document.getElementById('wrapper'));
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
