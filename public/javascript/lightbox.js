class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll(".gallery__link"));
    const images = links.map((link) => link.getAttribute("href"));
    const titles = links.map((link) => link.getAttribute("data-title"));
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(
          e.currentTarget.getAttribute("href"),
          images,
          e.currentTarget.getAttribute("data-title"),
          titles
        );
      })
    );
  }
  constructor(url, images, title, titles) {
    this.element = this.buildDOM();
    this.images = images;
    this.titles = titles;
    this.loadMedia(url, title);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
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
    if (url.indexOf(".jpg") > -1) {
      const img = new Image();
      img.classList.add("lightbox__img");
      img.onload = function () {
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
    document.removeEventListener("keyup", this.onKeyUp);
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
    dom.innerHTML = `      <article class="lightbox__container">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__prev">Précedent</button>
        <div class="lightbox__media">
        </div>
        <button class="lightbox__next">Suivant</button>
      </article>`;
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

/*
    <section class="lightbox">
      <article class="lightbox__container">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__prev">Précedent</button>
        <button class="lightbox__next">Suivant</button>
        <div class="lightbox__img">
          <img src="/public/img/SamplePhotos/Mimi/Animals_Rainbow.jpg" alt="" />
        </div>
      </article>
    </section>
*/
