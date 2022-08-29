import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import { addBrand, fetchBrandList } from "../Components/handleBrands.js";
import {
  addCategory,
  fetchCategoryList,
} from "../Components/handleCategory.js";
import { Input } from "../Components/Input.js";
import { toggleElement } from "../Components/ToggleElement.js";
import { storage, auth } from "../firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import {
  fetchProductInfo,
  fetchProducts,
} from "../Components/handleProduct.js";
import { LoadingLayer } from "../Components/LoadingLayer.js";
import { customQuery } from "../Components/customQuery.js";
class Console {
  $container;
  $loadingLayer;
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

  $addCarouselContainer;
  $carouselNameInput;
  $carouselImgUpload;
  $addCarouselBtn;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("consoleContainer");

    this.$loadingLayer = new LoadingLayer();

    this.$edittingLayer = document.createElement("div");
    this.$edittingLayer.classList.add("consoleScreen_edittingLayer");
    this.$container.appendChild(this.$edittingLayer);
    this.$edittingPopup = document.createElement("div");
    this.$edittingPopup.classList.add("consoleScreen_edittingPopup");
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
        addCategory(categoryName, () => {
          alertify.notify("Successful!", "success", 1);
          this.updateCategorySelection();
        });
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
        addBrand(brandName, brandDescription, () => {
          alertify.notify("Successful!", "success", 1);
          this.updateBrandSelection();
        });
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
    this.$productDescriptionInput = document.createElement("textarea");
    this.$productDescriptionInput.rows = "10";
    this.$productDescriptionInput.placeholder = "Description";

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
      const description = this.$productDescriptionInput.value
        .replace(/\r\n|\r|\n/g, "<br />")
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
                  functionname: "addProduct",
                  catID: catID,
                  brandID: brandID,
                  Name: name,
                  smallDescription: smallDescription,
                  Description: description,
                  thumbnailUrl: thumbnailUrl,
                  imageUrl: imageUrl,
                  Price: price,
                  quantity: quantity,
                },
                success: function (data) {
                  alertify.notify("Successful!", "success", 1);
                  console.log(data);
                },
              });
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
    this.$addProductContainer.appendChild(this.$productDescriptionInput);
    this.$addProductContainer.appendChild(
      this.$productThumbnailUploadContainer
    );
    this.$addProductContainer.appendChild(this.$productImageUploadContainer);
    this.$addProductContainer.appendChild(this.$productPriceInput.render());
    this.$addProductContainer.appendChild(this.$productQuantityInput.render());
    this.$addProductContainer.appendChild(this.$addProductBtn);

    this.$addCarouselContainer = document.createElement("div");
    this.$addCarouselContainer.classList.add("addContentContainer");
    this.$carouselNameInput = new Input("Name");
    this.$carouselImgUpload = document.createElement("input");
    this.$carouselImgUpload.type = "file";
    this.$carouselImgUpload.accept = "image/*";
    this.$addCarouselBtn = document.createElement("button");
    this.$addCarouselBtn.innerHTML = "Add carousel image";
    this.$addCarouselBtn.addEventListener("click", () => {
      if (this.$carouselImgUpload.files[0]) {
        this.uploadCarouselImage(this.$carouselImgUpload.files[0], (url) => {
          console.log(url);
        });
      }
    });

    this.$addCarouselContainer.appendChild(this.$carouselNameInput.render());
    this.$addCarouselContainer.appendChild(this.$carouselImgUpload);
    this.$addCarouselContainer.appendChild(this.$addCarouselBtn);

    this.$addTabContent = document.createElement("div");
    this.$addTabContent.classList.add("consoleAddTabContent");
    this.$addTabContent.appendChild(this.$addCategoryContainer);
    this.$addTabContent.appendChild(this.$addBrandContainer);
    this.$addTabContent.appendChild(this.$addProductContainer);
    this.$addTabContent.appendChild(this.$addCarouselContainer);

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
      history.back();
    });
  }
  uploadImage(file, _function) {
    toggleElement(this.$loadingLayer.render());
    const storageRef = ref(storage, "productImages/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        toggleElement(this.$loadingLayer.render());
        _function(downloadURL);
      });
    });
  }
  uploadCarouselImage(file, _function) {
    toggleElement(this.$loadingLayer.render());
    const storageRef = ref(storage, "carouselImgs/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        toggleElement(this.$loadingLayer.render());
        _function(downloadURL);
      });
    });
  }
  async deleteImgFromFirebase(imgUrl, _callback) {
    toggleElement(this.$loadingLayer.render());
    const imgRef = await ref(storage, imgUrl);
    await  deleteObject(imgRef)
      .then(() => {
        toggleElement(this.$loadingLayer.render());
        _callback();
      })
      .catch((error) => {
        toggleElement(this.$loadingLayer.render());
        console.log(error);
        _callback();
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
          const catNameInput = new Input("Name");
          catNameInput.setValue(item.categoryName);
          this.$edittingPopup.appendChild(catNameInput.render());
          this.renderEditorPopup(
            () => {
              customQuery(
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
            customQuery(
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
          const brandNameInput = new Input("Name");
          const brandDescriptionInput = new Input("Description");
          brandNameInput.setValue(item.brandName);
          brandDescriptionInput.setValue(item.Description);
          this.$edittingPopup.appendChild(brandNameInput.render());
          this.$edittingPopup.appendChild(brandDescriptionInput.render());
          this.renderEditorPopup(
            () => {
              customQuery(
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
            customQuery(
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
    fetchProducts((data) => {
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
          this.$edittingPopup.innerHTML = "";

          let thumbnailUrl = "";
          let imageUrl = "";

          const categorySelection = document.createElement("select");
          const brandSelection = document.createElement("select");
          const name = new Input("Name", "text");
          const smallDescription = new Input("Small description", "text");
          const description = document.createElement("textarea");
          description.rows = "10";
          const thumbnailUpload = document.createElement("input");
          thumbnailUpload.type = "file";
          thumbnailUpload.accept = "image/*";
          thumbnailUpload.title = "Thumbnail";
          const imageUpload = document.createElement("input");
          imageUpload.type = "file";
          imageUpload.accept = "image/*";
          imageUpload.title = "Image";
          const price = new Input("Price", "text");
          const quantity = new Input("Quantity", "text");

          this.$edittingPopup.appendChild(categorySelection);
          this.$edittingPopup.appendChild(brandSelection);
          this.$edittingPopup.appendChild(name.render());
          this.$edittingPopup.appendChild(smallDescription.render());
          this.$edittingPopup.appendChild(description);
          this.$edittingPopup.appendChild(thumbnailUpload);
          this.$edittingPopup.appendChild(imageUpload);
          this.$edittingPopup.appendChild(price.render());
          this.$edittingPopup.appendChild(quantity.render());
          fetchProductInfo(item.productID, (data) => {
            fetchCategoryList((catData) => {
              categorySelection.innerHTML = "";
              catData.map((item) => {
                const $option = document.createElement("option");
                $option.value = item.catID;
                $option.innerHTML = item.categoryName;
                categorySelection.appendChild($option);
                categorySelection.value = data.catID;
              });

              fetchBrandList((brandData) => {
                brandSelection.innerHTML = "";
                brandData.map((item) => {
                  const $option = document.createElement("option");
                  $option.value = item.brandID;
                  $option.innerHTML = item.brandName;
                  brandSelection.appendChild($option);
                  brandSelection.value = data.brandID;
                });
              });

              name.setValue(data.Name);
              smallDescription.setValue(data.smallDescription);
              description.value = data.Description;
              price.setValue(data.Price);
              quantity.setValue(data.quantity);
              thumbnailUrl = data.thumbnailUrl;
              imageUrl = data.imageUrl;

              const sendQuery = () => {
                customQuery(
                  "UPDATE `product` SET `catID` = '" +
                    categorySelection.value +
                    "', `brandID` = '" +
                    brandSelection.value +
                    "', `Name` = '" +
                    name.getValue().replace(`'`, `''`) +
                    "', `smallDescription` = '" +
                    smallDescription.getValue().replace(`'`, `''`) +
                    "', `Description` = '" +
                    description.value
                      .replace(/\r\n|\r|\n/g, "<br />")
                      .replace(`'`, `''`) +
                    "', `thumbnailUrl` = '" +
                    thumbnailUrl +
                    "', `imageUrl` = '" +
                    imageUrl +
                    "', `Price` = '" +
                    price.getValue() +
                    "', `quantity` = '" +
                    quantity.getValue() +
                    "' WHERE `product`.`productID` = " +
                    data.productID,
                  () => {
                    toggleElement(this.$edittingLayer);
                    alertify.notify("Done!", "success", 1);
                  }
                );
              };

              this.renderEditorPopup(
                () => {
                  if (thumbnailUpload.files[0] && imageUpload.files[0]) {
                    this.uploadImage(thumbnailUpload.files[0], (url) => {
                      thumbnailUrl = url;
                      this.uploadImage(imageUpload.files[0], (_url) => {
                        imageUrl = _url;
                        sendQuery();
                      });
                    });
                  } else if (thumbnailUpload.files[0]) {
                    this.uploadImage(thumbnailUpload.files[0], (url) => {
                      thumbnailUrl = url;
                      sendQuery();
                    });
                  } else if (imageUpload.files[0]) {
                    this.uploadImage(imageUpload.files[0], (url) => {
                      imageUrl = url;
                      sendQuery();
                    });
                  } else {
                    sendQuery();
                  }
                },
                () => {
                  toggleElement(this.$edittingLayer);
                  alertify.notify("Cancelled!", "error", 1);
                }
              );
              toggleElement(this.$edittingLayer);
            });
          });
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
              this.deleteImgFromFirebase(item.thumbnailUrl, () => {
                this.deleteImgFromFirebase(item.imageUrl, () => {
                  customQuery(
                    "DELETE FROM `product` WHERE productID = " + item.productID,
                    () => {
                      this.handleProductEditItems();
                      toggleElement(this.$edittingLayer);
                    }
                  );
                });
              });
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
    });
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
  render() {
    document.title = "Console";
    this.$container.innerHTML = "";

    const mockElement = document.createElement("div");
    mockElement.innerHTML = "You are not authorized to view this page!";

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email == "vclong2003@gmail.com") {
          this.$container.appendChild(this.$loadingLayer.render());
          this.$container.appendChild(this.$edittingLayer);
          this.$container.appendChild(this.$leftPanel);
          this.$container.appendChild(this.$rightPanel);
          this.$addTab.click();
        } else {
          this.$container.appendChild(mockElement);
        }
      } else {
        this.$container.appendChild(mockElement);
      }
    });

    return this.$container;
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
