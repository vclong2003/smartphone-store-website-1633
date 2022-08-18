import { fetchProductInfo } from "../Components/fetchProductInfo.js";
import { navigate } from "../navigator.js";
class ProductDetail {
  $container;

  $topBar;
  $backBtn;

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

  constructor(id = "") {
    this.$container = document.createElement("div");
    this.$topBar = document.createElement("div");
    this.$backBtn = document.createElement("img");
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
    this.$topBar.classList.add("productDetailTopBar");
    this.$backBtn.classList.add("productDetailBackBtn");
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
    this.$backBtn.src = "././Assets/Icons/back_icon.png";
    this.$backBtn.addEventListener("click", () => {
      navigate("productDisplayScreen");
      this.$header.innerHTML = "";
      this.$thumbnailImg.src = "";
      this.$nameContainer.innerHTML = "";
      this.$smallDesContainer.innerHTML = "";
      this.$price.innerHTML = "";
      this.$img.src = "";
      this.$text.innerHTML = "";
    });
  }
  render(id = null) {
    window.scrollTo(0, 0);
    this.$topBar.appendChild(this.$backBtn);

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

    this.$container.appendChild(this.$topBar);
    this.$container.appendChild(this.$productDetailContainer);

    if (id) {
      fetchProductInfo(id, (data) => {
        this.$header.innerHTML =
          "Category: " + data.categoryName + " > Brand: " + data.brandName;
        this.$thumbnailImg.src = data.thumbnailUrl;
        this.$nameContainer.innerHTML = data.brandName + " " + data.Name;
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
