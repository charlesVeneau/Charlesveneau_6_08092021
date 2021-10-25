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
      `../public/img/SamplePhotos/Photographers_ID_Photos/low/${photographer.portrait}`
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

export { createBanner };
