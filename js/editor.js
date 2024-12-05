let currentMeme = new Meme();
let documentSVGNode=undefined;
function loadEditor(params) {
  console.log(params);
  documentSVGNode=document.querySelector('svg');
  loadEditorEvent();
  promiseImage.then((arrayImages) => {
    loadSelectImagesInForm(arrayImages);
  });
}
function treatInputStringEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.value;
}
function treatInputNumberEventChange(evt) {
  currentMeme[evt.target.name] = parseInt(evt.target.value);
  updateCurrent(currentMeme,documentSVGNode);
}
function treatCheckEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.checked;
}
function loadEditorEvent() {
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    currentMeme.save();
  });
  document.forms["editor-form"]["text"].addEventListener("input", treatInputStringEventChange);
  document.forms["editor-form"]["imageId"].addEventListener("change", treatInputNumberEventChange);
  document.forms["editor-form"]["x"].addEventListener("change", treatInputNumberEventChange);
  document.forms["editor-form"]["y"].addEventListener("change", treatInputNumberEventChange);
  document.forms["editor-form"]["color"].addEventListener("change", treatInputStringEventChange);
  document.forms["editor-form"]["fontSize"].addEventListener("change", treatInputNumberEventChange);
  document.forms["editor-form"]["fontWeight"].addEventListener("change", treatInputStringEventChange);
  document.forms["editor-form"]["underline"].addEventListener("change", treatCheckEventChange);
  document.forms["editor-form"]["italic"].addEventListener("change", treatCheckEventChange);
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
 * 
 * @param {Meme} meme 
 * @param {HTMLElement} nodesvg 
 */
const updateCurrent=(meme,nodesvg)=>{
  const img=images.find(i=>i.id===meme.imageId)
  nodesvg.setAttributeNS('http://www.w3.org/2000/svg','xlink:href',`0 0 ${undefined!==img?img.w:500} ${undefined!==img?img.h:500}`);
  nodesvg.innerHTML="";
  // const t=nodesvg.getElementsByTagNameNS("http://www.w3.org/2000/svg","text");
  const t=document.createElementNS("http://www.w3.org/2000/svg","text");

  t.setAttribute("x",meme.x);
  t.setAttribute("y",meme.y);
  t.innerHTML=meme.text;

  nodesvg.appendChild(t);
  if(undefined!==img){
    const image=document.createElementNS("http://www.w3.org/2000/svg","image");
    image.setAttribute("x",0);
    image.setAttribute("y",0);
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href",img.url);
    nodesvg.insertBefore(image,t);
  }


}