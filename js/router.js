/* besoins routeur
public -> sur this
    +page actuelle champs lecture
    +changement de chemin fonction
privé pas sur this
    +champs de route prive en ecriture
    +moddif url
    +modif contenu(loadEvents)
    +recuperation du contenu de page depuis le reseau
*/
function Router(rootFolderOfTemplates='/pages') {
  /*definitions locales(interne) des propriétés et fonctions */
  var currentRoute = location.pathname;
  function changePathName(pathName) {
    history.pushState(null,null,pathName);
    currentRoute=location.pathname;
  }
  function loadContentInPage(eventLoader) {}
  function getContentFromNetwork(contentUrl) {}

  /*definition des acces exterieurs a l'instance */
  /**
   * getter de la route current
   * @returns {string}current pathName
   */
  this.getCurrentRoute=getCurrentRoute;
  function getCurrentRoute(){return currentRoute;}

  /**
   * fonction de navigation avec chargement du contenu
   * @param {string} pathName path to navigate (start with '/') 
   */
  this.navigate=navigate;
  function navigate(pathName='/'){
    changePathName(pathName);
    getContentFromNetwork();
    loadContentInPage();
  }
}
