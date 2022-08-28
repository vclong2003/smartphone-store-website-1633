import { auth } from "../firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { changeScreen } from "../navigator.js";
class User {
  $container;

  $userInfoContainer;
  $userEmail;
  emailValue;

  $userActionContainer;
  $changePwdButton;
  $logoutBtn;

  $ordersContainer;
  $ordersContainerTitle;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("userScreen_container");

    this.$userInfoContainer = document.createElement("div");
    this.$userInfoContainer.classList.add("userScreen_userInfoContainer");
    this.$userEmail = document.createElement("div");
    this.$userInfoContainer.appendChild(this.$userEmail);

    this.$userActionContainer = document.createElement("div");
    this.$userActionContainer.classList.add("userScreen_userActionContainer");
    this.$changePwdButton = document.createElement("button");
    this.$logoutBtn = document.createElement("button");
    this.$changePwdButton.innerHTML = "Change password";
    this.$logoutBtn.innerHTML = "Logout";
    this.$userActionContainer.appendChild(this.$changePwdButton);
    this.$userActionContainer.appendChild(this.$logoutBtn);

    this.$ordersContainer = document.createElement("div");
    this.$ordersContainer.classList.add("userScreen_ordersContainer");
    this.$ordersContainerTitle = document.createElement("div");
    this.$ordersContainerTitle.classList.add("userScreen_ordersContainerTitle");
    this.$ordersContainerTitle.innerHTML = "Orders";
    this.$ordersContainer.appendChild(this.$ordersContainerTitle);

    this.$changePwdButton.addEventListener("click", () => {
      alertify.prompt(
        "",
        "Enter current password",
        "",
        function (evt, value) {
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            value
          );
          reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
              // User re-authenticated.
              alertify.prompt(
                "",
                "Enter new password",
                "",
                function (evt, value) {
                  updatePassword(auth.currentUser, value)
                    .then(() => {
                      // Update successful.
                      alertify.success("Password updated successfully!", 3);
                    })
                    .catch((error) => {
                      // An error ocurred
                      console.log(error.code);
                    });
                },
                function () {
                  alertify.error("Cancelled!", 1);
                }
              );
            })
            .catch((error) => {
              // An error ocurred
              console.log(error.code);
            });
        },
        function () {
          alertify.error("Cancelled!", 1);
        }
      );
    });

    this.$logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          changeScreen("productDisplayScreen");
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  render() {
    const mockElement = document.createElement("div");
    mockElement.innerHTML = "You must login to view this page!";
    this.$container.innerHTML = "";

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.emailValue = user.email;
        this.$userEmail.innerHTML = this.emailValue;
        this.$container.appendChild(this.$userInfoContainer);
        this.$container.appendChild(this.$userActionContainer);
        this.$container.appendChild(this.$ordersContainer);
      } else {
        this.$container.appendChild(mockElement);
      }
    });
    return this.$container;
  }
}
export { User };
