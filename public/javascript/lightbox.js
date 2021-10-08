class Lightbox {
  static init() {
    const links = document.querySelectorAll(".gallery__link").forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("href"));
      })
    );
  }
  constructor(url) {
    this.element = this.buildDOM(url);
    this.loadMedia(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadMedia(url) {
    const media = this.element.querySelector(".lightbox__media");
    console.log(media);
    if (url.indexOf(".jpg") > -1) {
      const img = new Image();
      img.classList.add("lightbox__img");
      img.src = url;
      media.appendChild(img);
    } else {
      const video = document.createElement("video");
      video.classList.add("lightbox__video");
      const source = document.createElement("source");
      source.setAttribute("src", url);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);
      media.appendChild(video);
    }
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
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

  buildDOM(url) {
    const dom = document.createElement("section");
    dom.classList.add("lightbox");
    dom.innerHTML = `      <article class="lightbox__container">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__prev">Précedent</button>
        <button class="lightbox__next">Suivant</button>
        <div class="lightbox__media"></div>
      </article>`;
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));

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
