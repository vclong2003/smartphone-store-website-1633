import { fetchProductInfo } from "../Components/handleProduct.js";
import { getUrlParam } from "../navigator.js";
import { auth } from "../firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import {
  addItemToCart,
  checkCartItemExistance,
} from "../Components/handleOrders.js";
class ProductDetail {
  currentID = null;
  $container;

  $productDetailContainer;

  $header;

  $briefContainer;
  $leftContainer;
  $rightContainer;

  $thumbnailImg;
  $nameContainer;
  $smallDesContainer;

  $priceAndBtnContainer;
  $price;
  $addTocardBtn;

  $descriptionContainer;
  $img;
  $text;

  constructor() {
    this.$container = document.createElement("div");
    this.$productDetailContainer = document.createElement("div");
    this.$header = document.createElement("div");
    this.$briefContainer = document.createElement("div");
    this.$leftContainer = document.createElement("div");
    this.$rightContainer = document.createElement("div");
    this.$thumbnailImg = document.createElement("img");
    this.$nameContainer = document.createElement("div");
    this.$smallDesContainer = document.createElement("div");
    this.$priceAndBtnContainer = document.createElement("div");
    this.$price = document.createElement("div");
    this.$addTocardBtn = document.createElement("button");
    this.$descriptionContainer = document.createElement("div");
    this.$img = document.createElement("img");
    this.$text = document.createElement("div");

    this.$container.classList.add("productDetailScreen");
    this.$productDetailContainer.classList.add("productDetailContainer");
    this.$header.classList.add("productDetailContainer_header");
    this.$briefContainer.classList.add("productDetail_briefContainer");
    this.$leftContainer.classList.add("productDetail_leftContainer");
    this.$rightContainer.classList.add("productDetail_righContainer");
    this.$nameContainer.classList.add("productDetail_nameContainer");
    this.$smallDesContainer.classList.add("productDetail_smallDesContainer");
    this.$priceAndBtnContainer.classList.add(
      "productDetail_priceAndBtnContainer"
    );
    this.$price.classList.add("productDetail_price");
    this.$addTocardBtn.classList.add("productDetail_addTocardBtn");
    this.$descriptionContainer.classList.add(
      "productDetail_descriptionContainer"
    );
    this.$text.classList.add("productDetail_text");

    this.$addTocardBtn.innerHTML = "Add to card";
    this.$addTocardBtn.addEventListener("click", () => {
      if (this.currentID) {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            checkCartItemExistance(user.email, this.currentID, (data) => {
              if (data.count == 0) {
                addItemToCart(user.email, this.currentID, () => {
                  alertify.notify("Item added to cart!", "success", 2);
                });
              } else {
                alertify.notify("Item existed in your cart", "error", 2);
              }
            });
          } else {
            alertify.notify("You must login to use this function!", "error", 2);
          }
        });
      }
    });
  }
  render() {
    document.title = "Product detail";
    this.$container.innerHTML = "";
    this.$thumbnailImg.src = "././Assets/Img/IconPlaceHolder.jpg";
    this.$img.src = "././Assets/Img/placeholder_product_img.png";

    const id = getUrlParam("productID");
    window.scrollTo(0, 0);

    this.$priceAndBtnContainer.appendChild(this.$price);
    this.$priceAndBtnContainer.appendChild(this.$addTocardBtn);

    this.$leftContainer.appendChild(this.$thumbnailImg);
    this.$rightContainer.appendChild(this.$nameContainer);
    this.$rightContainer.appendChild(this.$smallDesContainer);
    this.$rightContainer.appendChild(this.$priceAndBtnContainer);

    this.$briefContainer.appendChild(this.$header);
    this.$briefContainer.appendChild(this.$leftContainer);
    this.$briefContainer.appendChild(this.$rightContainer);

    this.$descriptionContainer.appendChild(this.$img);
    this.$descriptionContainer.appendChild(this.$text);

    this.$productDetailContainer.appendChild(this.$briefContainer);
    this.$productDetailContainer.appendChild(this.$descriptionContainer);

    this.$container.appendChild(this.$productDetailContainer);

    if (id) {
      fetchProductInfo(id, (data) => {
        this.currentID = id;
        this.$header.innerHTML =
          "Category: " + data.categoryName + " > Brand: " + data.brandName;
        this.$thumbnailImg.src = data.thumbnailUrl;
        this.$nameContainer.innerHTML = data.brandName + " " + data.Name;
        document.title = data.Name;
        this.$smallDesContainer.innerHTML = data.smallDescription;
        this.$price.innerHTML = data.Price + "$";
        this.$img.src = data.imageUrl;
        this.$text.innerHTML = data.Description;
      });
    }

    return this.$container;
  }
}

export { ProductDetail };
