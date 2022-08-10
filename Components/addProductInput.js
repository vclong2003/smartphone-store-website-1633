class AddProductInput {
  $input;
  constructor(placeholder = "", type = "text", width = "") {
    this.$input = document.createElement("input");
    this.$input.type = type;
    this.$input.placeholder = placeholder;
    this.$input.classList.add("addProductInput");
    this.$input.style.width = width;
  }
  render() {
    return this.$input;
  }
  getValue() {
    return this.$input.value;
  }
}

export { AddProductInput };
