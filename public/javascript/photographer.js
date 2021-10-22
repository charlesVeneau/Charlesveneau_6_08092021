import { createBanner } from "../../public/javascript/createBanner.js";
import { Lightbox } from "../../public/javascript/lightbox.js";
import { ContactForm } from "../../public/javascript/contactForm.js";
//retrieve the id of the photagrapher that is stored in the URL params
const urlId = new URLSearchParams(window.location.search).get("id");
//Create a variable to store the photographer's information
var photographer;
var photographerContent;

fetch("../assets/fishEyeData.json")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (value) {
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
    Lightbox.init();
    ContactForm.init();
  })
  .catch(function (error) {
    console.log(error);
  });

function createGallery(medias) {
  var firstName = photographer.name.split(" ", 1)[0];
  var gallery = document.querySelector(".gallery");

  medias.forEach((media) => {
    var card = document.createElement("article");
    card.className = "gallery__card";
    card.setAttribute("data-id", media.id);
    media.tags.forEach((tag) => {
      card.setAttribute("data-tags", tag);
    });

    var linkImg = document.createElement("a");
    linkImg.className = "gallery__link";
    linkImg.setAttribute("data-title", media.title);

    if (media.image) {
      var cardImg = document.createElement("img");

      cardImg.className = "gallery__img";
      cardImg.setAttribute(
        "src",
        `/public/img/SamplePhotos/${firstName}/low/${media.image}`
      );
      cardImg.setAttribute("alt", media.title);
      linkImg.setAttribute(
        "href",
        `/public/img/SamplePhotos/${firstName}/${media.image}`
      );

      linkImg.appendChild(cardImg);
      card.appendChild(linkImg);
    } else if (media.video) {
      var cardVideo = document.createElement("video");
      cardVideo.className = "gallery__img";
      var videoSrc = document.createElement("source");
      videoSrc.setAttribute(
        "src",
        `/public/img/SamplePhotos/${firstName}/${media.video}`
      );
      cardVideo.setAttribute("alt", media.title);
      linkImg.setAttribute(
        "href",
        `/public/img/SamplePhotos/${firstName}/${media.video}`
      );
      videoSrc.setAttribute("type", "video/mp4");
      cardVideo.appendChild(videoSrc);
      linkImg.appendChild(cardVideo);
      card.appendChild(linkImg);
    }

    var cardInfo = document.createElement("div");
    cardInfo.className = "gallery__info";
    // cardInfo.id = media.id;

    var cardTitle = document.createElement("p");
    cardTitle.className = "gallery__title";
    cardTitle.innerText = `${media.title}`;

    cardInfo.appendChild(cardTitle);

    var cardLikes = document.createElement("p");
    cardLikes.className = "gallery__likes";
    cardLikes.insertAdjacentHTML(
      "beforeend",
      `<span class="likes__num">${getLikes(
        media
      )}</span><button class="likes__btn"><i class='fas fa-heart' arial-label="likes"></i></button>`
    );

    cardInfo.appendChild(cardLikes);

    card.appendChild(cardInfo);

    gallery.appendChild(card);
  });
  likesListener();
}

function getLikes(content) {
  return content.likes;
}

function getTotalLikes() {
  var likesElt = document.querySelector(".tab__likes");
  var likes = photographerContent.reduce((total, elt) => total + elt.likes, 0);
  likesElt.innerText = likes;
}

function getRate(photographer) {
  var rateElt = document.querySelector(".tab__rate");
  rateElt.innerText = photographer.price;
}

function likesListener() {
  var likesBtn = document.querySelectorAll(".likes__btn");
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

const filterBox = document.querySelector("#filter__box");
filterBox.addEventListener("change", function () {
  filterTag(this.value);
});

function filterTag(value) {
  const cards = Array.from(document.querySelectorAll(".gallery__card"));
  console.log(
    cards.sort(function (a, b) {
      return a.getAttribute("data-id") > b.getAttribute("data-id") ? 1 : -1;
    })
  );
}
