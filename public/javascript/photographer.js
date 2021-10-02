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
    createBanner(photographer);
    createGallery(photographerContent);
    getTotalLikes();
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

    var btnImg = document.createElement("button");
    btnImg.className = "gallery__btn";

    if (media.image) {
      var cardImg = document.createElement("img");
      cardImg.className = "gallery__img";
      cardImg.setAttribute(
        "src",
        `/public/img/SamplePhotos/${firstName}/low/${media.image}`
      );

      btnImg.appendChild(cardImg);
      card.appendChild(btnImg);
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
      btnImg.appendChild(cardVideo);
      card.appendChild(btnImg);
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
      console.log(this);
      let photoId = parseInt(this.parentNode.parentNode.id);
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
