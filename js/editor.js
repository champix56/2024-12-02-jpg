let currentMeme = new Meme();
let editorRootSvg = undefined;
function loadEditor(params) {
  editorRootSvg = document.querySelector("#wrapper svg");
  console.log(params);
  loadEditorEvent();
  promiseImages.then((arrayImages) => {
    loadSelectImagesInForm(arrayImages);
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
/**
 *  construction interne d'une balise svg pour affichage de meme
 * @param {Meme} meme meme a afficher
 * @param {HTMLElement} svgRootNode noeud svg pour affichage
 */
const updateSVG = (meme, svgRootNode) => {
  //1. svg viewbox

  //2.selection a partir de svgRootNode -> text
  const text = svgRootNode.querySelector("text");
  text.innerHTML = meme.text;
  //mise a jour des attributs de text
  text.setAttribute("x", meme.x);
  text.setAttribute("y", meme.y);
  text.setAttribute("font-size", meme.fontSize);
  text.setAttribute("font-weight", meme.fontWeight);
  text.setAttribute("fill", meme.color);
  text.setAttribute("text-decoration", meme.underline?'underline':'none');
  text.setAttribute("font-style", meme.italic?'italic':'normal');

};
