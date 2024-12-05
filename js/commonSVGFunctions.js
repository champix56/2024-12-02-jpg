import { images } from "./metier/Images.js";

/**
 * update svg node with meme content node for svg
 * @param {Meme} meme
 * @param {HTMLElement} nodesvg
 */
export const updateSVG = (meme, nodesvg) => {
    const img = images.find((i) => i.id === meme.imageId);
    // nodesvg.setAttribute("viewBox",
    nodesvg.attributes["viewBox"].value = `0 0 ${undefined !== img ? img.w : 500
      } ${undefined !== img ? img.h : 500}`;
    //);
    nodesvg.innerHTML = "";
    // const t=nodesvg.getElementsByTagNameNS("http://www.w3.org/2000/svg","text");
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  
    t.setAttribute("x", meme.x);
    t.setAttribute("y", meme.y);
  
    t.setAttribute("font-weight", meme.fontWeight);
    t.setAttribute("font-size", meme.fontSize);
    t.setAttribute("fill", meme.color);
    t.setAttribute("text-decoration", meme.underline ? "underline" : "none");
    t.setAttribute("font-style", meme.italic ? "italic" : "normal");
  
    t.innerHTML = meme.text;
  
    nodesvg.appendChild(t);
    if (undefined !== img) {
      const image = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      image.setAttribute("x", 0);
      image.setAttribute("y", 0);
      image.setAttributeNS("http://www.w3.org/1999/xlink", "href", img.url);
      nodesvg.insertBefore(image, t);
    }
  };
  