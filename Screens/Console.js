import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import { Input } from "../Components/Input.js";
import { storage } from "../firebaseConfig.js";
import { navigate } from "../navigator.js";
class Console {
  $container;

  $leftPanel;
  $rightPanel;

  $addTab;
  $addTabContent;

  $editTab;
  $editTabContent;

  $viewTab;
  $viewTabContent;

  $exitTab;

  $addCategoryContainer;
  $categoryNameInput;
  $addCategoryBtn;

  $addBrandContainer;
  $brandNameInput;
  $brandDescriptionInput;
  $addBrandBtn;

  $addProductContainer;
  $productCategorySelection;
  $productBrandSelection;
  $productNameInput;
  $productSmallDescriptionInput;
  $productDescriptionInput;
  $productThumbnailUploadContainer;
  $thumbnailUploadLabel;
  $thumbnailInput;
  $productImageUploadContainer;
  $imageUploadLabel;
  $imageInput;
  $productPriceInput;
  $productQuantityInput;
  $addProductBtn;

  //<input type="file" accept="image/*">

  $test;
  $testBtn;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("consoleContainer");

    this.$leftPanel = document.createElement("div");
    this.$rightPanel = document.createElement("div");
    this.$leftPanel.classList.add("consoleLeftPanel");
    this.$rightPanel.classList.add("consoleRightPanel");

    this.$addTab = document.createElement("div");
    this.$editTab = document.createElement("div");
    this.$viewTab = document.createElement("div");
    this.$exitTab = document.createElement("div");
    this.$addTab.style.backgroundColor = "rgba(244, 248, 236, 1)";

    this.$addTab.innerHTML = "Add";
    this.$editTab.innerHTML = "Edit";
    this.$viewTab.innerHTML = "View";
    this.$exitTab.innerHTML = "Exit";

    this.$exitTab.id = "consoleExitTab";
    this.$exitTab.addEventListener("click", () => {
      navigate("productDisplayScreen");
    });

    this.$leftPanel.appendChild(this.$addTab);
    this.$leftPanel.appendChild(this.$editTab);
    this.$leftPanel.appendChild(this.$viewTab);
    this.$leftPanel.appendChild(this.$exitTab);

    this.$addCategoryContainer = document.createElement("div");
    this.$addCategoryContainer.classList.add("addContentContainer");
    this.$categoryNameInput = new Input("Category Name");
    this.$addCategoryBtn = document.createElement("button");
    this.$addCategoryBtn.innerHTML = "Add category";
    this.$addCategoryBtn.addEventListener("click", () => {
      const categoryName = this.$categoryNameInput.getValue();
      if (categoryName != "") {
        jQuery.ajax({
          type: "POST",
          url: "action.php",
          dataType: "json",
          data: {
            functionname: "addData",
            query:
              "INSERT INTO `category`(`categoryName`) VALUES ('" +
              categoryName +
              "')",
          },
        });
        alertify.notify("Successful!", "success");
        this.updateCategorySelection();
      } else {
        alertify.notify("PLease enter category name!", "error", 2);
      }
    });

    this.$addCategoryContainer.appendChild(this.$categoryNameInput.render());
    this.$addCategoryContainer.appendChild(this.$addCategoryBtn);

    this.$addBrandContainer = document.createElement("div");
    this.$addBrandContainer.classList.add("addContentContainer");
    this.$brandNameInput = new Input("Brand name");
    this.$brandDescriptionInput = new Input("Brand description");
    this.$addBrandBtn = document.createElement("button");
    this.$addBrandBtn.innerHTML = "Add brand";
    this.$addBrandBtn.addEventListener("click", () => {
      const brandName = this.$brandNameInput.getValue();
      const brandDescription = this.$brandDescriptionInput.getValue();
      if (brandName != "") {
        jQuery.ajax({
          type: "POST",
          url: "action.php",
          dataType: "json",
          data: {
            functionname: "addData",
            query:
              "INSERT INTO `brand`(`brandName`, `Description`) VALUES ('" +
              brandName +
              "','" +
              brandDescription +
              "')",
          },
        });
        alertify.notify("Successful!", "success");
        this.updateBrandSelection();
      } else {
        alertify.notify("PLease enter brand name!", "error", 2);
      }
    });

    this.$addBrandContainer.appendChild(this.$brandNameInput.render());
    this.$addBrandContainer.appendChild(this.$brandDescriptionInput.render());
    this.$addBrandContainer.appendChild(this.$addBrandBtn);

    this.$addProductContainer = document.createElement("div");
    this.$addProductContainer.classList.add("addContentContainer");

    this.$productCategorySelection = document.createElement("select");
    this.$productCategorySelection.addEventListener("change", () => {
      console.log(`${this.$productCategorySelection.value} selected`);
    });
    this.updateCategorySelection();

    this.$productBrandSelection = document.createElement("select");
    this.$productBrandSelection.addEventListener("change", () => {
      console.log(`${this.$productBrandSelection.value} selected`);
    });
    this.updateBrandSelection();

    this.$productNameInput = new Input("Product name");
    this.$productSmallDescriptionInput = new Input("Small description");
    this.$productDescriptionInput = new Input("Product description");

    this.$productThumbnailUploadContainer = document.createElement("div");
    this.$productThumbnailUploadContainer.classList.add(
      "productImageUploadContainer"
    );
    this.$thumbnailUploadLabel = document.createElement("p");
    this.$thumbnailUploadLabel.innerHTML = "Thumbnail:";
    this.$thumbnailInput = document.createElement("input");
    this.$thumbnailInput.type = "file";
    this.$thumbnailInput.accept = "image/*";
    this.$productThumbnailUploadContainer.appendChild(
      this.$thumbnailUploadLabel
    );
    this.$productThumbnailUploadContainer.appendChild(this.$thumbnailInput);

    this.$productImageUploadContainer = document.createElement("div");
    this.$productImageUploadContainer.classList.add(
      "productImageUploadContainer"
    );
    this.$imageUploadLabel = document.createElement("p");
    this.$imageUploadLabel.innerHTML = "Image:";
    this.$imageInput = document.createElement("input");
    this.$imageInput.type = "file";
    this.$imageInput.accept = "image/*";
    this.$productImageUploadContainer.appendChild(this.$imageUploadLabel);
    this.$productImageUploadContainer.appendChild(this.$imageInput);
    this.$productPriceInput = new Input("Price");
    this.$productQuantityInput = new Input("Quantity");
    this.$addProductBtn = document.createElement("button");
    this.$addProductBtn.innerHTML = "Add product";
    this.$addProductBtn.addEventListener("click", () => {
      let thumbnailUrl;
      let imageUrl;
      const catID = this.$productCategorySelection.value;
      const brandID = this.$productBrandSelection.value;
      const name = this.$productNameInput.getValue();
      const smallDescription = this.$productSmallDescriptionInput
        .getValue()
        .replace(`'`, `''`);
      const description = this.$productDescriptionInput
        .getValue()
        .replace(`'`, `''`);
      const price = this.$productPriceInput.getValue();
      const quantity = this.$productQuantityInput.getValue();

      if (this.$thumbnailInput.files[0]) {
        this.uploadImage(this.$thumbnailInput.files[0], (url) => {
          thumbnailUrl = url;
          if (this.$imageInput.files[0]) {
            this.uploadImage(this.$imageInput.files[0], (url) => {
              imageUrl = url;
              jQuery.ajax({
                type: "POST",
                url: "action.php",
                dataType: "json",
                data: {
                  functionname: "addData",
                  query:
                    "INSERT INTO `product`(`catID`, `brandID`, `Name`, `smallDescription`, `Description`, `thumbnailUrl`, `imageUrl`, `Price`, `quantity`) VALUES ('" +
                    catID +
                    "','" +
                    brandID +
                    "','" +
                    name +
                    "','" +
                    smallDescription +
                    "','" +
                    description +
                    "','" +
                    thumbnailUrl +
                    "','" +
                    imageUrl +
                    "','" +
                    price +
                    "', '" +
                    quantity +
                    "')",
                },
              });
              alertify.notify("Successful!", "success");
            });
          }
        });
      }
    });

    this.$addProductContainer.appendChild(this.$productCategorySelection);
    this.$addProductContainer.appendChild(this.$productBrandSelection);
    this.$addProductContainer.appendChild(this.$productNameInput.render());
    this.$addProductContainer.appendChild(
      this.$productSmallDescriptionInput.render()
    );
    this.$addProductContainer.appendChild(
      this.$productDescriptionInput.render()
    );
    this.$addProductContainer.appendChild(
      this.$productThumbnailUploadContainer
    );
    this.$addProductContainer.appendChild(this.$productImageUploadContainer);
    this.$addProductContainer.appendChild(this.$productPriceInput.render());
    this.$addProductContainer.appendChild(this.$productQuantityInput.render());
    this.$addProductContainer.appendChild(this.$addProductBtn);

    this.$addTabContent = document.createElement("div");
    this.$addTabContent.classList.add("consoleAddTabContent");
    this.$addTabContent.appendChild(this.$addCategoryContainer);
    this.$addTabContent.appendChild(this.$addBrandContainer);
    this.$addTabContent.appendChild(this.$addProductContainer);

    this.$rightPanel.appendChild(this.$addTabContent);
  }

  render() {
    this.$container.appendChild(this.$leftPanel);
    this.$container.appendChild(this.$rightPanel);

    return this.$container;
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

  uploadImage(file, _function) {
    const storageRef = ref(storage, "productImages/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        _function(downloadURL);
      });
    });
  }

  updateCategorySelection() {
    this.$productCategorySelection.innerHTML = "";
    this.getData("SELECT * FROM `category`", (data = []) => {
      data.map((item) => {
        const $option = document.createElement("option");
        $option.value = item.catID;
        $option.innerHTML = item.categoryName;
        this.$productCategorySelection.appendChild($option);
      });
    });
  }
  updateBrandSelection() {
    this.$productBrandSelection.innerHTML = "";
    this.getData("SELECT * FROM `brand`", (data = []) => {
      data.map((item) => {
        const $option = document.createElement("option");
        $option.value = item.brandID;
        $option.innerHTML = item.brandName;
        this.$productBrandSelection.appendChild($option);
      });
    });
  }
}

export { Console };

/*
<select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
*/
