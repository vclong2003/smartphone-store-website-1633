import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import { Input } from "../Components/Input.js";
import { storage } from "../firebaseConfig.js";
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
  $productDescriptionInput;
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

    this.$addTab.innerHTML = "Add";
    this.$editTab.innerHTML = "Edit";
    this.$viewTab.innerHTML = "View";

    this.$leftPanel.appendChild(this.$addTab);
    this.$leftPanel.appendChild(this.$editTab);
    this.$leftPanel.appendChild(this.$viewTab);

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
            functionname: "addNewCategory",
            categoryName: categoryName,
          },
        });
      } else {
        alert("Please enter category name!");
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
            functionname: "addNewBrand",
            brandName: brandName,
            brandDescription: brandDescription,
          },
        });
      } else {
        alert("Please enter brand name!");
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
    this.getData("category", (data = []) => {
      data.map((item) => {
        const $option = document.createElement("option");
        $option.value = item.catID;
        $option.innerHTML = item.categoryName;

        this.$productCategorySelection.appendChild($option);
      });
    });

    this.$productBrandSelection = document.createElement("select");
    this.$productBrandSelection.addEventListener("change", () => {
      console.log(`${this.$productBrandSelection.value} selected`);
    });
    this.getData("brand", (data = []) => {
      data.map((item) => {
        const $option = document.createElement("option");
        $option.value = item.brandID;
        $option.innerHTML = item.brandName;

        this.$productBrandSelection.appendChild($option);
      });
    });

    this.$productNameInput = new Input("Product name");
    this.$productDescriptionInput = new Input("Product description");
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
      if (this.$imageInput.files[0]) {
        console.log(this.$imageInput.files[0].name);
        this.uploadImage(this.$imageInput.files[0], (url) => {
          console.log(url);
          // $_POST['catID'], $_POST['brandID'], $_POST['name'], $_POST['description'], $_POST['imageUrl'], $_POST['price'], $_POST['quantity']
          jQuery.ajax({
            type: "POST",
            url: "action.php",
            dataType: "json",
            data: {
              functionname: "addNewProduct",
              catID: this.$productCategorySelection.value,
              brandID: this.$productBrandSelection.value,
              name: this.$productNameInput.getValue(),
              description: this.$productDescriptionInput.getValue(),
              imageUrl: url,
              price: this.$productPriceInput.getValue(),
              quantity: this.$productQuantityInput.getValue(),
            },
          });
        });
      } else {
        console.log("No file added!");
      }
    });

    this.$addProductContainer.appendChild(this.$productCategorySelection);
    this.$addProductContainer.appendChild(this.$productBrandSelection);
    this.$addProductContainer.appendChild(this.$productNameInput.render());
    this.$addProductContainer.appendChild(
      this.$productDescriptionInput.render()
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

  getData(tableName = "", _function) {
    jQuery.ajax({
      type: "POST",
      url: "action.php",
      dataType: "json",
      data: { functionname: "queryMySql", tableName: tableName },
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
