class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll(".gallery__link"));

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const images = links
          .filter((link) => !link.parentNode.classList.contains("isHidden"))
          .map((link) => link.getAttribute("href"));
        const titles = links
          .filter((link) => !link.parentNode.classList.contains("isHidden"))
          .map((link) => link.getAttribute("data-title"));
        e.preventDefault();
        /* parsing several argument to the constructor as it need the current image and the other, and only show the ones visible by the user */
        new Lightbox(
          e.currentTarget.getAttribute("href"),
          images,
          e.currentTarget.getAttribute("data-title"),
          titles
        );
      });
    });
  }
  constructor(url, images, title, titles) {
    this.element = this.buildDOM();
    this.images = images;
    this.titles = titles;
    this.loadMedia(url, title);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.querySelector("#content").setAttribute("aria-hidden", "true");
    document.querySelector(".lightbox__close").focus();
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadMedia(url, title) {
    this.url = null;
    const media = this.element.querySelector(".lightbox__media");
    const loader = document.createElement("div");
    loader.classList.add("lightbox__loader");
    const mediaTitle = document.createElement("h4");
    mediaTitle.classList.add("lightbox__title");
    mediaTitle.innerText = title;
    media.innerHTML = "";
    media.appendChild(loader);
    //by checking the end of the media name, I can create the correct html tag for the content
    if (url.includes(".jpg")) {
      const img = new Image();
      img.classList.add("lightbox__img");
      img.setAttribute("alt", title);
      img.onload = () => {
        media.removeChild(loader);
        media.appendChild(img);
        media.appendChild(mediaTitle);
      };
      img.src = url;
    } else {
      const video = document.createElement("video");
      video.classList.add("lightbox__video");
      video.setAttribute("controls", "");
      const source = document.createElement("source");
      source.setAttribute("src", url);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);
      media.removeChild(loader);
      media.appendChild(video);
      media.appendChild(mediaTitle);
    }
    this.url = url;
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.remove();
    }, 500);
    /* the keyslistener should be removed with the element in order to don't trigger them outside the lightbox  and create conflict with the new lightbox*/
    document.removeEventListener("keyup", this.onKeyUp);
    document.querySelector("#content").setAttribute("aria-hidden", "false");
  }

  next(e) {
    e.preventDefault();
    let position = this.images.indexOf(this.url);
    if (position === this.images.length - 1) {
      position = -1;
    }
    this.loadMedia(this.images[position + 1], this.titles[position + 1]);
  }

  prev(e) {
    e.preventDefault();
    let position = this.images.indexOf(this.url);
    if (position === 0) {
      position = this.images.length;
    }
    this.loadMedia(this.images[position - 1], this.titles[position - 1]);
  }

  buildDOM() {
    const dom = document.createElement("section");
    dom.classList.add("lightbox");
    dom.setAttribute("aria-label", "image closeup view");
    dom.setAttribute("aria-hidden", "false");
    dom.setAttribute("aria-describedby", "modalDesciption");
    dom.innerHTML = `<dialog class="lightbox__container" open aria-label="image closeup view">
        <button class="lightbox__close" aria-label="Close dialog">Fermer</button>
        <button class="lightbox__prev" aria-label="Previous image">Précedent</button>
        <div class="lightbox__media">
        </div>
        <button class="lightbox__next" aria-label="Next image">Suivant</button>
        <p class="sr-only" id="modalDescription">This is a modal window which overlay the main content of the page. You can control it with the left and right arrows or close it with the escape key.</p>
      </dialog>`;
    //bind this is used to select the lightbox as an attribute in the close method
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));

    return dom;
  }
}

export { Lightbox };
