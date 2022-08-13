import { navigate } from "../navigator.js";
import { toggleElement } from "./ToggleElement.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { auth } from "../firebaseConfig.js";
class NavBar {
  $container;

  $contactContainer;

  $authStateText;
  authState = false;

  $componentContainer;
  $leftComponentContainer;
  $searchContainer;
  $rightComponentContainer;

  $searchBox;
  $searchInput;
  $searchIconImg;

  $logo;

  $consoleScreenIcon;
  $cartIcon;

  constructor(_searchFunction) {
    let searching = false;
    this.$container = document.createElement("div");
    this.$container.classList.add("navBarContainer");

    this.$contactContainer = document.createElement("div");
    this.$contactContainer.classList.add("contactContainer");

    this.$componentContainer = document.createElement("div");
    this.$leftComponentContainer = document.createElement("div");
    this.$searchContainer = document.createElement("div");
    this.$rightComponentContainer = document.createElement("div");
    this.$componentContainer.appendChild(this.$leftComponentContainer);
    this.$componentContainer.appendChild(this.$searchContainer);
    this.$componentContainer.appendChild(this.$rightComponentContainer);
    this.$componentContainer.classList.add("componentContainer");
    this.$leftComponentContainer.classList.add("leftComponentContainer");
    this.$searchContainer.classList.add("searchContainer");
    this.$rightComponentContainer.classList.add("rightComponentContainer");

    this.$searchBox = document.createElement("div");
    this.$searchInput = document.createElement("input");
    this.$searchInput.addEventListener("focusin", () => {
      this.$searchBox.classList.add("searchBoxInFocus");
    });
    this.$searchInput.addEventListener("focusout", () => {
      this.$searchBox.classList.remove("searchBoxInFocus");
    });
    this.$searchBox.appendChild(this.$searchInput);
    this.$searchInput.type = "text";
    this.$searchInput.placeholder = "Search Products...";
    this.$searchContainer.appendChild(this.$searchBox);
    this.$searchBox.classList.add("searchBox");
    this.$searchInput.classList.add("searchInput");

    this.$searchIconImg = document.createElement("img");
    this.$searchIconImg.style = "cursor: pointer;";
    this.$searchIconImg.src = "././Assets/Icons/search_icon.png";
    this.$searchBox.appendChild(this.$searchIconImg);
    this.$searchIconImg.addEventListener("click", () => {
      if (!searching) {
        searching = true;
        this.$searchIconImg.src = "././Assets/Icons/cancel_icon.png";
        _searchFunction(this.$searchInput.value);
      } else {
        searching = false;
        this.$searchIconImg.src = "././Assets/Icons/search_icon.png";
        this.$searchInput.value = "";
        _searchFunction("");
      }
    });

    this.$logo = document.createElement("img");
    this.$leftComponentContainer.appendChild(this.$logo);

    this.$authStateText = document.createElement("div");
    this.$authStateText.classList.add("navBarAuthStateText");
    this.$contactContainer.appendChild(this.$authStateText);
    this.$authStateText.addEventListener("click", () => {
      if (this.authState) {
        signOut(auth);
      } else {
        navigate("loginScreen");
      }
    });

    this.$consoleScreenIcon = document.createElement("img");
    this.$consoleScreenIcon.src = "././Assets/Icons/editor_icon.png";
    this.$consoleScreenIcon.addEventListener("click", () => {
      navigate("consoleScreen");
    });
    this.$cartIcon = document.createElement("img");
    this.$cartIcon.src = "././Assets/Icons/ic-ecommerce-basket.png";
    this.$rightComponentContainer.appendChild(this.$cartIcon);
  }
  render() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.$authStateText.innerHTML = user.email;
        this.$authStateText.classList.add("navBarAuthStateTextLoggedIn");
        this.authState = true;

        this.$rightComponentContainer.appendChild(this.$consoleScreenIcon);
      } else {
        // User is signed out
        // ...
        this.$authStateText.classList.remove("navBarAuthStateTextLoggedIn");
        this.$authStateText.innerHTML = "Login";
        this.authState = false;

        this.$rightComponentContainer.removeChild(this.$consoleScreenIcon);
      }
    });

    this.$logo.src = "././Assets/Img/VCL-logos_black.png";

    this.$container.appendChild(this.$contactContainer);
    this.$container.appendChild(this.$componentContainer);

    return this.$container;
  }
}

export { NavBar };
