import { createCards } from "./createCards.js";

var photographers = new Array();
var selectedTag = new Array();

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

//Listen to the window scroll, if the window Y position is higher than 60 I show the anchor link by adding it a class

window.addEventListener("scroll", function (e) {
  const anchorLink = document.querySelector(".anchor__link");
  if (window.scrollY > 60) {
    anchorLink.classList.add("showAnchor");
  } else {
    anchorLink.classList.remove("showAnchor");
  }
});

//select all the tags in the header
var tagsList = document.querySelectorAll(".navbar__elt .btn");

//loop through all the tags and listen to the clicks
tagsList.forEach(function (elt) {
  //Listening to the tags click to filter the photo by theire tags.
  elt.addEventListener("click", (e) => {
    var tag = e.target;
    tagsList.forEach((elt) => {
      if (elt.classList.contains("isActive") && elt != tag) {
        elt.classList.remove("isActive");
      }
    });
    tag.classList.toggle("isActive");
    if (tag.classList.contains("isActive"))
      selectedTag = tag.innerText.toLowerCase();
    else selectedTag = "";

    if (selectedTag.length > 0) filterPhotographers(selectedTag);
    else createCards(photographers);
  });
});

function filterPhotographers(selectedTags) {
  const selectedPhotographers = photographers.filter((photographer) => {
    return photographer.tags.some((tag) => {
      return selectedTags.includes(tag);
    });
  });
  createCards(selectedPhotographers);
}
