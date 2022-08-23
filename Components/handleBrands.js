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
const addBrand = (name, desc, _callback) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: {
      functionname: "addBrand",
      brandName: name,
      desc: desc,
    },
    success: function (data) {
      _callback(data);
    },
  });
};
export { fetchBrandList, addBrand };
