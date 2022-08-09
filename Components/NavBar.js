import { navigate } from "../navigator.js";
import { toggleElement } from "./ToggleElement.js";
class NavBar {
  $container;

  $contactContainer;
  $leftContactItemsContainer;
  $rightContactItemsContainer;

  $phoneNumber;
  $email;

  $aboutUs;

  $componentContainer;
  $leftComponentContainer;
  $searchContainer;
  $rightComponentContainer;

  $searchBox;
  $searchInput;
  $searchIconImg;

  $logo;

  $profileIcon;
  $cartIcon;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("navBarContainer");

    this.$contactContainer = document.createElement("div");
    this.$leftContactItemsContainer = document.createElement("div");
    this.$rightContactItemsContainer = document.createElement("div");
    this.$contactContainer.appendChild(this.$leftContactItemsContainer);
    this.$contactContainer.appendChild(this.$rightContactItemsContainer);
    this.$contactContainer.classList.add("contactContainer");
    this.$leftContactItemsContainer.classList.add("leftContactItemsContainer");
    this.$rightContactItemsContainer.classList.add(
      "rightContactItemsContainer"
    );

    this.$phoneNumber = document.createElement("p");
    this.$email = document.createElement("p");
    this.$leftContactItemsContainer.appendChild(this.$phoneNumber);
    this.$leftContactItemsContainer.appendChild(this.$email);
    this.$phoneNumber.classList.add("phoneNumber");
    this.$email.classList.add("email");

    this.$aboutUs = document.createElement("a");
    this.$aboutUs.innerHTML = "About us";
    this.$rightContactItemsContainer.appendChild(this.$aboutUs);
    this.$aboutUs.classList.add("aboutUs");

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
    this.$searchInput.addEventListener("input", () => {
      console.log(this.$searchInput.value);
    });
    this.$searchBox.appendChild(this.$searchInput);
    this.$searchInput.type = "text";
    this.$searchInput.placeholder = "Search Products...";
    this.$searchContainer.appendChild(this.$searchBox);
    this.$searchBox.classList.add("searchBox");
    this.$searchInput.classList.add("searchInput");

    this.$searchIconImg = document.createElement("img");
    this.$searchIconImg.style = "cursor: pointer;";
    this.$searchBox.appendChild(this.$searchIconImg);
    this.$searchIconImg.addEventListener("click", () => {
      alert(`You typed "${this.$searchInput.value}"`);
    });

    this.$logo = document.createElement("img");
    this.$leftComponentContainer.appendChild(this.$logo);

    this.$profileIcon = document.createElement("img");
    this.$profileIcon.title = "Profile";
    this.$profileIcon.addEventListener("click", () => {
      navigate("loginScreen");
    });
    this.$cartIcon = document.createElement("img");
    this.$rightComponentContainer.appendChild(this.$profileIcon);
    this.$rightComponentContainer.appendChild(this.$cartIcon);
  }
  render() {
    this.$phoneNumber.innerHTML = "0888827768";
    this.$email.innerHTML = "longvcgch210092@fpt.edu.vn";
    this.$aboutUs.href = "#";

    this.$logo.src = "././Assets/Img/verizon_logo.png";
    this.$profileIcon.src = "././Assets/Icons/ic-actions-user.png";
    this.$cartIcon.src = "././Assets/Icons/ic-ecommerce-basket.png";
    this.$searchIconImg.src = "././Assets/Icons/search_icon.png";

    this.$container.appendChild(this.$contactContainer);
    this.$container.appendChild(this.$componentContainer);

    return this.$container;
  }
}

export { NavBar };
