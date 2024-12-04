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
function loadNavbarEvents(){

}
document.addEventListener("DOMContentLoaded", loadingDOM);
