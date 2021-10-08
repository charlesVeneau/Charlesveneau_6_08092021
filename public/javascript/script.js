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
    tagFilter();
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

function tagFilter() {
  //select all the tags in the page
  const tags = document.querySelectorAll(".btn");
  const headerTags = document.querySelectorAll(".navbar__elt .btn");

  //loop through all the tags
  tags.forEach((tag) => {
    let filterTag = "";
    //add a listener on every button to activate the class in the header
    tag.addEventListener("click", function () {
      let selectedTag = this.innerText.toLowerCase();
      //loop through the header tags to find the matching one
      headerTags.forEach((headerTag) => {
        if (headerTag.innerText.toLowerCase() === selectedTag) {
          if (headerTag.classList.contains("isActive")) {
            headerTag.classList.remove("isActive");
            filterTag = "";
          } else {
            headerTag.classList.add("isActive");
            filterTag = selectedTag;
          }
        } else if (headerTag.classList.contains("isActive")) {
          headerTag.classList.remove("isActive");
        }
      });
      if (filterTag.length > 0) filterPhotographers(filterTag);
      else showPhotographers();
    });
  });
}

function filterPhotographers(element) {
  const selectedPhotographers = photographers.filter((photographer) => {
    return photographer.tags.some((tag) => {
      return element === tag;
    });
  });
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {});
}

function showPhotographers() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card.classList.contains("isHidden")) card.classList.remove("isHidden");
  });
}
