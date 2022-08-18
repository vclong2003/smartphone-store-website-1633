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

export { fetchProductInfo };
