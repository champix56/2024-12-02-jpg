/**
 * Liste des routes avec configuration
 */
var routes = [
  {
    name: "Thumbnail",
    pathName: /\/thumbnail$/,
    templateUrl: "/pages/thumbnail/thumbnail.html",
    //loaderJs: loadThumbnail,
  },
  {
    name: "Editor",
    pathName: /\/editor((\/(?<id>\d+))|\/)?$/,
    templateUrl: "/pages/editor/editor.html",
    loaderJs: loadEditorEvent,
  },
  {
    name: "Home",
    pathName: /\/$/,
    template: '\
        <div id="home">\
            <h2>Bienvenue</h2>\
            <p>Voici le nouvel editeur de meme avec enregistrement REST</p>\
        </div>\
    ',
  },
];
var errorRoutes = {
  404: { name: "Not Found", templateUrl: "/pages/errors/404.html" },
};
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
  /**
   * current route object
   */
  var currentRoute = undefined;
  /**
   * set as currentRoute the routeObject who match the good regex or set error page as route
   * @param {object} pathName
   */
  function changePathName(pathName) {
    var params = undefined;
    var route = routes.find(function (r) {
      var regRet = r.pathName.exec(pathName);
      console.log(regRet);
      if (regRet !== null) {
        params = regRet.groups;
        return true;
      } else {
        return false;
      }
    });
    if (route == undefined) {
      route = errorRoutes[404];
    }
    route.params = params;
    history.pushState(null, null, pathName);
    currentRoute = route;
  }
  /**
   *
   * @param {*} routeWithTemplate
   */
  function loadContentInPage(routeWithTemplate) {
    rootNode.innerHTML = routeWithTemplate.template;
    if (
      routeWithTemplate.loaderJs !== undefined &&
      routeWithTemplate.loaderJs !== null
    ) {
      routeWithTemplate.loaderJs(routeWithTemplate.params);
    }
  }
  /**
   * loading from network route Content
   * @param {object} route route object
   */
  function getContentFromNetwork(route) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", route.templateUrl);
    xhr.onreadystatechange = function (evt) {
      if (xhr.readyState < XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status >= 400) {
        console.log("erreur" + xhr.status);
      }
      console.log(xhr.responseText);
      route.template = xhr.responseText;
      loadContentInPage(route);
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
    //chargement direct de template sans chargement reseau
    if (currentRoute.template) {
      loadContentInPage(currentRoute);
    } else {
      getContentFromNetwork(currentRoute);
    }
  }
  //execution de la route courrante a l'initialisation
  navigate(location.pathname);
}
var router = undefined;
document.addEventListener("DOMContentLoaded", () => {
  router = new Router(document.querySelector("#wrapper"));
});
