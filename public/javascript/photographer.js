import { Card } from "../../public/javascript/galleryCard.js";
import { createBanner } from "../../public/javascript/createBanner.js";
import { Lightbox } from "../../public/javascript/lightbox.js";
import { ContactForm } from "../../public/javascript/contactForm.js";
//retrieve the id of the photagrapher that is stored in the URL params
const urlId = new URLSearchParams(window.location.search).get("id");
//Create a constiable to store the photographer's information
let photographer;
let photographerContent;

fetch("../assets/fishEyeData.json")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((value) => {
    photographer = value.photographers.filter(function (photographer) {
      return photographer.id == urlId;
    })[0];
    photographerContent = value.media.filter(function (media) {
      return media.photographerId == urlId;
    });
    //put the photographer name in the head title
    document.title += ` | ${photographer.name}`;
    createBanner(photographer);
    createGallery(photographerContent);
    getTotalLikes();
    tagFilter();
    getRate(photographer);
    ContactForm.init();
  })
  .catch((error) => {
    console.log(error);
  });

function createGallery(medias) {
  const firstName = photographer.name.split(" ", 1)[0];
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  medias.forEach((media) => {
    new Card(media, firstName);
  });
  likesListener();
  Lightbox.init();
}

function getLikes(content) {
  return content.likes;
}

function getTotalLikes() {
  const likesElt = document.querySelector(".tab__likes");
  const likes = photographerContent.reduce(
    (total, elt) => total + elt.likes,
    0
  );
  likesElt.innerText = likes;
}

function getRate(photographer) {
  const rateElt = document.querySelector(".tab__rate");
  rateElt.innerText = photographer.price;
}

function likesListener() {
  const likesBtn = document.querySelectorAll(".likes__btn");
  likesBtn.forEach((elt) => {
    elt.addEventListener("click", function () {
      let photoId = parseInt(
        this.parentNode.parentNode.parentNode.getAttribute("data-id")
      );
      let photo = photographerContent.filter((photo) => {
        return photo.id === photoId;
      })[0];
      if (photo.isLiked) {
        photo.likes--;
        photo.isLiked = false;
      } else {
        photo.likes++;
        photo.isLiked = true;
      }
      this.parentNode.querySelector(".likes__num").innerText = getLikes(photo);
      getTotalLikes();
    });
  });
}

function tagFilter() {
  const tags = document.querySelectorAll(".btn");

  tags.forEach((tag) => {
    let filterTag = "";
    tag.addEventListener("click", function () {
      tags.forEach((tag) => {
        if (tag.classList.contains("isActive")) {
          tag.classList.remove("isActive");
          filterTag = "";
        } else {
          if (this === tag) {
            tag.classList.add("isActive");
            filterTag = tag.innerText.toLowerCase();
          }
        }
      });
      filterGallery(filterTag);
    });
  });
}

function filterGallery(filterTag) {
  const cards = document.querySelectorAll(".gallery__card");
  cards.forEach((card) => {
    if (filterTag === "" || card.getAttribute("data-tags") === filterTag)
      card.classList.remove("isHidden");
    else if (card.getAttribute("data-tags") != filterTag) {
      card.classList.add("isHidden");
    }
  });
}

const orderByBox = document.querySelector("#orderBy__box");
orderByBox.addEventListener("change", function () {
  orderBy(this.value);
});

function orderBy(value) {
  const content = Array.from(photographerContent);
  let ordered;
  if (value === "popularity") {
    ordered = content.sort(function (a, b) {
      return a.likes < b.likes ? 1 : -1;
    });
  } else if (value === "date") {
    ordered = content.sort(function (a, b) {
      return a.date.replaceAll("-", "") < b.date.replaceAll("-", "") ? 1 : -1;
    });
  } else if (value === "title") {
    ordered = content.sort((a, b) => a.title.localeCompare(b.title));
  }
  createGallery(ordered);
}
