/**
 * class de gestion d'un meme
 */
class Meme {
  id = undefined;
  text = "";
  x = 0;
  y = 10;
  fontSize = 10;
  fontWeight = 500;
  underline = false;
  italic = false;
  color = "#FFFFFF";
  imageId = -1;
  #endpoint = "/memes";
  /**
   * constructor de meme
   */
  constructor() {
    console.log("constructor de meme");
  }
  /**
   * enregistrement (POST ou PUT en fonction de l'id)
   * @returns {Promise} promise de retour (stream lu) du fetch de sauvgarde
   */
  save() {
    const promise = fetch(
      `http://localhost:5679${this.#endpoint}${
        undefined !== this.id ? "/" + this.id : ""
      }`,
      {
        method: undefined !== this.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this),
      }
    ).then((r) => r.json());
    promise.then((o) => {
      Object.assign(this, o);
    });
    return promise;
  }
  publicSave() {
    console.log("public saving");
  }
  #privateSave() {
    console.log("private saving");
  }
}
let meme = new Meme();
//meme.save();
