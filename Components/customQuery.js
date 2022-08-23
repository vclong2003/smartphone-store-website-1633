const customQuery = (query, _callbackFunction) => {
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "customQuery", query: query },
    success: function (data) {
      _callbackFunction(data);
    },
  });
};

export { customQuery };
