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

export { addItemToCart };
