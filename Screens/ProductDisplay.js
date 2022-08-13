import { NavBar } from "../Components/NavBar.js";
import { ratingStar } from "../Components/RatingStart.js";
class ProductDisplay {
  $viewArea;
  $container;

  $leftPanel;
  $rightPanel;

  $categoryFilterContainer;
  $categoryFilterLabel;

  $brandFilterContainer;
  $brandFilterLabel;

  $ratingFilterContainer;
  $ratingFilterLabel;

  $priceFilterContainer;
  $priceFilterLabel;
  $priceInputContainer;
  $minPriceInput;
  $priceInputSplitter;
  $maxPriceInput;

  $filterBtnContainer;
  $applyFilterBtn;
  $resetFilterBtn;

  constructor() {
    const testData = [
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Samsung S22 Ultra",
        smallDes: "sj333 sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/s22uThumb.webp",
        price: "2000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Samsung S22 Ultra",
        smallDes: "sj333 sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/s22uThumb.webp",
        price: "2000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Samsung S22 Ultra",
        smallDes: "sj333 sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/s22uThumb.webp",
        price: "2000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Samsung S22 Ultra",
        smallDes: "sj333 sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/s22uThumb.webp",
        price: "2000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Samsung S22 Ultra",
        smallDes: "sj333 sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/s22uThumb.webp",
        price: "2000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Samsung S22 Ultra",
        smallDes: "sj333 sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/s22uThumb.webp",
        price: "2000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
      {
        name: "Google Pixel 6",
        smallDes: "sjdjkds sjdjdf jdsfhjdsjk djsfhj sfdj",
        thumbNailUrl: "./Assets/testImg/pixel6Thumb.webp",
        price: "1000",
      },
    ];

    this.$viewArea = document.createElement("div");
    this.$container = document.createElement("div");
    this.$container.classList.add("productDisplayContainer");

    this.$leftPanel = document.createElement("div");
    this.$rightPanel = document.createElement("div");
    this.$leftPanel.classList.add("productDisplayLeftPanel");
    this.$rightPanel.classList.add("productDisplayRightPanel");

    this.$categoryFilterContainer = document.createElement("div");
    this.$categoryFilterContainer.classList.add(
      "productDisplayFilterContainer"
    );
    this.$categoryFilterLabel = document.createElement("p");
    this.$categoryFilterLabel.innerHTML = "Categories";
    this.$categoryFilterContainer.appendChild(this.$categoryFilterLabel);

    this.getData("SELECT * FROM `category`", (data) => {
      data.map((item) => {
        const $itemContainer = document.createElement("div");
        $itemContainer.classList.add("categoryFilterItem");
        const $categoryName = document.createElement("div");
        $categoryName.innerHTML = item.categoryName;
        const $quantity = document.createElement("div");
        $quantity.classList.add("categoryFilterItemQuantity");
        $quantity.innerHTML = item.quantity;
        $itemContainer.appendChild($categoryName);
        $itemContainer.appendChild($quantity);
        this.$categoryFilterContainer.appendChild($itemContainer);
      });
    });

    this.$brandFilterContainer = document.createElement("div");
    this.$brandFilterContainer.classList.add("productDisplayFilterContainer");
    this.$brandFilterLabel = document.createElement("p");
    this.$brandFilterLabel.innerHTML = "Brands";
    this.$brandFilterContainer.appendChild(this.$brandFilterLabel);
    this.getData("SELECT * FROM `brand`", (data) => {
      data.map((item) => {
        const $itemContainer = document.createElement("div");
        $itemContainer.classList.add("brandFilterItemContainer");
        const $checkBox = document.createElement("input");
        $checkBox.type = "checkbox";
        $checkBox.value = item.brandID;
        const $brandName = document.createElement("div");
        $brandName.classList.add("brandFilterItemName");
        $brandName.innerHTML = item.brandName;

        $checkBox.addEventListener("change", () => {
          if ($checkBox.checked) {
            console.log(`${$checkBox.value}, ${$brandName.innerText} checked`);
          } else {
            console.log(
              `${$checkBox.value}, ${$brandName.innerText} unchecked`
            );
          }
        });

        $itemContainer.appendChild($checkBox);
        $itemContainer.appendChild($brandName);
        this.$brandFilterContainer.appendChild($itemContainer);
      });
    });

    this.$ratingFilterContainer = document.createElement("div");
    this.$ratingFilterContainer.classList.add("productDisplayFilterContainer");
    this.$ratingFilterLabel = document.createElement("p");
    this.$ratingFilterLabel.innerHTML = "Rating";
    this.$ratingFilterContainer.appendChild(this.$ratingFilterLabel);
    for (let i = 1; i <= 5; i++) {
      const $itemContainer = document.createElement("div");
      $itemContainer.classList.add("ratingFilterItemContainer");
      const $checkBox = document.createElement("input");
      $checkBox.classList.add("ratingFilterItemCheckbox");
      $checkBox.type = "checkbox";
      $itemContainer.appendChild($checkBox);
      $itemContainer.appendChild(ratingStar(i));

      this.$ratingFilterContainer.appendChild($itemContainer);
    }

    this.$priceFilterContainer = document.createElement("div");
    this.$priceFilterContainer.classList.add("productDisplayFilterContainer");
    this.$priceFilterLabel = document.createElement("p");
    this.$priceFilterLabel.innerHTML = "Price";
    this.$priceInputContainer = document.createElement("div");
    this.$priceInputContainer.classList.add("priceFilterInputContainer");
    this.$minPriceInput = document.createElement("input");
    this.$minPriceInput.type = "text";
    this.$minPriceInput.placeholder = "Min";
    this.$priceInputSplitter = document.createElement("div");
    this.$priceInputSplitter.innerHTML = "-";
    this.$maxPriceInput = document.createElement("input");
    this.$maxPriceInput.type = "text";
    this.$maxPriceInput.placeholder = "Max";
    this.$priceInputContainer.appendChild(this.$minPriceInput);
    this.$priceInputContainer.appendChild(this.$priceInputSplitter);
    this.$priceInputContainer.appendChild(this.$maxPriceInput);
    this.$priceFilterContainer.appendChild(this.$priceFilterLabel);
    this.$priceFilterContainer.appendChild(this.$priceInputContainer);

    this.$filterBtnContainer = document.createElement("div");
    this.$filterBtnContainer.classList.add("filterBtnContainer");
    this.$applyFilterBtn = document.createElement("button");
    this.$applyFilterBtn.innerHTML = "Apply";
    this.$applyFilterBtn.classList.add("applyFilterBtn");
    this.$resetFilterBtn = document.createElement("button");
    this.$resetFilterBtn.innerHTML = "Reset";
    this.$resetFilterBtn.classList.add("resetFilterBtn");
    this.$filterBtnContainer.appendChild(this.$applyFilterBtn);
    this.$filterBtnContainer.appendChild(this.$resetFilterBtn);

    /* testData.map((item) => {
      this.$rightPanel.appendChild(
        this.renderProductItem(
          item.name,
          item.smallDes,
          item.thumbNailUrl,
          undefined,
          item.price
        )
      );
    }); */

    this.loadItems();

    const navigationBar = new NavBar((searchValue) => {
      this.loadItems(undefined, searchValue);
    });
    this.$viewArea.appendChild(navigationBar.render());
  }

  render() {
    this.$leftPanel.appendChild(this.$categoryFilterContainer);
    this.$leftPanel.appendChild(this.$brandFilterContainer);
    this.$leftPanel.appendChild(this.$ratingFilterContainer);
    this.$leftPanel.appendChild(this.$priceFilterContainer);
    this.$leftPanel.appendChild(this.$filterBtnContainer);
    this.$container.appendChild(this.$leftPanel);
    this.$container.appendChild(this.$rightPanel);
    this.$viewArea.appendChild(this.$container);

    return this.$viewArea;
  }

  loadItems(condition = " 1 = 1 ", searchValue = "") {
    this.$rightPanel.innerHTML = "";
    this.getData(
      "SELECT * FROM `product` WHERE" +
        condition +
        "ORDER BY `product`.`Price` DESC",
      (data) => {
        data.map((item) => {
          this.getData(
            "SELECT * FROM `brand` WHERE `brandID` = " + item.brandID,
            (brandData) => {
              if (
                item.Name.toLowerCase().includes(searchValue.toLowerCase()) ||
                brandData[0].brandName
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              ) {
                this.$rightPanel.appendChild(
                  this.renderProductItem(
                    item.productID,
                    item.Name,
                    brandData[0].brandName,
                    item.smallDescription,
                    item.thumbnailUrl,
                    undefined,
                    item.Price
                  )
                );
              }
            }
          );
        });
      }
    );
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

  renderProductItem(
    id,
    name,
    brand,
    smallDescription,
    thumbnailUrl,
    rating = 0,
    price
  ) {
    const $productContainer = document.createElement("div");
    const $productInfoContainer = document.createElement("div");
    const $productThumbnailContainer = document.createElement("div");
    const $productThumbnail = document.createElement("img");
    const $productName = document.createElement("div");
    const $productSmallDescription = document.createElement("div");
    const $productRatingContainer = document.createElement("div");

    const $productSubContainer = document.createElement("div");
    const $productPrice = document.createElement("div");
    const $addToCartBtn = document.createElement("button");

    $productContainer.classList.add("productContainer");
    $productInfoContainer.classList.add("productInfoContainer");
    $productThumbnailContainer.classList.add("productThumbnailContainer");
    $productName.classList.add("productItemName");
    $productSmallDescription.classList.add("productSmallDescription");
    $productSubContainer.classList.add("productSubContainer");

    $productThumbnail.src = thumbnailUrl;
    $productName.innerHTML = brand + " " + name;
    $productSmallDescription.innerHTML = smallDescription;
    $productPrice.innerHTML = price + "$";

    $productThumbnailContainer.appendChild($productThumbnail);
    $productSubContainer.appendChild($productPrice);
    $productSubContainer.appendChild($addToCartBtn);
    $addToCartBtn.innerHTML = "Add to cart";

    $productInfoContainer.appendChild($productThumbnailContainer);
    $productInfoContainer.appendChild($productName);
    $productInfoContainer.appendChild($productSmallDescription);

    $productContainer.appendChild($productInfoContainer);
    $productContainer.appendChild($productSubContainer);

    return $productContainer;
  }
}

export { ProductDisplay };
