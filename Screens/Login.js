import { Input } from "../Components/Input.js";
import { auth } from "../firebaseConfig.js";
import { changeScreen } from "../navigator.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { LoadingLayer } from "../Components/LoadingLayer.js";
import { toggleElement } from "../Components/ToggleElement.js";
class Login {
  $container;
  $loadingLayer;

  $imgContainer;
  $img;

  $inputAreaContainer;

  $title;

  $emailInput;
  $passwordInput;

  $loginBtn;
  $forgotPwd;
  $createNewAccount;
  $cancel;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("authContainer");

    this.$loadingLayer = new LoadingLayer();
    this.$container.appendChild(this.$loadingLayer.render());

    this.$imgContainer = document.createElement("div");
    this.$img = document.createElement("img");
    this.$imgContainer.classList.add("authImgContainer");

    this.$inputAreaContainer = document.createElement("div");
    this.$inputAreaContainer.classList.add("authInputAreaContainer");

    this.$title = document.createElement("div");
    this.$title.innerHTML = "Login";
    this.$title.classList.add("authTitle");

    this.$emailInput = new Input("Email");
    this.$passwordInput = new Input("Password", "password");

    this.$loginBtn = document.createElement("button");
    this.$loginBtn.innerHTML = "Login";
    this.$loginBtn.classList.add("authBtn");
    this.$loginBtn.addEventListener("click", () => {
      const email = this.$emailInput.getValue();
      const password = this.$passwordInput.getValue();
      if (email == "" || password == "") {
        alert("Please enter email and password!");
      } else {
        toggleElement(this.$loadingLayer.render());
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toggleElement(this.$loadingLayer.render());
            changeScreen("productDisplayScreen");
          })
          .catch((error) => {
            toggleElement(this.$loadingLayer.render());
            const errorCode = error.code;
            console.log(errorCode);
          });
      }
    });

    this.$forgotPwd = document.createElement("div");
    this.$forgotPwd.innerHTML = "Forgot password?";
    this.$forgotPwd.classList.add("authMoreActionText");
    this.$createNewAccount = document.createElement("div");
    this.$createNewAccount.innerHTML = "Create new account";
    this.$createNewAccount.classList.add("authMoreActionText");
    this.$cancel = document.createElement("div");
    this.$cancel.innerHTML = "Cancel";
    this.$cancel.title = "Cancel";
    this.$cancel.classList.add("authMoreActionText", "authCancelBtn");
    this.$cancel.addEventListener("click", () => {
      changeScreen("productDisplayScreen");
    });

    this.$createNewAccount.addEventListener("click", () => {
      changeScreen("registerScreen");
    });
    this.$forgotPwd.addEventListener("click", () => {
      alertify.prompt(
        "",
        "Enter your email",
        "",
        function (evt, value) {
          alertify.alert(
            "",
            "An email has been sent to your account, please folow the instruction to reser your password!    *remember to check your spam folder"
          );
          sendPasswordResetEmail(auth, value)
            .then(() => {
              // Password reset email sent!
              // ..
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        },
        function () {
          alertify.error("Cancelled!", 1);
        }
      );
    });
  }
  render() {
    document.title = "Login";
    this.$img.src = "./Assets/Img/auth_background_resized.png";
    this.$imgContainer.appendChild(this.$img);

    this.$emailInput.clearValue();
    this.$passwordInput.clearValue();

    this.$inputAreaContainer.appendChild(this.$title);
    this.$inputAreaContainer.appendChild(this.$emailInput.render());
    this.$inputAreaContainer.appendChild(this.$passwordInput.render());
    this.$inputAreaContainer.appendChild(this.$loginBtn);
    this.$inputAreaContainer.appendChild(this.$forgotPwd);
    this.$inputAreaContainer.appendChild(this.$createNewAccount);
    this.$inputAreaContainer.appendChild(this.$cancel);

    this.$container.appendChild(this.$imgContainer);
    this.$container.appendChild(this.$inputAreaContainer);

    return this.$container;
  }
}
export { Login };
