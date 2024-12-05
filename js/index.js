import { initRouter, router } from "./router.js";
import { Horloge } from "./web-components/horloge.js";
/**
 * chargement de base de mon app
 */
function loadingDOM() {
  initRouter(document.getElementById("wrapper"));
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();

  loadNavbarEvents();  
  //apres le chargement des event pour pas passer au router le liens de l'horloge
  registerWebComponents();
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

function registerWebComponents(){
  // Register the CurrentDate component using the tag name <current-date>.
customElements.define("horloge-navbar", Horloge);
}
document.addEventListener("DOMContentLoaded", loadingDOM);
