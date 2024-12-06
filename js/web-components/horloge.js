/**
 * class du webComponent horloge
 */
export class Horloge extends HTMLElement {
  #interval=undefined;
    constructor(){
        super();
        const templateClone = document.querySelector('#horloge-template').content.children[0].cloneNode(true);
        this.appendChild(templateClone);
    }
  // The browser calls this method when the element is
  // added to the DOM.
  /**
   * fonction executé lors de la connexion(customElement.defined)
   */
  connectedCallback() {
    this.#interval=setInterval(() => {
      // Create a Date object representing the current date.
      const now = new Date( Date.now());

      // Format the date to a human-friendly string, and set the
      // formatted date as the text content of this element.
      this.querySelector('a').innerHTML = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    }, 1000);
  }
  disconnectedCallback(){
    clearInterval(this.#interval);
  }
}


//https://ultimatecourses.com/blog/lifecycle-hooks-in-web-components#disconnectedcallback
//demo des cycles de vie