import { Meme } from "./Meme.js";

class Memes extends Array {
  #endpoint = "/memes";
  constructor() {
    super();
  }
  load() {
    return fetch("http://localhost:5679" + this.#endpoint)
      .then((r) => r.json())
      .then((a) => {
        this.splice(0);
        a.forEach((meme) => {
          const m = new Meme();
          this.push(Object.assign(m, meme));
        });
        console.log(this);
        return this;
      });
  }
}
export const memes=new Memes();
export const promiseMemes=memes.load();