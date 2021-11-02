function createBanner(photographer) {
  document.querySelector(".banner__title").innerText = photographer.name;
  document.querySelector(
    ".banner__location"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  document.querySelector(".banner__catchPhrase").innerText =
    photographer.tagline;
  let bannerImg = document.createElement("img");
  bannerImg.className = "banner__img";
  bannerImg.setAttribute(
    "src",
    `../public/img/SamplePhotos/Photographers_ID_Photos/low/${photographer.portrait}`
  );
  bannerImg.setAttribute("alt", photographer.name);
  document.querySelector(".banner__aside").appendChild(bannerImg);
  photographer.tags.forEach((tag) => {
    document.querySelector(".banner__list").appendChild(createTagsList(tag));
  });
}

function createTagsList(tag) {
  let listElt = document.createElement("li");
  listElt.className = "banner__listElt";

  let srOnly = document.createElement("span");
  srOnly.className = "sr-only";
  srOnly.innerText = `${tag}`;

  let button = document.createElement("button");
  button.className = "btn";
  button.setAttribute("type", "button");

  button.innerText = `${tag}`;

  listElt.appendChild(button);
  listElt.appendChild(srOnly);

  return listElt;
}

export { createBanner };
