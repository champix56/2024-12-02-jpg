import { updateSVG } from "./commonsSvgFunctions.js";
import { promiseImages } from "./metier/Images.js";
import { Meme } from "./metier/Meme.js";
import { promiseMemes } from "./metier/Memes.js";

let currentMeme = new Meme();
let editorRootSvg = undefined;
export function loadEditor(params) {
  editorRootSvg = document.querySelector("#wrapper svg");
  console.log(params);
  loadEditorEvent();
  const promiseRessources=Promise.all([promiseImages,promiseMemes])
  .then((arrayImagesMemes) => {
    loadSelectImagesInForm(arrayImagesMemes[0]);
    currentMeme=arrayImagesMemes[1].find(m=>m.id===Number(params.id));
    if(undefined!==params.id && undefined===currentMeme){
      //404 NOT FOUND
      return router.navigate(404);
    }
    if(undefined===currentMeme){currentMeme=new Meme();}
    updateForm();
    updateSVG(currentMeme, editorRootSvg);
  });
}
function treatInputStringEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.value;
  updateSVG(currentMeme, editorRootSvg);
}
function treatInputNumberEventChange(evt) {
  currentMeme[evt.target.name] = parseInt(evt.target.value);
  updateSVG(currentMeme, editorRootSvg);
}
function treatCheckEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.checked;
  updateSVG(currentMeme, editorRootSvg);
}
function loadEditorEvent() {
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    currentMeme.save();
  });
  document.forms["editor-form"]["text"].addEventListener(
    "input",
    treatInputStringEventChange
  );
  document.forms["editor-form"]["imageId"].addEventListener(
    "change",
    treatInputNumberEventChange
  );
  document.forms["editor-form"]["x"].addEventListener(
    "change",
    treatInputNumberEventChange
  );
  document.forms["editor-form"]["y"].addEventListener(
    "change",
    treatInputNumberEventChange
  );
  document.forms["editor-form"]["color"].addEventListener(
    "change",
    treatInputStringEventChange
  );
  document.forms["editor-form"]["fontSize"].addEventListener(
    "change",
    treatInputNumberEventChange
  );
  document.forms["editor-form"]["fontWeight"].addEventListener(
    "change",
    treatInputStringEventChange
  );
  document.forms["editor-form"]["underline"].addEventListener(
    "change",
    treatCheckEventChange
  );
  document.forms["editor-form"]["italic"].addEventListener(
    "change",
    treatCheckEventChange
  );
}
/**
 *
 * @param {Images} images
 */
const loadSelectImagesInForm = (images) => {
  const select = document.forms["editor-form"]["imageId"];
  const optionBase = select.children[0];
  select.innerHTML = "";
  select.appendChild(optionBase);
  images.forEach((image) => {
    const optionClone = optionBase.cloneNode(true);
    optionClone.value = image.id;
    optionClone.innerHTML = image.name;
    select.appendChild(optionClone);
  });
  // debugger;
};

const updateForm = () => {
  document.forms["editor-form"]["text"].value = currentMeme.text;
  document.forms["editor-form"]["x"].value = currentMeme.x;
  document.forms["editor-form"]["y"].value = currentMeme.y;
  document.forms["editor-form"]["color"].value = currentMeme.color;
  document.forms["editor-form"]["imageId"].value = currentMeme.imageId;
  document.forms["editor-form"]["fontWeight"].value = currentMeme.fontWeight;
  document.forms["editor-form"]["fontSize"].value = currentMeme.fontSize;
  document.forms["editor-form"]["italic"].checked = currentMeme.italic;
  document.forms["editor-form"]["underline"].checked = currentMeme.underline;
};
