var routes = [
  {
    name: "Thumbnail",
    path: /^\/thumbnail$/,
    url: "/pages/thumbnail/thumbnail.html",
  },
  {
    name: "Editor",
    path: /^\/edit((\/)|(\/(?<id>\d+)))?$/,
    url: "/pages/editor/editor.html",
    loaderJs: loadEditor,
  },
  {
    name: "Home",
    path: /^\/?$/,
    url: "/pages/home/home.html",
  },
];
var errorsRoutes = {
  404: {
    name: "error 404 not found",
    url: "/pages/errors/404.html",
    status: 404,
    statusText: "not found",
    loaderJs: function () {
      document.title = `${location.href} ${this.status} ${this.statusText}`;
      console.error(this.name + " chemin :" + this.pathName, location.href);
      document.querySelectorAll("#wrapper a").forEach((a) =>
        a.addEventListener("click", (evt) => {
          evt.preventDefault();
          router.navigate("/");
        })
      );
    },
  },
  500: {
    name: "error 500 internal server error",
    url: "/pages/errors/500.html",
    status: 500,
    statusText: "internal server error",
    loaderJs: function () {
      document.title = `${location.href} ${this.status} ${this.statusText}`;
      console.error(this.name + " chemin :" + this.pathName, location.href);
      document.querySelector("#message").innerHTML = this.message;
      document.querySelectorAll("#wrapper a").forEach((a) =>
        a.addEventListener("click", (evt) => {
          evt.preventDefault();
          router.navigate("/");
        })
      );
    },
  },
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
    if (currentRoute === undefined) {
      history.pushState(null, null, pathName);
      var m;
      var route = routes.find((r) => {
        m = r.path.exec(pathName);
        return m !== null;
      });
      if (undefined !== route) {
        route.params = m.groups;
      } else {
        route = errorsRoutes[404];
      }
      currentRoute = route;
    }
    currentRoute.pathName = pathName;
  }
  /**
   * chargement DOM du template
   * @param {object} routeObject
   */
  function loadContentInPage(routeObject) {
    rootNode.innerHTML = routeObject.template;
    if (typeof routeObject.loaderJs === "function") {
      routeObject.loaderJs(currentRoute.params);
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
      //console.log(xhr.responseText);
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
  function navigate(pathName = "/", message) {
    currentRoute = undefined;
    if (Number.isInteger(pathName)) {
      currentRoute = errorsRoutes[pathName];
      currentRoute.message = message;
    }
    changePathName(pathName);

    if (undefined !== currentRoute.template) {
      loadContentInPage(currentRoute);
    } else {
      getContentFromNetwork(currentRoute);
    }
  }
  navigate(location.pathname);
}
export let router;
export const initRouter=(routerDomNode)=>{
  router=new Router(routerDomNode);
}

