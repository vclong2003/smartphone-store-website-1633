const fetchBrandList = (_callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "fetchAllBrands" },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};
export { fetchBrandList };
