import { Input } from "../Components/Input.js";
import { NavBar } from "../Components/NavBar.js";
import { ratingStar } from "../Components/RatingStart.js";
import { navigate } from "../navigator.js";
import { auth } from "../firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import {
  loadItems,
  updateFilterParam,
} from "../Components/productDisplayHandler.js";
class ProductDisplay {
  userEmail = null;

  $viewArea;
  $navBar;
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
    this.renderCategoryList((data) => {
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
            updateFilterParam(undefined, "");
            previous = null;
          } else {
            if (previous) {
              previous.classList.remove("categoryFilterItem_active");
            }
            $itemContainer.classList.add("categoryFilterItem_active");
            updateFilterParam(undefined, item.catID);
            previous = $itemContainer;
          }
          this.renderItems();
        });
        this.$categoryFilterContainer.appendChild($itemContainer);
      });
    });

    this.$brandFilterContainer = document.createElement("div");
    this.$brandFilterContainer.classList.add("productDisplayFilterContainer");
    this.$brandFilterLabel = document.createElement("p");
    this.$brandFilterLabel.innerHTML = "Brands";
    this.$brandFilterContainer.appendChild(this.$brandFilterLabel);
    this.renderBrandList((data) => {
      const selectedBrand = [];
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
            selectedBrand.push(item.brandID);
            updateFilterParam(undefined, undefined, selectedBrand);
            this.renderItems();
          } else {
            if (selectedBrand.indexOf(item.brandID) != -1) {
              selectedBrand.splice(selectedBrand.indexOf(item.brandID), 1);
            }
            updateFilterParam(undefined, undefined, selectedBrand);
            this.renderItems();
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
      updateFilterParam(
        undefined,
        undefined,
        undefined,
        this.$minPriceInput.value,
        this.$maxPriceInput.value
      );
      this.renderItems();
    });
    this.$resetFilterBtn.addEventListener("click", () => {
      updateFilterParam(undefined, undefined, undefined, "", "");
      this.renderItems();
    });

    this.$navBar = new NavBar((searchValue) => {
      updateFilterParam(searchValue);
      this.renderItems();
    });
    this.$viewArea.appendChild(this.$navBar.render());
  }

  renderCategoryList(_callbackFunction) {
    jQuery.ajax({
      type: "POST",
      url: "action.php",
      dataType: "json",
      data: { functionname: "fetchAllCategories" },
      success: function (data) {
        _callbackFunction(data);
      },
    });
  }

  renderBrandList(_callbackFunction) {
    jQuery.ajax({
      type: "POST",
      url: "action.php",
      dataType: "json",
      data: { functionname: "fetchAllBrands" },
      success: function (data) {
        _callbackFunction(data);
      },
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
  editData(query, _function = null) {
    jQuery.ajax({
      type: "POST",
      url: "action.php",
      dataType: "json",
      data: {
        functionname: "addData",
        query: query,
      },
      success: function () {
        if (_function) {
          _function();
        }
      },
    });
  }

  renderItems() {
    loadItems(
      this.$rightPanel,
      (id) => {
        navigate("productDetailScreen", id);
      },
      (id) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            this.userEmail = user.email;
          }
        });
      }
    );
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

    this.renderItems();
    return this.$viewArea;
  }
}

export { ProductDisplay };
