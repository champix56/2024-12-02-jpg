import { updateSVG } from "./commonsSvgFunctions.js";
import { promiseImages } from "./metier/Images.js";
import { promiseMemes } from "./metier/Memes.js";
import { router } from "./router.js";

export const loadThumbnail = () => {
  const viewer = document.querySelector("#wrapper .thumbnail-viewer");
  const thumbnail = document.querySelector("#thumbnail");
  thumbnail.innerHTML = "";
  //pour chaque meme
  Promise.all([promiseImages, promiseMemes]).then((aim) => {
    aim[1].forEach((m) => {
      const newViewer = viewer.cloneNode(true);
      updateSVG(m, newViewer.querySelector("svg"));
      newViewer.querySelector("a").href = "/edit/" + m.id;
      newViewer.querySelector("a").addEventListener("click", (evt) => {
        evt.preventDefault();
        router.navigate("/edit/" + m.id);
      });
      newViewer.querySelector("span").innerHTML = m.id;
      thumbnail.appendChild(newViewer);
    });
  });
};
