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
  getData(query = "", _function) {
    jQuery.ajax({
      type: "POST",
      url: "action.php",
      dataType: "json",
      data: { functionname: "getData", query: query },
      success: function (data) {
        _function(data);
      },
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
      this.getData(
        "SELECT `product`.*, `brand`.`brandName`, `category`.`categoryName` FROM `product` INNER JOIN `brand` ON `product`.`brandID` = `brand`.`brandID` INNER JOIN `category` ON `product`.`catID` = `category`.`catID` WHERE `product`.`productID` = " +
          id,
        (data) => {
          if (data[0] != undefined) {
            this.$header.innerHTML =
              "Category: " +
              data[0].categoryName +
              " > Brand: " +
              data[0].brandName;
            this.$thumbnailImg.src = data[0].thumbnailUrl;
            this.$nameContainer.innerHTML =
              data[0].brandName + " " + data[0].Name;
            this.$smallDesContainer.innerHTML = data[0].smallDescription;
            this.$price.innerHTML = data[0].Price + "$";
            this.$img.src = data[0].imageUrl;
            this.$text.innerHTML = data[0].Description;
          }
        }
      );
    }
    return this.$container;
  }
}

export { ProductDetail };
