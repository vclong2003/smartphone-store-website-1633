import { Input } from "../Components/Input.js";
import { auth } from "../firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { fetchCartItems, removeCartItem } from "../Components/handleOrders.js";

class Cart {
  $container;

  $leftPanel;
  $nameInput;
  $phoneNumberInput;
  $shippingAddressInput;
  $additionalTitle;
  $orderNotesInput;
  $submitBtn;

  $rightPanel;
  $orderSummaryTitle;
  $orderItemsContainer;
  $checkoutContainer;
  $orderTotalTitle;
  $orderTotalValue;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("cartScreen_container");

    this.$leftPanel = document.createElement("div");
    this.$leftPanel.classList.add("cartScreen_leftPanel");
    this.$nameInput = new Input("Name");
    this.$phoneNumberInput = new Input("Phone number");
    this.$shippingAddressInput = new Input("Shipping address");
    this.$nameInput.addClass("cartScreen_leftPanel_input");
    this.$phoneNumberInput.addClass("cartScreen_leftPanel_input");
    this.$shippingAddressInput.addClass("cartScreen_leftPanel_input");

    this.$leftPanel.appendChild(this.$nameInput.render());
    this.$leftPanel.appendChild(this.$phoneNumberInput.render());
    this.$leftPanel.appendChild(this.$shippingAddressInput.render());
    this.$additionalTitle = document.createElement("div");
    this.$additionalTitle.classList.add("cartScreen_additionalTitle");
    this.$additionalTitle.innerHTML = "Additional informations";
    this.$leftPanel.appendChild(this.$additionalTitle);
    this.$orderNotesInput = new Input(
      "Need a specific delivery day? Sending a gitf? Let’s say ..."
    );
    this.$orderNotesInput.addClass("cartScreen_orderNotesInput");
    this.$leftPanel.appendChild(this.$orderNotesInput.render());
    this.$submitBtn = document.createElement("button");
    this.$submitBtn.innerHTML = "Submit Order";
    this.$submitBtn.classList.add("cartScreen_submitBtn");
    this.$leftPanel.appendChild(this.$submitBtn);

    this.$rightPanel = document.createElement("div");
    this.$rightPanel.classList.add("cartScreen_rightPanel");
    this.$orderSummaryTitle = document.createElement("div");
    this.$orderSummaryTitle.innerHTML = "Order Summary";
    this.$orderSummaryTitle.classList.add("cartScreen_summaryTitle");
    this.$rightPanel.appendChild(this.$orderSummaryTitle);
    this.$orderItemsContainer = document.createElement("div");
    this.$orderItemsContainer.classList.add("cartScreen_orderItemsContainer");
    this.$rightPanel.appendChild(this.$orderItemsContainer);
    this.$checkoutContainer = document.createElement("div");
    this.$checkoutContainer.classList.add("cartScreen_checkoutContainer");
    this.$orderTotalTitle = document.createElement("div");
    this.$orderTotalTitle.innerHTML = "Total Order";
    this.$orderTotalValue = document.createElement("div");
    this.$orderTotalValue.classList.add("cartScreen_orderTotalValue");
    this.$checkoutContainer.appendChild(this.$orderTotalTitle);
    this.$checkoutContainer.appendChild(this.$orderTotalValue);
    this.$rightPanel.appendChild(this.$checkoutContainer);
  }
  renderCartItem(thumbnailUrl, itemName, itemPrice, _removeFunction) {
    const container = document.createElement("div");
    container.classList.add("cart_itemComtainer");
    const leftContainer = document.createElement("div");
    leftContainer.classList.add("cart_itemComtainer_left");
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("cart_itemComtainer_right");
    const thumbnail = document.createElement("img");
    thumbnail.src = thumbnailUrl;
    const name = document.createElement("div");
    name.classList.add("cart_item_name");
    name.innerHTML = itemName;
    const price = document.createElement("div");
    price.classList.add("cart_item_price");
    price.innerHTML = itemPrice + "$";
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "Remove";
    removeBtn.addEventListener("click", () => {
      _removeFunction();
    });
    leftContainer.appendChild(thumbnail);
    rightContainer.appendChild(name);
    rightContainer.appendChild(price);
    rightContainer.appendChild(removeBtn);
    container.appendChild(leftContainer);
    container.appendChild(rightContainer);

    return container;
  }
  renderAllCartItems(email) {
    let totalPrice = 0;
    this.$orderTotalValue.innerHTML = "00.00$";
    this.$orderItemsContainer.innerHTML = "";
    fetchCartItems(email, (data) => {
      data.map((item) => {
        totalPrice += Number(item.Price);
        this.$orderItemsContainer.appendChild(
          this.renderCartItem(item.thumbnailUrl, item.Name, item.Price, () => {
            removeCartItem(email, item.productID, () => {
              this.renderAllCartItems(email);
            });
          })
        );
        this.$orderTotalValue.innerHTML = totalPrice.toFixed(2) + "$";
      });
    });
  }
  render() {
    document.title = "Cart";
    document.title = "Console";
    this.$container.innerHTML = "";

    const mockElement = document.createElement("div");
    mockElement.innerHTML = "You must login view this page!";

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.renderAllCartItems(user.email);
        this.$container.appendChild(this.$leftPanel);
        this.$container.appendChild(this.$rightPanel);
      } else {
        this.$container.appendChild(mockElement);
      }
    });
    return this.$container;
  }
}
export { Cart };
