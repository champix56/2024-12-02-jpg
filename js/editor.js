let currentMeme=new Meme();
function loadEditor(params) {
  console.log(params);
  loadEditorEvent();
  promiseImage.then((arrayImages) => {
    loadSelectImagesInForm(arrayImages);
  });
}

function loadEditorEvent() {
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("form submit");
  });
  document.forms["editor-form"]["text"].addEventListener("input", function (evt) {
    currentMeme.text=evt.target.value;
  });
  document.forms["editor-form"]["imageId"].addEventListener("change", function (evt) {
    currentMeme.imageId=Number(evt.target.value);
  });
  document.forms["editor-form"]["x"].addEventListener("change", function (evt) {
    currentMeme.x=parseInt( evt.target.value);
  });
  document.forms["editor-form"]["y"].addEventListener("change", function (evt) {
    currentMeme.y=parseInt(evt.target.value);
  });
  document.forms["editor-form"]["color"].addEventListener("change", function (evt) {
    currentMeme.color=evt.target.value;
  });
  document.forms["editor-form"]["fontSize"].addEventListener("change", function (evt) {
    currentMeme.fontSize=parseInt(evt.target.value);
    debugger;
  });
  document.forms["editor-form"]["fontWeight"].addEventListener("change", function (evt) {
    currentMeme.fontWeight=evt.target.value;
  });
  document.forms["editor-form"]["underline"].addEventListener("change", function (evt) {
    currentMeme.underline=evt.target.checked;
  });
  document.forms["editor-form"]["italic"].addEventListener("change", function (evt) {
    currentMeme.italic=evt.target.checked;
  });
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
