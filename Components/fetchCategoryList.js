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

export { fetchCategoryList };
