const fetchCategoryList = (_callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "fetchAllCategories" },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};

const addCategory = (catName, _callback) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "addCategory", catName: catName },
    success: function (data) {
      _callback(data);
    },
  });
};

export { fetchCategoryList, addCategory };
