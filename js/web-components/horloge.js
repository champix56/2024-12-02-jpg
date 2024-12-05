export class Horloge extends HTMLElement {
  // The browser calls this method when the element is
  // added to the DOM.
  connectedCallback() {
    setInterval(() => {
      // Create a Date object representing the current date.
      const now = new Date( Date.now());

      // Format the date to a human-friendly string, and set the
      // formatted date as the text content of this element.
      this.innerHTML ='<a href="https://fr.piliapp.com/time">'+ now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"</a>";
    }, 1000);
  }
}


