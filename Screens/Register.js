import { navigate } from "../navigator.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { auth } from "../firebaseConfig.js";
import { Input } from "../Components/Input.js";
import { LoadingLayer } from "../Components/LoadingLayer.js";
import { toggleElement } from "../Components/ToggleElement.js";
class Register {
  $container;
  $loadingLayer;

  $imgContainer;
  $img;

  $inputAreaContainer;

  $title;

  $nameInput;
  $emailInput;
  $passwordInput;
  $repeatPasswordInput;

  $registerBtn;
  $backToLogin;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("authContainer");

    this.$loadingLayer = new LoadingLayer();

    this.$imgContainer = document.createElement("div");
    this.$img = document.createElement("img");
    this.$imgContainer.classList.add("authImgContainer");

    this.$inputAreaContainer = document.createElement("div");
    this.$inputAreaContainer.classList.add("authInputAreaContainer");

    this.$title = document.createElement("div");
    this.$title.innerHTML = "Register";
    this.$title.classList.add("authTitle");

    this.$nameInput = new Input("Name");
    this.$emailInput = new Input("Email");
    this.$passwordInput = new Input("Password", "password");
    this.$repeatPasswordInput = new Input("Repeat password", "password");

    this.$registerBtn = document.createElement("button");
    this.$registerBtn.innerHTML = "Register";
    this.$registerBtn.classList.add("authBtn");
    this.$backToLogin = document.createElement("div");
    this.$backToLogin.innerHTML = "Back to login";
    this.$backToLogin.classList.add("authMoreActionText");

    this.$backToLogin.addEventListener("click", () => {
      navigate("loginScreen");
    });

    this.$registerBtn.addEventListener("click", () => {
      toggleElement(this.$loadingLayer.render());
      createUserWithEmailAndPassword(
        auth,
        this.$emailInput.getValue(),
        this.$passwordInput.getValue()
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toggleElement(this.$loadingLayer.render());
          navigate("introScreen");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          toggleElement(this.$loadingLayer.render());
          // ..
        });
    });
  }

  render() {
    this.$img.src = "./Assets/Img/auth_background.png";
    this.$imgContainer.appendChild(this.$img);

    this.$inputAreaContainer.appendChild(this.$title);
    this.$inputAreaContainer.appendChild(this.$nameInput.render());
    this.$inputAreaContainer.appendChild(this.$emailInput.render());
    this.$inputAreaContainer.appendChild(this.$passwordInput.render());
    this.$inputAreaContainer.appendChild(this.$repeatPasswordInput.render());
    this.$inputAreaContainer.appendChild(this.$registerBtn);
    this.$inputAreaContainer.appendChild(this.$backToLogin);

    this.$container.appendChild(this.$loadingLayer.render());
    this.$container.appendChild(this.$imgContainer);
    this.$container.appendChild(this.$inputAreaContainer);

    return this.$container;
  }
}

export { Register };
