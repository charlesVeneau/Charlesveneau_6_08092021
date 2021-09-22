import { createCards } from "./createCards.js";

var photographers = new Array();
var selectedTags = new Array();

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
    tag.classList.toggle("isActive");
    if (tag.classList.contains("isActive")) {
      selectedTags.push(tag.innerText.toLowerCase());
    } else {
      selectedTags = selectedTags.filter((elt) => {
        return elt != tag.innerText.toLowerCase();
      });
    }
    console.log(selectedTags);
    if (selectedTags.length > 0) {
      filterPhotographers(selectedTags);
    } else {
      createCards(photographers);
    }
  });
});

function filterPhotographers(selectedTags) {
  const selectedPhotographers = photographers.filter((photographer) => {
    return photographer.tags.some((tag) => {
      return selectedTags.includes(tag);
    });
  });
  console.log(selectedPhotographers);
  createCards(selectedPhotographers);
}
