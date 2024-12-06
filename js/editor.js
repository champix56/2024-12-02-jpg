let currentMeme = new Meme();
function loadEditor(params) {
  console.log(params);
  loadEditorEvent();
  promiseImages.then((arrayImages) => {
    loadSelectImagesInForm(arrayImages);
  });
}
function treatInputStringEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.value;
}
function treatInputNumberEventChange(evt) {
  currentMeme[evt.target.name] = parseInt(evt.target.value);
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
