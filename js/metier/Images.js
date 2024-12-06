class Images extends Array {
  #endpoint = "/images";
  constructor() {
    super();
  }
  /**
   * portage d'une fonction herité avec traitement
   * suplementaire que celle herité et deja exposé par l'heritage du extends
   * @param {Function} params  predicat du find
   */
  find(params) {
    console.trace(params);
    return super.find(params);
  }
  /**
   * chargement de la liste d'images a partir du serveur REST
   * @returns {Promise<Images>} promise<Images> (deja lu) du fetch
   */
  load() {
    console.time("load-images");
    return fetch(`http://localhost:5679${this.#endpoint}`, {
      headers: { Accept: "application/json" },
      method: "GET",
    })
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((a) =>{
        console.table(a);
        Object.assign(this, a);
        console.timeEnd("load-images");
        return this;
      });
  }
}
const images = new Images();
const promiseImages=images.load();