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
    const categoriesList = [
      { name: "iPhone", quantity: 5 },
      { name: "Android Phones", quantity: 10 },
      { name: "Windows Phone", quantity: 1 },
    ];
    const brandList = [];
    jQuery.ajax({
      type: "POST",
      url: "action.php",
      dataType: "json",
      data: { functionname: "queryBrand" },
      success: function (data) {
        brandList.push(...data);
      },
    });
    console.log(brandList);
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
    categoriesList.map((category) => {
      const $itemContainer = document.createElement("div");
      $itemContainer.classList.add("categoryFilterItem");
      const $categoryName = document.createElement("div");
      $categoryName.innerHTML = category.name;
      const $quantity = document.createElement("div");
      $quantity.classList.add("categoryFilterItemQuantity");
      $quantity.innerHTML = category.quantity;
      $itemContainer.appendChild($categoryName);
      $itemContainer.appendChild($quantity);

      this.$categoryFilterContainer.appendChild($itemContainer);
    });

    this.$brandFilterContainer = document.createElement("div");
    this.$brandFilterContainer.classList.add("productDisplayFilterContainer");
    this.$brandFilterLabel = document.createElement("p");
    this.$brandFilterLabel.innerHTML = "Brands";
    this.$brandFilterContainer.appendChild(this.$brandFilterLabel);
    // brandsList.map((brand) => {
    //   const $itemContainer = document.createElement("div");
    //   $itemContainer.classList.add("brandFilterItemContainer");
    //   const $checkBox = document.createElement("input");
    //   $checkBox.type = "checkbox";
    //   const $brandName = document.createElement("div");
    //   $brandName.classList.add("brandFilterItemName");
    //   $brandName.innerHTML = brand;
    //   $itemContainer.appendChild($checkBox);
    //   $itemContainer.appendChild($brandName);

    //   this.$brandFilterContainer.appendChild($itemContainer);
    // });

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

    const navigationBar = new NavBar();
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
}

export { ProductDisplay };