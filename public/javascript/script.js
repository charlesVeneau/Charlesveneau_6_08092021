import { createCards } from "./createCards.js";

var photographers = new Array();

//fetch function that retrieve the photographers informations and set it to the photographers array
fetch("assets/fishEyeData.json")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (value) {
    photographers = value.photographers;
    createCards(photographers);
  })
  .catch(function (error) {
    console.log(error);
  });

window.addEventListener("scroll", function (e) {
  const anchorLink = document.querySelector(".anchor__link");
  if (window.scrollY > 40) {
    anchorLink.classList.add("showAnchor");
  } else {
    anchorLink.classList.remove("showAnchor");
  }
  //   console.log(window.scrollY);
});
