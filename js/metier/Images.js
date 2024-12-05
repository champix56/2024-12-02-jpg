class Images extends Array {
  #endpoint = "/images";
  constructor() {
    super();
  }
//   /**
//    * portage d'une fonction herité avec traitement
//    * suplementaire que celle herité et deja exposé par l'heritage du extends
//    * @param {Function} params  predicat du find
//    */
//   find(params) {
//     console.log(params);
//     super.find(params);
//   }
  /**
   * chargement de la liste d'images a partir du serveur REST
   * @returns {Promise<Images>} promise<Images> (deja lu) du fetch
   */
  load() {
    return fetch(`http://localhost:5679${this.#endpoint}`, {
      headers: { Accept: "application/json" },
      method: "GET",
    })
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((a) => Object.assign(this, a));
  }
}
const images = new Images();
const promiseImage=images.load();