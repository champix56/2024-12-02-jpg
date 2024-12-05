function loadEditor(params){
  console.log(params);
  loadEditorEvent();
}

function loadEditorEvent() {
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("form submit");
  });
}
