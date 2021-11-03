import { createCards } from "./createCards.js";

let photographers = new Array();

//fetch function that retrieve the photographers informations and set it to the photographers array
fetch("assets/fishEyeData.json")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((value) => {
    photographers = value.photographers;
    createCards(photographers);
    tagFilter();
  })
  .catch((error) => {
    console.log(error);
  });

//Listen to the window scroll, if the window Y position is higher than 50 I show the anchor link by adding it a class

window.addEventListener("scroll", (e) => {
  const anchorLink = document.querySelector(".anchor__link");
  if (window.scrollY > 50) {
    anchorLink.classList.add("showAnchor");
  } else {
    anchorLink.classList.remove("showAnchor");
  }
});

function tagFilter() {
  //select all the tags in the page
  const tags = document.querySelectorAll(".btn");
  const headerTags = document.querySelectorAll(".navbar__elt .btn");

  //loop through all the tags and push the selected tag into a variable to be sent as an argument to the filterPhotographers function
  tags.forEach((tag) => {
    let filterTag = "";
    //add a listener on every button to activate the class in the header
    tag.addEventListener("click", function () {
      let selectedTag = this.innerText.toLowerCase();
      /*loop through the header tags to find the matching one
      if there is a match we add or remove a class, regarding if it's a new filter or the user wanting to reset the tags*/
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
      //If there is no tag containing the isActive class, then we reset the gallery by caling the showPhotographers function
      else showPhotographers();
    });
  });
}

function filterPhotographers(element) {
  /* using the filter method we can create a new array with only the filtered photographers*/
  const selectedPhotographers = photographers.filter((photographer) =>
    photographer.tags.some((tag) => element === tag)
  );
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    //In order to compare if the current photographer needs to be show or hide will create a boolean using the some method
    const isTrue = selectedPhotographers.some(
      (photographer) => photographer.id == card.getAttribute("data-id")
    );
    if (isTrue) card.classList.remove("isHidden");
    else card.classList.add("isHidden");
  });
}

function showPhotographers() {
  /*this function loops through all the cards and remove the isHidden class in order to show all the cards*/
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card.classList.contains("isHidden")) card.classList.remove("isHidden");
  });
}
