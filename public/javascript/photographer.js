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
    console.log(photographerContent);
    createGallery(photographerContent);
  })
  .catch(function (error) {
    console.log(error);
  });

function createBanner(photographer) {
  document.querySelector(".banner__title").innerText = photographer.name;
  document.querySelector(
    ".banner__location"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  document.querySelector(".banner__catchPhrase").innerText =
    photographer.tagline;
  document
    .querySelector(".banner__img")
    .setAttribute(
      "src",
      `/public/img/SamplePhotos/Photographers_ID_Photos/low/${photographer.portrait}`
    );
  document.querySelector(".banner__img").setAttribute("alt", photographer.name);
  photographer.tags.forEach(function (tag) {
    document.querySelector(".banner__list").appendChild(createTagsList(tag));
  });
}

function createTagsList(tag) {
  var listElt = document.createElement("li");
  listElt.className = "banner__listElt";

  var srOnly = document.createElement("span");
  srOnly.className = "sr-only";
  srOnly.innerText = `${tag}`;

  var button = document.createElement("button");
  button.className = "btn";
  button.setAttribute("type", "button");

  button.innerText = `${tag}`;

  listElt.appendChild(button);
  listElt.appendChild(srOnly);

  return listElt;
}

function createGallery(medias) {
  var firstName = photographer.name.split(" ", 1)[0];
  var gallery = document.querySelector(".gallery");

  medias.forEach((media) => {
    var card = document.createElement("div");
    card.className = "gallery__card";

    var cardImg = document.createElement("img");
    cardImg.className = "gallery__img";
    if (media.image.split(".")[1] === "jpg") {
      cardImg.setAttribute(
        "src",
        `/public/img/SamplePhotos/${firstName}/${media.image}`
      );
    }

    var cardInfo = document.createElement("div");
    cardInfo.className = "gallery__info";

    var cardTitle = document.createElement("p");
    cardTitle.className = "gallery__title";
    cardTitle.innerText = `${media.title}`;

    cardInfo.appendChild(cardTitle);

    var cardLikes = document.createElement("p");
    cardLikes.className = "gallery__likes";
    cardLikes.innerText = `${media.likes}`;

    cardInfo.appendChild(cardLikes);

    card.appendChild(cardImg);
    card.appendChild(cardInfo);

    gallery.appendChild(card);
  });
}
