import { AuthInput } from "../Components/AuthInput.js";
import { navigate } from "../navigator.js";
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
    this.$container.classList.add("loginConatiner");

    this.$imgContainer = document.createElement("div");
    this.$img = document.createElement("img");
    this.$imgContainer.classList.add("loginImgConatiner");

    this.$inputAreaContainer = document.createElement("div");
    this.$inputAreaContainer.classList.add("loginInputAreaContainer");

    this.$title = document.createElement("div");
    this.$title.innerHTML = "Login";
    this.$title.classList.add("loginTitle");

    this.$emailInput = new AuthInput("Email");
    this.$passwordInput = new AuthInput("Password", "password");

    this.$loginBtn = document.createElement("button");
    this.$loginBtn.innerHTML = "Login";
    this.$loginBtn.classList.add("loginBtn");

    this.$forgotPwd = document.createElement("div");
    this.$forgotPwd.innerHTML = "Forgot password?";
    this.$forgotPwd.classList.add("loginMoreActionText");
    this.$createNewAccount = document.createElement("div");
    this.$createNewAccount.innerHTML = "Create new account";
    this.$createNewAccount.classList.add("loginMoreActionText");
    this.$cancel = document.createElement("div");
    this.$cancel.innerHTML = "Cancel";
    this.$cancel.title = "Cancel";
    this.$cancel.classList.add("loginMoreActionText");
    this.$cancel.classList.add("loginCancelBtn");
    this.$cancel.addEventListener("click", () => {
      navigate("productDisplayScreen");
    });

    this.$createNewAccount.addEventListener("click", () => {
      navigate("registerScreen");
    });
    this.$loginBtn.addEventListener("click", () => {
      console.log("clicked");
    });
  }
  render() {
    this.$img.src = "./Assets/Img/auth_background.png";
    this.$imgContainer.appendChild(this.$img);

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
