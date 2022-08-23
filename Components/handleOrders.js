const addItemToCart = (email, productID, _callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "addItemToCart", email: email, productID: productID },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};
const fetchCartItems = (email, _callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "fetchCartItems", email: email },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};
const removeCartItem = (email, productID, _callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: {
      functionname: "removeCartItem",
      email: email,
      productID: productID,
    },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};
const checkCartItemExistance = (email, productID, _callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: {
      functionname: "checkCartItemExistance",
      email: email,
      productID: productID,
    },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};
export {
  addItemToCart,
  fetchCartItems,
  removeCartItem,
  checkCartItemExistance,
};
