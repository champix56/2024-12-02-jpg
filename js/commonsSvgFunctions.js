import { images } from "./metier/Images.js";

/**
 *  construction interne d'une balise svg pour affichage de meme
 * @param {Meme} meme meme a afficher
 * @param {HTMLElement} svgRootNode noeud svg pour affichage
 */
export const updateSVG = (meme, svgRootNode) => {
    const img = images.find((i) => {
      return i.id === meme.imageId;
    });
    //1. svg viewbox
    svgRootNode.setAttribute(
      "viewBox",
      `0 0 ${undefined !== img ? img.w : "500"} ${
        undefined !== img ? img.h : "500"
      }`
    );
    svgRootNode.innerHTML = "";
    //2.selection a partir de svgRootNode -> text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.innerHTML = meme.text;
    //mise a jour des attributs de text
    text.setAttribute("x", meme.x);
    text.setAttribute("y", meme.y);
    text.setAttribute("font-size", meme.fontSize);
    text.setAttribute("font-weight", meme.fontWeight);
    text.setAttribute("fill", meme.color);
    text.setAttribute("text-decoration", meme.underline ? "underline" : "none");
    text.setAttribute("font-style", meme.italic ? "italic" : "normal");
    svgRootNode.appendChild(text);
  
    if (undefined !== img) {
      const imageSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      imageSVG.setAttribute("x", 0);
      imageSVG.setAttribute("y", 0);
      /*const href=document.createAttributeNS("http://www.w3.org/1999/xlink",'xlink:href');
      href.value=img.url;
      imageSVG.setAttributeNodeNS(href);*/
      imageSVG.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        img.url
      );
  
      svgRootNode.insertBefore(imageSVG, text);
    }
  };