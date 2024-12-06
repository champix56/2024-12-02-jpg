import { Meme } from "./Meme.js";

class Memes extends Array {
  static #endpoint = "/memes";
  static get endpoint() {
    return this.#endpoint;
  }
  constructor() {
    super();
  }
  //static set endpoint(value){this.#endpoint=value;}
  /**
   *   chargement Promiser vers REST pour les Memes
   * @returns {Promise<Memes>} promise de chargement de l'instance de Memes
   */
  load() {
    return fetch(`http://localhost:5679${Memes.endpoint}`)
      .then((response) => {
        return response.json();
        //decomposition flux const monStrJson=lectureStrem();
        //return JSON.parse(monStrJson);
      })
      .then((array) => {
        //vidange a partir de l'element position 0 de l'instance this
        this.splice(0);
        //Object.assign(this,array);
        // array.forEach(element => {
        //     const unMeme = Object.assign(new Meme(),element);
        //     this.push(unMeme);
        // });
        const tableauDesMemesAssembled = array.map((element) =>
          Object.assign(new Meme(), element)
        );
        //Object.assign(this,tableauDesMemesAssembled)
        //push des elements un par un decomposés par le spread operator ...
        this.push(...tableauDesMemesAssembled);
        //retour pour charge de la promise
        return this;
      });
  }
  /**
   * ajout ou update un meme existant
   * @param {Meme} meme
   */
  addMeme(meme) {
    const position = this.findIndex((m) => m.id === meme.id);
    if (position == -1) {
      this.push(meme);
    }
    else{
      this[position]=meme;
    }
  }
}
export const memes = new Memes();
export const promiseMemes = memes.load();
