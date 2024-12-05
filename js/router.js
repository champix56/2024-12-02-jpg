var routes = [
  {
    name: "Thumbnail",
    path: "/thumbnail",
    url: "/pages/thumbnail/thumbnail.html",
  },
  {
    name: "Editor",
    path: "/edit",
    url: "/pages/editor/editor.html",
    loaderJs: loadEditorEvent,
  },
  {
    name: "Home",
    path: "/",
    url: "/pages/home/home.html",
  },
];
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
function Router(rootNode) {
  /*definitions locales(interne) des propriétés et fonctions */
  /**
   * route courrante avec informations de route (url, template, param,...)
   */
  var currentRoute = undefined;
  /**
   * change path url and store route as current and set params
   * @param {string} pathName
   */
  function changePathName(pathName) {
    history.pushState(null, null, pathName);
    var route = routes.find(r=>r.path===pathName);
    route.pathName = pathName;
    currentRoute = route;
  }
  /**
   * chargement DOM du template
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
    getContentFromNetwork(currentRoute);
  }
  navigate(location.pathname);
}
