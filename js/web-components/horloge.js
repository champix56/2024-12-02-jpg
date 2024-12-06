/**
 * class du webComponent horloge
 */
export class Horloge extends HTMLElement {
  #interval=undefined;
  #format="toLocaleTimeString";
    constructor(){
        super();
        const templateClone = document.querySelector('#horloge-template').content.children[0].cloneNode(true);
        this.appendChild(templateClone);
        this.addEventListener("mouseenter", (event) => {
          this.setAttribute("hover",true);
        });
        this.addEventListener("mouseleave", (event) => {
          this.setAttribute("hover",false);
        });
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
      this.querySelector('a').innerHTML =now[this.#format]();
      // now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    }, 1000);
  }
  disconnectedCallback(){
    clearInterval(this.#interval);
  }
  /**
   * getter des attributs observés du webcomponent
   */
  static get observedAttributes() {
    return ['hover'];
  }
  /**
   * observed (listed by observedAttributes) attribute change 
   * @param {string} name nom de l'attribut
   * @param {string} oldValue ancienne valeur
   * @param {string} newValue nouvelle
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(arguments);
    if(name==='hover'){
      if(newValue==='true'){
        this.#format="toLocaleDateString";
      }
      else{
        this.#format="toLocaleTimeString";
      }
    }
  }
}


//https://ultimatecourses.com/blog/lifecycle-hooks-in-web-components#disconnectedcallback
//demo des cycles de vie