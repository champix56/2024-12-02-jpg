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
  save() {
    console.log("save " + this.id + " at " + this.#endpoint, this);
    this.publicSave();
    this.#privateSave();
  }
  publicSave() {
    console.log("public saving");
  }
  #privateSave() {
    console.log("private saving");
  }
}
let meme = new Meme();
meme.save();