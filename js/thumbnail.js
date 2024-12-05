import { updateSVG } from "./commonSVGFunctions.js";
import { promiseImages } from "./metier/Images.js";
import { promiseMemes } from "./metier/Memes.js";

export function loaderThumbnail() {
  const aSvg = document.querySelector("#wrapper .thumbnail-viewer");
  document.querySelector("#thumbnail").innerHTML = "";
  Promise.all([promiseImages, promiseMemes]).then((aim) => {
    aim[1].forEach((m) => {
      const mASvg = aSvg.cloneNode(true);
      updateSVG(m, mASvg.querySelector("svg"));
      mASvg.querySelector('a').href = "/edit/" + m.id;
      mASvg.querySelector("h5 span").innerHTML = m.id;
      document.querySelector("#thumbnail").appendChild(mASvg);
      mASvg.id="meme-"+m.id
    });
  });
}
