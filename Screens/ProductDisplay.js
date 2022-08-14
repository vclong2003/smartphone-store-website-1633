import { Input } from "../Components/Input.js";
import { NavBar } from "../Components/NavBar.js";
import { ratingStar } from "../Components/RatingStart.js";
import { navigate } from "../navigator.js";
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

  $paginationContainer;
  filterParam = { catID: "", brandID: [], priceLow: "", priceHigh: "" };

  constructor() {
    this.$viewArea = document.createElement("div");
    this.$container = document.createElement("div");
    this.$container.classList.add("productDisplayContainer");

    this.$leftPanel = document.createElement("div");
    this.$rightPanel = document.createElement("div");
    this.$leftPanel.classList.add("productDisplayLeftPanel");
    this.$rightPanel.classList.add("productDisplayRightPanel");

    this.$paginationContainer = document.createElement("div");
    this.$paginationContainer.classList.add("paginationContainer");

    this.$categoryFilterContainer = document.createElement("div");
    this.$categoryFilterContainer.classList.add(
      "productDisplayFilterContainer"
    );
    this.$categoryFilterLabel = document.createElement("p");
    this.$categoryFilterLabel.innerHTML = "Categories";
    this.$categoryFilterContainer.appendChild(this.$categoryFilterLabel);

    this.getData(
      "SELECT `category`.*, COUNT(`product`.`productID`) as quantity FROM `category` LEFT JOIN `product`ON `category`.`catID` = `product`.`catID` GROUP BY `category`.`catID`;",
      (data) => {
        let previous = null;
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
          $itemContainer.addEventListener("click", () => {
            if (previous == $itemContainer) {
              previous.classList.remove("categoryFilterItem_active");
              this.filterParam.catID = "";
              previous = null;
            } else {
              if (previous) {
                previous.classList.remove("categoryFilterItem_active");
              }
              this.filterParam.catID = item.catID;
              $itemContainer.classList.add("categoryFilterItem_active");
              previous = $itemContainer;
            }
            this.loadItems();
          });
          this.$categoryFilterContainer.appendChild($itemContainer);
        });
      }
    );

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
        const $brandName = document.createElement("div");
        $brandName.classList.add("brandFilterItemName");
        $brandName.innerHTML = item.brandName;

        $checkBox.addEventListener("change", () => {
          if ($checkBox.checked) {
            this.filterParam.brandID.push(item.brandID);
            this.loadItems();
          } else {
            if (this.filterParam.brandID.indexOf(item.brandID) != -1) {
              this.filterParam.brandID.splice(
                this.filterParam.brandID.indexOf(item.brandID),
                1
              );
            }
            this.loadItems();
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

    this.$applyFilterBtn.addEventListener("click", () => {
      this.filterParam.priceLow = this.$minPriceInput.value;
      this.filterParam.priceHigh = this.$maxPriceInput.value;
      this.loadItems();
    });
    this.$resetFilterBtn.addEventListener("click", () => {
      this.filterParam.priceLow = this.$minPriceInput.value = "";
      this.filterParam.priceHigh = this.$maxPriceInput.value = "";
      this.loadItems();
    });

    this.loadItems();

    const navigationBar = new NavBar((searchValue) => {
      this.loadItems(undefined, searchValue);
    });
    this.$viewArea.appendChild(navigationBar.render());
  }

  loadItems(condition = " 1 = 1 ", searchValue = "") {
    this.$rightPanel.innerHTML = "";
    this.getData(
      "SELECT `product`.*, `brand`.`brandName` FROM `product` INNER JOIN `brand` ON `product`.`brandID` = `brand`.`brandID` WHERE " +
        condition +
        " ORDER BY `product`.`Price` DESC;",
      (data) => {
        let paginationData = [];
        data.map((item) => {
          const itemSearchString = item.brandName + " " + item.Name;
          if (
            itemSearchString
              .toLowerCase()
              .includes(searchValue.toLowerCase()) &&
            (this.filterParam.catID == "" ||
              item.catID == this.filterParam.catID) &&
            (this.filterParam.brandID.length == 0 ||
              this.filterParam.brandID.indexOf(item.brandID) > -1) &&
            (this.filterParam.priceLow == "" ||
              Number(item.Price) > Number(this.filterParam.priceLow)) &&
            (this.filterParam.priceHigh == "" ||
              Number(item.Price) < Number(this.filterParam.priceHigh))
          ) {
            paginationData.push(
              this.renderProductItem(
                item.productID,
                item.Name,
                item.brandName,
                item.smallDescription,
                item.thumbnailUrl,
                undefined,
                item.Price,
                item.catID,
                item.brandID
              )
            );
          }
        });
        this.paginateData(paginationData);
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

  paginateData(rawData = []) {
    this.$paginationContainer.innerHTML = "";
    let previous = null;
    let initialpage;
    const splicedData = [];
    while (rawData.length) {
      splicedData.push(rawData.splice(0, 12));
    }
    splicedData.map((item, index) => {
      const paginateItem = document.createElement("div");
      paginateItem.innerHTML = index + 1;
      paginateItem.id = index;
      paginateItem.classList.add("paginateItem");
      paginateItem.addEventListener("click", () => {
        this.$rightPanel.innerHTML = "";
        item.map((_item) => {
          this.$rightPanel.appendChild(_item);
        });
        this.$rightPanel.appendChild(this.$paginationContainer);
        if (previous) {
          previous.classList.remove("paginateItem_active");
          window.scrollTo(0, 150);
        }
        paginateItem.classList.add("paginateItem_active");
        previous = paginateItem;
      });
      this.$paginationContainer.appendChild(paginateItem);
      if (paginateItem.id == 0) {
        paginateItem.click();
      }
    });
    this.$rightPanel.appendChild(this.$paginationContainer);
  }

  renderProductItem(
    id,
    name,
    brand,
    smallDescription,
    thumbnailUrl,
    rating = 0,
    price,
    catID,
    brandID
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

    $productContainer.addEventListener("click", () => {
      navigate("productDetailScreen", id);
    });

    return $productContainer;
  }

  render() {
    this.$leftPanel.appendChild(this.$categoryFilterContainer);
    this.$leftPanel.appendChild(this.$brandFilterContainer);
    // this.$leftPanel.appendChild(this.$ratingFilterContainer); // under development
    this.$leftPanel.appendChild(this.$priceFilterContainer);
    this.$leftPanel.appendChild(this.$filterBtnContainer);
    this.$container.appendChild(this.$leftPanel);
    this.$container.appendChild(this.$rightPanel);
    this.$viewArea.appendChild(this.$container);

    return this.$viewArea;
  }
}

export { ProductDisplay };
