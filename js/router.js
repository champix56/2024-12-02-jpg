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
function Router(rootFolderOfTemplates = "/pages") {
  /*definitions locales(interne) des propriétés et fonctions */
  var currentRoute = location.pathname;
  function changePathName(pathName) {
    history.pushState(null, null, pathName);
    currentRoute = location.pathname;
  }
  function loadContentInPage(eventLoader) {}
  function getContentFromNetwork(contentUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", contentUrl);
    xhr.onreadystatechange = function (evt) {
      if (xhr.readyState < XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status >= 400) {
        console.log("erreur" + xhr.status);
      }
      console.log(xhr.responseText);
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
    var url = rootFolderOfTemplates;
    switch (pathName) {
      case "/thumbnail":
        url += "/thumbnail/thumbnail.html";
        break;
      case "/editor":
        url += "/editor/editor.html";
        break;
      default:
        url += "/home/home.html";
        break;
    }
    getContentFromNetwork(url);
    loadContentInPage();
  }
}
