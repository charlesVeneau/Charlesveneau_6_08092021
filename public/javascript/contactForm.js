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
    document.querySelector(".form__close").focus();
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
    e.preventDefault();
    const inputs = this.element.querySelectorAll(".form__input");
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let success = 0;
    inputs.forEach((input) => {
      if (
        (input.id === "firstname" || input.id === "lastname") &&
        input.value.trim().length < 2
      ) {
        input.classList.add("error");
        input.nextElementSibling.classList.remove("isHidden");
      } else if (input.id === "email" && !emailRegex.test(input.value.trim())) {
        input.classList.add("error");
        input.nextElementSibling.classList.remove("isHidden");
      } else if (input.id === "message" && input.value.trim().length < 10) {
        input.classList.add("error");
        input.nextElementSibling.classList.remove("isHidden");
      } else {
        ++success;
        input.classList.remove("error");
        input.nextElementSibling.classList.add("isHidden");
      }
    });
    if (success >= 4) {
      inputs.forEach((input) => {
        console.log(`${input.id} : ${input.value}`);
      });
      this.close(e);
    }
  }

  buildForm(name) {
    const form = document.createElement("section");
    form.classList.add("form");
    form.setAttribute("aria-hidden", "false");
    form.setAttribute("aria-describedby", "modalDesciption");
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
      <small class="form__small isHidden">Veuillez entrer au moins 2 lettres</small>
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
      <small class="form__small isHidden">Veuillez entrer au moins 2 lettres</small>
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
      <small class="form__small isHidden">Veuillez entrer une adresse email valide</small>
      <label for="message" class="form__label">
        Votre message
      </label>
      <textarea required class="form__input" id="message" rows="4"></textarea>
      <small class="form__small isHidden">Vous ne pouvez pas envoyer de message vide</small>
      <button type="submit" class="form__btn">
        Envoyer
      </button>
    </form>
    <p class="sr-only" id="modalDescription">This is a contact form which overlay the main content of the page. You can close it with the escape key.</p>
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
