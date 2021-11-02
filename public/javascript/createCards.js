function createCards(elements) {
  //Get the DOM content element
  let sectionElt = document.querySelector(".section");
  //loop through all the photographers to create a card
  sectionElt.innerHTML = "";
  elements.forEach((element) => {
    let card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-id", element.id);
    card.appendChild(createCardLink(element));
    card.appendChild(createCardInfo(element));
    card.appendChild(createCardTagsList(element.tags));
    //add the card to the content section in the body element
    sectionElt.appendChild(card);
  });
}

// 1. createCardLink

function createCardLink(element) {
  let cardLink = document.createElement("a");
  cardLink.className = "card__link";
  cardLink.setAttribute("href", `./photographers/profil.html?id=${element.id}`);
  cardLink.setAttribute("aria-label", `${element.name}`);

  let cardImg = document.createElement("img");
  cardImg.className = "card__img";
  cardImg.setAttribute(
    "src",
    `./public/img/SamplePhotos/Photographers_ID_Photos/low/${element.portrait}`
  );
  cardImg.setAttribute("alt", element.name);
  cardLink.appendChild(cardImg);

  let cardTitle = document.createElement("h2");
  cardTitle.className = "card__title";
  cardTitle.innerText = element.name;
  cardLink.appendChild(cardTitle);

  return cardLink;
}

// 2. create card info

function createCardInfo(element) {
  let cardInfo = document.createElement("div");
  cardInfo.className = "card__info";

  let cardLocation = document.createElement("p");
  cardLocation.className = "card__location";
  cardLocation.innerText = `${element.city}, ${element.country}`;
  cardInfo.appendChild(cardLocation);

  let cardCatchPhrase = document.createElement("p");
  cardCatchPhrase.className = "card__catchPhrase";
  cardCatchPhrase.innerText = `${element.tagline}`;
  cardInfo.appendChild(cardCatchPhrase);

  let cardPrice = document.createElement("p");
  cardPrice.className = "card__dailyRate";
  cardPrice.innerText = `${element.price}€/jour`;
  cardInfo.appendChild(cardPrice);

  return cardInfo;
}

// 3. create the tag list

function createCardTagsList(list) {
  let cardList = document.createElement("ul");
  cardList.className = "card__list";

  list.forEach((tag) => {
    let listElt = document.createElement("li");
    listElt.className = "card__listElt";

    let srOnly = document.createElement("span");
    srOnly.className = "sr-only";
    srOnly.innerText = `Tag ${tag}`;

    let button = document.createElement("button");
    button.className = "btn";
    button.setAttribute("type", "button");

    button.innerText = `${tag}`;

    listElt.appendChild(button);
    listElt.appendChild(srOnly);
    cardList.appendChild(listElt);
  });

  return cardList;
}

export { createCards };
