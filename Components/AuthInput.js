class AuthInput {
  $input;
  constructor(placeholder = "", type = "text", width = "") {
    this.$input = document.createElement("input");
    this.$input.type = type;
    this.$input.placeholder = placeholder;
    this.$input.classList.add("authInput");
    this.$input.style.width = width;
  }
  render() {
    return this.$input;
  }
  getValue() {
    return this.$input.value;
  }
  setError(state = true) {
    if (state) {
      this.$input.style.color = "red";
    } else {
      this.$input.style.color = "";
    }
  }
}
export { AuthInput };
