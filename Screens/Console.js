import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
import { storage } from "../firebaseConfig.js";
class Console {
  $container;

  $leftPanel;
  $rightPanel;

  $orderActionTabContainer;
  $pendingApprovalOrders;
  $onGoingOrder;
  $cancelledOrders;

  $addTabContainer;
  $addCategoryTab;
  $addBrandTab;
  $addProductTab;

  //<input type="file" accept="image/*">

  $test;
  $testBtn;

  constructor() {
    this.$container = document.createElement("div");

    this.$leftPanel = document.createElement("div");
    this.$rightPanel = document.createElement("div");

    this.$orderActionTabContainer = document.createElement("div");

    this.$test = document.createElement("input");
    this.$test.type = "file";
    this.$test.accept = "image/*";
    this.$test.addEventListener("change", () => {
      console.log(this.$test.files[0].name);
    });

    this.$testBtn = document.createElement("button");
    this.$testBtn.innerHTML = "up";
    this.$testBtn.addEventListener("click", () => {
      const storageRef = ref(storage, "test/" + this.$test.files[0].name);
      uploadBytes(storageRef, this.$test.files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      });
    });
  }
  render() {
    this.$container.appendChild(this.$test);
    this.$container.appendChild(this.$testBtn);

    return this.$container;
  }
}

export { Console };
