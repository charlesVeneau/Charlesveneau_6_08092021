class Card {
  constructor(media, firstName) {
    this.card = this.buildCard(media, firstName);
    const gallery = document.querySelector(".gallery");
    gallery.appendChild(this.card);
  }

  buildCard(media, firstName) {
    const card = document.createElement("article");
    card.className = "gallery__card";
    card.setAttribute("data-id", media.id);
    card.setAttribute("data-date", media.date.replaceAll("-", ""));
    media.tags.forEach((tag) => {
      card.setAttribute("data-tags", tag);
    });

    const linkImg = document.createElement("a");
    linkImg.className = "gallery__link";
    linkImg.setAttribute("data-title", media.title);

    if (media.image) {
      const cardImg = document.createElement("img");

      cardImg.className = "gallery__img";
      cardImg.setAttribute(
        "src",
        `../public/img/SamplePhotos/${firstName}/low/${media.image}`
      );
      cardImg.setAttribute("alt", media.title);
      linkImg.setAttribute(
        "href",
        `../public/img/SamplePhotos/${firstName}/${media.image}`
      );

      linkImg.appendChild(cardImg);
      card.appendChild(linkImg);
    } else if (media.video) {
      const cardVideo = document.createElement("video");
      cardVideo.className = "gallery__img";
      const videoSrc = document.createElement("source");
      videoSrc.setAttribute(
        "src",
        `../public/img/SamplePhotos/${firstName}/${media.video}`
      );
      cardVideo.setAttribute("alt", media.title);
      linkImg.setAttribute(
        "href",
        `../public/img/SamplePhotos/${firstName}/${media.video}`
      );
      videoSrc.setAttribute("type", "video/mp4");
      cardVideo.appendChild(videoSrc);
      linkImg.appendChild(cardVideo);
      card.appendChild(linkImg);
    }

    const cardInfo = document.createElement("div");
    cardInfo.className = "gallery__info";
    // cardInfo.id = media.id;

    const cardTitle = document.createElement("p");
    cardTitle.className = "gallery__title";
    cardTitle.innerText = `${media.title}`;

    cardInfo.appendChild(cardTitle);

    const cardLikes = document.createElement("p");
    cardLikes.className = "gallery__likes";
    cardLikes.insertAdjacentHTML(
      "beforeend",
      `<span class="likes__num">${media.likes}</span><button class="likes__btn"><span class="sr-only">likes</span><i class='fas fa-heart' aria-label="likes"></i></button>`
    );

    cardInfo.appendChild(cardLikes);

    card.appendChild(cardInfo);
    return card;
  }
}

export { Card };
