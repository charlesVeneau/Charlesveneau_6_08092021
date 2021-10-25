class ContactForm {
  static init() {
    const name = document.querySelector(".banner__title").innerText;
    const formOpenBtn = document.querySelector(".banner__btn");
    formOpenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      new ContactForm(name);
    });
  }

  constructor(name) {
    this.element = this.buildForm(name);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  onKeyUp(e) {
    if (e.key === "Escape") this.close(e);
  }

  close(e) {
    e.preventDefault();
    this.element.remove();
    document.removeEventListener("keyup", this.onKeyUp);
  }

  submit(e) {
    // e.preventDefault();
    const inputs = this.element.querySelectorAll(".form__input");
    inputs.forEach((input) => {
      console.log(`${input.id} : ${input.value}`);
    });
    const message = this.element.querySelector(".form__textarea");
    console.log(`message: ${message.value}`);
    // this.close(e);
  }

  buildForm(name) {
    const form = document.createElement("section");
    form.classList.add("form");
    form.innerHTML = `<dialog class="form__container" open>
    <button class="form__close">
      <span class="sr-only">fermer</span>
    </button>
    <h1 class="form__title">Contactez-moi<br>${name}</h1>
    <form action="profil.html" class="form__elt">
      <label for="firstname" class="form__label">
        Prénom
      </label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        class="form__input"
        required
      />
      <label for="lastname" class="form__label">
        Nom
      </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        class="form__input"
        required
      />
      <label for="email" class="form__label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="form__input"
        required
      />
      <label for="message" class="form__label">
        Votre message
      </label>
      <textarea required class="form__textarea" rows="4"></textarea>
      <button type="submit" class="form__btn">
        Envoyer
      </button>
    </form>
  </dialog>`;
    form
      .querySelector(".form__close")
      .addEventListener("click", this.close.bind(this));
    form
      .querySelector(".form__btn")
      .addEventListener("click", this.submit.bind(this));
    return form;
  }
}

export { ContactForm };
