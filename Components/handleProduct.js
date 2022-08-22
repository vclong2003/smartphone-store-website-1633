const fetchProducts = (_callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "fetchAllProducts" },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};

const fetchProductInfo = (id, _callback) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "fetchSingleProduct", productID: id },
    success: function (data) {
      _callback(data);
    },
  });
};

export { fetchProducts, fetchProductInfo };
