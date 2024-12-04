function loadingDOM() {
  document.querySelector("#js-notification").remove();
  //document.querySelector("#header button").remove();
  
  document.querySelector("#header button").addEventListener("click", function (evt) {
    console.log("header", evt);
    console.log("header clické");
  });
  /*destruction du dom et des events contenus dans le dom de #header avec innerHTML*/
  document.querySelector("#header button").innerHTML+="Bla bla";
}

document.addEventListener("DOMContentLoaded", loadingDOM);
