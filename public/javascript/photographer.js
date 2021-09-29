import { createBanner } from "/public/javascript/createBanner.js";
//retrieve the id of the photagrapher that is stored in the URL params
const urlId = new URLSearchParams(window.location.search).get("id");
//Create a variable to store the photographer's information
var photographer;
var photographerContent;

fetch("../../assets/fishEyeData.json")
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
    console.log(photographerContent[0]);
    createBanner(photographer);
    createGallery(photographerContent);
    getTotalLikes(photographerContent);
    getRate(photographer);
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
    card.id = media.photographerId;

    if (media.image) {
      var cardImg = document.createElement("img");
      cardImg.className = "gallery__img";
      cardImg.setAttribute(
        "src",
        `/public/img/SamplePhotos/${firstName}/low/${media.image}`
      );

      card.appendChild(cardImg);
    } else if (media.video) {
      var cardVideo = document.createElement("video");
      cardVideo.className = "gallery__img";
      var videoSrc = document.createElement("source");
      videoSrc.setAttribute(
        "src",
        `/public/img/SamplePhotos/${firstName}/${media.video}`
      );
      videoSrc.setAttribute("type", "video/mp4");
      cardVideo.appendChild(videoSrc);
      card.appendChild(cardVideo);
    }

    var cardInfo = document.createElement("div");
    cardInfo.className = "gallery__info";
    cardInfo.id = media.id;

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
      )}</span><i class='fas fa-heart' arial-label="likes"></i>`
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

function getTotalLikes(content) {
  var likesElt = document.querySelector(".footer__likes");
  var likes = content.reduce((total, elt) => total + elt.likes, 0);
  likesElt.innerText = likes;
}

function getRate(photographer) {
  var rateElt = document.querySelector(".footer__rate");
  rateElt.innerText = photographer.price;
}

function likesListener() {
  var likesIcons = document.querySelectorAll(".gallery__card .fa-heart");
  likesIcons.forEach((elt) => {
    elt.addEventListener("click", (e) => {
      let photoId = parseInt(e.target.parentNode.parentNode.id);
      let photo = photographerContent.filter((photo) => {
        return photo.id === photoId;
      })[0];
      if (photo.isLiked) {
        photo.likes--;
        photo.isLiked = false;
        console.log(photographerContent[0]);
      } else {
        photo.likes++;
        photo.isLiked = true;
        console.log(photographerContent[0]);
      }
    });
  });
}
