import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import { fetchBrandList } from "../Components/fetchBrandList.js";
import { fetchCategoryList } from "../Components/fetchCategoryList.js";
import { Input } from "../Components/Input.js";
import { toggleElement } from "../Components/ToggleElement.js";
import { storage } from "../firebaseConfig.js";
import { navigate } from "../navigator.js";
class Console {
  $container;
  $edittingLayer;
  $edittingPopup;

  $leftPanel;
  $rightPanel;

  $addTab;
  $addTabContent;

  $editTab;
  $editTabContent;

  $exitTab;

  $addCategoryContainer;
  $categoryNameInput;
  $addCategoryBtn;

  $addBrandContainer;
  $brandNameInput;
  $brandDescriptionInput;
  $addBrandBtn;

  $editCategoryContainer;
  $editBrandContainer;
  $editProductContainer;

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

  $test;
  $testBtn;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("consoleContainer");

    this.$edittingLayer = document.createElement("div");
    this.$edittingLayer.classList.add("consoleScreen_edittingLayer");
    this.$container.appendChild(this.$edittingLayer);
    this.$edittingPopup = document.createElement("div");
    this.$edittingLayer.appendChild(this.$edittingPopup);

    this.$leftPanel = document.createElement("div");
    this.$rightPanel = document.createElement("div");
    this.$leftPanel.classList.add("consoleLeftPanel");
    this.$rightPanel.classList.add("consoleRightPanel");

    this.$addTab = document.createElement("div");
    this.$editTab = document.createElement("div");
    this.$exitTab = document.createElement("div");

    this.$addTab.innerHTML = "Add";
    this.$editTab.innerHTML = "Edit";
    this.$exitTab.innerHTML = "Exit";

    this.$exitTab.id = "consoleExitTab";

    this.$leftPanel.appendChild(this.$addTab);
    this.$leftPanel.appendChild(this.$editTab);
    this.$leftPanel.appendChild(this.$exitTab);

    this.$addCategoryContainer = document.createElement("div");
    this.$addCategoryContainer.classList.add("addContentContainer");
    this.$categoryNameInput = new Input("Category Name");
    this.$addCategoryBtn = document.createElement("button");
    this.$addCategoryBtn.innerHTML = "Add category";
    this.$addCategoryBtn.addEventListener("click", () => {
      const categoryName = this.$categoryNameInput.getValue();
      if (categoryName != "") {
        this.editData(
          "INSERT INTO `category`(`categoryName`) VALUES ('" +
            categoryName +
            "')",
          () => {
            this.updateCategorySelection();
          }
        );
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
        this.editData(
          "INSERT INTO `brand`(`brandName`, `Description`) VALUES ('" +
            brandName +
            "','" +
            brandDescription +
            "')",
          () => {
            this.updateBrandSelection();
          }
        );
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
    this.updateCategorySelection();

    this.$productBrandSelection = document.createElement("select");
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
              this.editData(
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
                  "')"
              );
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

    this.$editCategoryContainer = document.createElement("div");
    this.$editCategoryContainer.classList.add("editCategoryContainer");
    this.$editBrandContainer = document.createElement("div");
    this.$editBrandContainer.classList.add("editBrandContainer");
    this.$editProductContainer = document.createElement("div");
    this.$editProductContainer.classList.add("editProductContainer");

    this.$editTabContent = document.createElement("div");
    this.$editTabContent.appendChild(this.$editCategoryContainer);
    this.$editTabContent.appendChild(this.$editBrandContainer);
    this.$editTabContent.appendChild(this.$editProductContainer);
    this.$editTabContent.classList.add("consoleEditTabContent");

    let previousTab = null;
    this.$addTab.addEventListener("click", () => {
      if (previousTab) {
        previousTab.classList.remove("activeConsoleTab");
      }
      this.$rightPanel.innerHTML = "";
      this.$rightPanel.appendChild(this.$addTabContent);
      this.$addTab.classList.add("activeConsoleTab");
      previousTab = this.$addTab;
    });
    this.$editTab.addEventListener("click", () => {
      this.handleCategoryEditItems();
      this.handleBrandEditItems();
      this.handleProductEditItems();
      if (previousTab) {
        previousTab.classList.remove("activeConsoleTab");
      }
      this.$rightPanel.innerHTML = "";
      this.$rightPanel.appendChild(this.$editTabContent);
      this.$editTab.classList.add("activeConsoleTab");
      previousTab = this.$editTab;
    });
    this.$exitTab.addEventListener("click", () => {
      if (previousTab) {
        previousTab.classList.remove("activeConsoleTab");
      }
      this.$rightPanel.innerHTML = "";
      navigate("productDisplayScreen");
    });
  }

  render() {
    this.$container.appendChild(this.$leftPanel);
    this.$container.appendChild(this.$rightPanel);
    this.$addTab.click();
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
        alertify.notify("Successful!", "success", 1);
        if (_function) {
          _function();
        }
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
    fetchCategoryList((data) => {
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
    fetchBrandList((data) => {
      data.map((item) => {
        const $option = document.createElement("option");
        $option.value = item.brandID;
        $option.innerHTML = item.brandName;
        this.$productBrandSelection.appendChild($option);
      });
    });
  }
  handleCategoryEditItems() {
    fetchCategoryList((data) => {
      this.$editCategoryContainer.innerHTML = "";
      data.map((item) => {
        const container = document.createElement("div");
        container.classList.add("console_editItems");
        const title = document.createElement("p");
        title.innerHTML = item.categoryName + " : " + item.quantity;
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("console_editItems_editBtn");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";

        editBtn.addEventListener("click", () => {
          this.$edittingPopup.innerHTML = "";
          const catNameInput = new Input();
          catNameInput.setValue(item.categoryName);
          this.$edittingPopup.appendChild(catNameInput.render());
          this.renderEditorPopup(
            () => {
              this.editData(
                "UPDATE `category` SET `categoryName`='" +
                  catNameInput.getValue() +
                  "' WHERE `catID` = " +
                  item.catID,
                () => {
                  this.handleCategoryEditItems();
                  this.updateCategorySelection();
                  toggleElement(this.$edittingLayer);
                }
              );
            },
            () => {
              toggleElement(this.$edittingLayer);
              alertify.notify("Cancelled!", "error", 1);
            }
          );
          toggleElement(this.$edittingLayer);
        });

        deleteBtn.addEventListener("click", () => {
          if (item.quantity == 0) {
            this.editData(
              "DELETE FROM `category` WHERE catID = " + item.catID,
              () => {
                this.handleCategoryEditItems();
                this.updateCategorySelection();
              }
            );
          } else {
            alertify.notify("Category not empty!", "error", 1);
          }
        });
        container.appendChild(title);
        container.appendChild(editBtn);
        container.appendChild(deleteBtn);

        this.$editCategoryContainer.appendChild(container);
      });
    });
  }
  handleBrandEditItems() {
    fetchBrandList((data) => {
      this.$editBrandContainer.innerHTML = "";
      data.map((item) => {
        const container = document.createElement("div");
        container.classList.add("console_editItems");
        const title = document.createElement("p");
        title.innerHTML = item.brandName + " : " + item.quantity;
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("console_editItems_editBtn");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";

        editBtn.addEventListener("click", () => {
          this.$edittingPopup.innerHTML = "";
          const brandNameInput = new Input();
          const brandDescriptionInput = new Input();
          brandNameInput.setValue(item.brandName);
          brandDescriptionInput.setValue(item.Description);
          this.$edittingPopup.appendChild(brandNameInput.render());
          this.$edittingPopup.appendChild(brandDescriptionInput.render());
          this.renderEditorPopup(
            () => {
              this.editData(
                "UPDATE `brand` SET `brandName` = '" +
                  brandNameInput.getValue() +
                  "', `Description` = '" +
                  brandDescriptionInput.getValue() +
                  "' WHERE `brand`.`brandID` = " +
                  item.brandID,
                () => {
                  this.handleBrandEditItems();
                  this.updateBrandSelection();
                  toggleElement(this.$edittingLayer);
                }
              );
            },
            () => {
              toggleElement(this.$edittingLayer);
              alertify.notify("Cancelled!", "error", 1);
            }
          );
          toggleElement(this.$edittingLayer);
        });

        deleteBtn.addEventListener("click", () => {
          if (item.quantity == 0) {
            this.editData(
              "DELETE FROM `brand` WHERE brandID = " + item.brandID,
              () => {
                this.handleBrandEditItems();
                this.updateBrandSelection();
              }
            );
          } else {
            alertify.notify("Brand not empty!", "error", 1);
          }
        });
        container.appendChild(title);
        container.appendChild(editBtn);
        container.appendChild(deleteBtn);

        this.$editBrandContainer.appendChild(container);
      });
    });
  }
  handleProductEditItems() {
    this.getData(
      "SELECT `product`.*, `brand`.`brandName`FROM `product` INNER JOIN `brand` ON `product`.`brandID` = `brand`.`brandID`;",
      (data) => {
        this.$editProductContainer.innerHTML = "";
        data.map((item) => {
          const container = document.createElement("div");
          container.classList.add("console_editItems");
          const title = document.createElement("p");
          title.innerHTML = item.brandName + " " + item.Name;
          const editBtn = document.createElement("button");
          editBtn.innerHTML = "Edit";
          editBtn.classList.add("console_editItems_editBtn");
          const deleteBtn = document.createElement("button");

          editBtn.addEventListener("click", () => {
            alertify.notify(
              "Sorry, this function is in development!",
              "error",
              3
            );
          });

          deleteBtn.innerHTML = "Delete";
          deleteBtn.addEventListener("click", () => {
            this.$edittingPopup.innerHTML = "";
            const confirmText = document.createElement("div");
            confirmText.innerHTML = "Do you want to delete " + item.Name;
            this.$edittingPopup.appendChild(confirmText);
            toggleElement(this.$edittingLayer);
            this.renderEditorPopup(
              () => {
                this.editData(
                  "DELETE FROM `product` WHERE productID = " + item.productID,
                  () => {
                    this.handleProductEditItems();
                    toggleElement(this.$edittingLayer);
                  }
                );
              },
              () => {
                toggleElement(this.$edittingLayer);
                alertify.notify("Cancelled!", "error", 1);
              }
            );
          });
          container.appendChild(title);
          container.appendChild(editBtn);
          container.appendChild(deleteBtn);

          this.$editProductContainer.appendChild(container);
        });
      }
    );
  }
  renderEditorPopup(_submit, _cancel) {
    const container = document.createElement("div");
    const submitBtn = document.createElement("button");
    submitBtn.innerHTML = "Submit";
    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "Cancel";
    container.appendChild(submitBtn);
    container.appendChild(cancelBtn);
    this.$edittingPopup.appendChild(container);
    submitBtn.addEventListener("click", () => {
      _submit();
    });
    cancelBtn.addEventListener("click", () => {
      _cancel();
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
