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
export { fetchProducts };
