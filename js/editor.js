let currentMeme = new Meme();
let editorRootSvg = undefined;
function loadEditor(params) {
  editorRootSvg = document.querySelector("#wrapper svg");
  console.log(params);

  loadEditorEvent();
  const promiseRessources=Promise.all([promiseImages,promiseMemes])
  .then((arrayImagesMemes) => {
    loadSelectImagesInForm(arrayImagesMemes[0]);
    currentMeme=arrayImagesMemes[1].find(m=>m.id===Number(params.id));
    if(undefined!==params.id && undefined===currentMeme){
      //404 NOT FOUND
      router.navigate('/edit');
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
/**
 *  construction interne d'une balise svg pour affichage de meme
 * @param {Meme} meme meme a afficher
 * @param {HTMLElement} svgRootNode noeud svg pour affichage
 */
const updateSVG = (meme, svgRootNode) => {
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
