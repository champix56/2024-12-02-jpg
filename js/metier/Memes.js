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
const memes=new Memes();
const promiseMemes=memes.load();