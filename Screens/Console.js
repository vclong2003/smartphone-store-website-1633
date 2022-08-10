import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import { AddProductInput } from "../Components/addProductInput.js";
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
  $productPriceInput;
  $productQuantityInput;

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
    this.$categoryNameInput = new AddProductInput("Category Name");
    this.$addCategoryBtn = document.createElement("button");
    this.$addCategoryBtn.innerHTML = "Add category";

    this.$addCategoryContainer.appendChild(this.$categoryNameInput.render());
    this.$addCategoryContainer.appendChild(this.$addCategoryBtn);

    this.$addBrandContainer = document.createElement("div");
    this.$brandNameInput = new AddProductInput("Brand name");
    this.$brandDescriptionInput = new AddProductInput("Brand description");
    this.$addBrandBtn = document.createElement("button");
    this.$addBrandBtn.innerHTML = "Add brand";

    this.$addBrandContainer.appendChild(this.$brandNameInput.render());
    this.$addBrandContainer.appendChild(this.$brandDescriptionInput.render());
    this.$addBrandContainer.appendChild(this.$addBrandBtn);

    this.$addProductContainer = document.createElement("div");
    this.$productCategorySelection = document.createElement("select");
    this.$productBrandSelection = document.createElement("select");
    this.$productNameInput = new AddProductInput("Product name");
    this.$productDescriptionInput = new AddProductInput("Product description");
    this.$productImageUploadContainer = document.createElement("div");
    this.$productPriceInput = new AddProductInput("Price");
    this.$productQuantityInput = new AddProductInput("Quantity");

    this.$addProductContainer.appendChild(this.$productCategorySelection);
    this.$addProductContainer.appendChild(this.$productBrandSelection);
    this.$addProductContainer.appendChild(this.$productNameInput.render());
    this.$addProductContainer.appendChild(
      this.$productDescriptionInput.render()
    );
    this.$addProductContainer.appendChild(this.$productImageUploadContainer);
    this.$addProductContainer.appendChild(this.$productPriceInput.render());
    this.$addProductContainer.appendChild(this.$productQuantityInput.render());

    this.$addTabContent = document.createElement("div");
    this.$addTabContent.classList.add("consoleAddTabContent");
    this.$addTabContent.appendChild(this.$addCategoryContainer);
    this.$addTabContent.appendChild(this.$addBrandContainer);
    this.$addTabContent.appendChild(this.$addProductContainer);

    this.$rightPanel.appendChild(this.$addTabContent);

    // this.$test = document.createElement("input");
    // this.$test.type = "file";
    // this.$test.accept = "image/*";
    // this.$test.addEventListener("change", () => {
    //   console.log(this.$test.files[0].name);
    // });

    // this.$testBtn = document.createElement("button");
    // this.$testBtn.innerHTML = "up";
    // this.$testBtn.addEventListener("click", () => {
    //   const storageRef = ref(storage, "test/" + this.$test.files[0].name);
    //   uploadBytes(storageRef, this.$test.files[0]).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //     });
    //   });
    // });
  }
  render() {
    this.$container.appendChild(this.$leftPanel);
    this.$container.appendChild(this.$rightPanel);

    return this.$container;
  }
}

export { Console };
