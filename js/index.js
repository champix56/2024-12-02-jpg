import { routes } from './config/routes.js';
import { router, initRouter } from './router.js';
/**
 * chargement de base de mon app
 */
function loadingDOM() {
  console.log('====================================');
  console.log('%c%s','font-size:xx-large;text-decoration:underline;color:skyblue;',"DOM CHARGE");
  console.log('====================================');
  initRouter(routes,document.getElementById('wrapper'));
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();
  loadNavbarEvents();
  //loadEditorEvent();
}
/**
 * Fonction de chargement des events de navbar
 */
function loadNavbarEvents() {
  const  aList = document.querySelectorAll("a");
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

window.addEventListener('offline',(evt)=>{
  alert('plus de reseaux')
})


window.addEventListener('online',(evt)=>{
  alert('retour du reseaux')
})