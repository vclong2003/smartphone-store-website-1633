import { Input } from "../Components/Input.js";

class User {
  $container;

  $topbar;
  $backBtn;

  $changePwdLayer;
  $changePwdPopUp;
  $pwdInput;
  $repeatPwdInput;
  $changeBtn;
  $cancelBtn;

  $userInfoContainer;
  $userEmail;

  $userActionContainer;
  $changePwdButton;
  $logoutBtn;

  $ordersContainer;
  $ordersContainerTitle;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("userScreen_container");

    this.$topbar = document.createElement("div");
    this.$topbar.classList.add("userScreen_topbar");
    this.$backBtn = document.createElement("img");
    this.$backBtn.src = "././Assets/Icons/back_icon.png";
    this.$topbar.appendChild(this.$backBtn);
    this.$container.appendChild(this.$topbar);

    this.$changePwdLayer = document.createElement("div");
    this.$changePwdLayer.classList.add("userScreen_changePwdLayer");
    this.$changePwdPopUp = document.createElement("div");
    this.$changePwdPopUp.classList.add("userScreen_changePwdPopup");
    this.$pwdInput = new Input("Password", "password");
    this.$repeatPwdInput = new Input("Reapeat password", "password");
    this.$changeBtn = document.createElement("button");
    this.$changeBtn.classList.add("userScreen_changeBtn");
    this.$changeBtn.innerHTML = "Change";
    this.$cancelBtn = document.createElement("button");
    this.$cancelBtn.classList.add("userScreen_cancelBtn");
    this.$cancelBtn.innerHTML = "Cancel";
    this.$changePwdPopUp.appendChild(this.$pwdInput.render());
    this.$changePwdPopUp.appendChild(this.$repeatPwdInput.render());
    this.$changePwdPopUp.appendChild(this.$changeBtn);
    this.$changePwdPopUp.appendChild(this.$cancelBtn);
    this.$changePwdLayer.appendChild(this.$changePwdPopUp);
    this.$container.appendChild(this.$changePwdLayer);

    this.$userInfoContainer = document.createElement("div");
    this.$userInfoContainer.classList.add("userScreen_userInfoContainer");
    this.$userEmail = document.createElement("div");
    this.$userInfoContainer.appendChild(this.$userEmail);
    this.$container.appendChild(this.$userInfoContainer);

    this.$userActionContainer = document.createElement("div");
    this.$userActionContainer.classList.add("userScreen_userActionContainer");
    this.$changePwdButton = document.createElement("button");
    this.$logoutBtn = document.createElement("button");
    this.$changePwdButton.innerHTML = "Change password";
    this.$logoutBtn.innerHTML = "Logout";
    this.$userActionContainer.appendChild(this.$changePwdButton);
    this.$userActionContainer.appendChild(this.$logoutBtn);
    this.$container.appendChild(this.$userActionContainer);

    this.$ordersContainer = document.createElement("div");
    this.$ordersContainer.classList.add("userScreen_ordersContainer");
    this.$ordersContainerTitle = document.createElement("div");
    this.$ordersContainerTitle.classList.add("userScreen_ordersContainerTitle");
    this.$ordersContainerTitle.innerHTML = "Orders";
    this.$ordersContainer.appendChild(this.$ordersContainerTitle);
    this.$container.appendChild(this.$ordersContainer);
  }
  render() {
    this.$userEmail.innerHTML = "hasgdh@gmajk.con";
    return this.$container;
  }
}
export { User };
