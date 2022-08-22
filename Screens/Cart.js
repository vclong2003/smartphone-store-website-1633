import { Input } from "../Components/Input.js";

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
    this.$container.appendChild(this.$leftPanel);

    this.$rightPanel = document.createElement("div");
    this.$rightPanel.classList.add("cartScreen_rightPanel");
    this.$orderSummaryTitle = document.createElement("div");
    this.$orderSummaryTitle.innerHTML = "Order Summary";
    this.$orderSummaryTitle.classList.add("cartScreen_summaryTitle");
    this.$rightPanel.appendChild(this.$orderSummaryTitle);
    this.$orderItemsContainer = document.createElement("div");
    this.$rightPanel.appendChild(this.$orderItemsContainer);
    this.$checkoutContainer = document.createElement("div");
    this.$checkoutContainer.classList.add("cartScreen_checkoutContainer");
    this.$orderTotalTitle = document.createElement("div");
    this.$orderTotalTitle.innerHTML = "Total Order";
    this.$orderTotalValue = document.createElement("div");
    this.$orderTotalValue.innerHTML = "1500.00$";
    this.$orderTotalValue.classList.add("cartScreen_orderTotalValue");
    this.$checkoutContainer.appendChild(this.$orderTotalTitle);
    this.$checkoutContainer.appendChild(this.$orderTotalValue);
    this.$rightPanel.appendChild(this.$checkoutContainer);
    this.$container.appendChild(this.$rightPanel);
  }
  render() {
    document.title = "Cart";
    return this.$container;
  }
}
export { Cart };
