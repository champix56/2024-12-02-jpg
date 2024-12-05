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
function Router(rootNode, rootFolderOfTemplates = "/pages") {
  /*definitions locales(interne) des propriétés et fonctions */
  var currentRoute = location.pathname;
  function changePathName(pathName) {
    history.pushState(null, null, pathName);
    currentRoute = location.pathname;
  }/**
   * 
   * @param {object} routeObject 
   */
  function loadContentInPage(routeObject) {
    rootNode.innerHTML = routeObject.template;
    if (typeof routeObject.loaderJs === "function") {
      routeObject.loaderJs();
    }
  }
  function getContentFromNetwork(routeObject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", routeObject.url);
    xhr.onreadystatechange = function (evt) {
      if (xhr.readyState < XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status >= 400) {
        console.log("erreur" + xhr.status);
        return;
      }
      console.log(xhr.responseText);
      routeObject.template = xhr.responseText;
      loadContentInPage(routeObject);
    };
    xhr.send();
  }

  /*definition des acces exterieurs a l'instance */
  /**
   * getter de la route current
   * @returns {string}current pathName
   */
  this.getCurrentRoute = getCurrentRoute;
  function getCurrentRoute() {
    return currentRoute;
  }

  /**
   * fonction de navigation avec chargement du contenu
   * @param {string} pathName path to navigate (start with '/')
   */
  this.navigate = navigate;
  function navigate(pathName = "/") {
    changePathName(pathName);
    var route = {};
    route.url = rootFolderOfTemplates;

    switch (pathName) {
      case "/thumbnail":
        route.url += "/thumbnail/thumbnail.html";
        break;
      case "/editor":
        route.url += "/editor/editor.html";
        route.loaderJs = loadEditorEvent;
        break;
      default:
        route.url += "/home/home.html";
        break;
    }
    getContentFromNetwork(route);
  }
}
