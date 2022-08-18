let filterParam = {
  searchValue: "",
  catID: "",
  brandID: [],
  priceLow: "",
  priceHigh: "",
};

const updateFilterParam = (
  _searchValue = null,
  _catID = null,
  _brandID = null,
  _priceLow = null,
  _priceHigh = null
) => {
  if (_searchValue) {
    filterParam.searchValue = _searchValue;
  }
  if (_catID) {
    filterParam.catID = _catID;
  }
  if (_brandID) {
    filterParam.brandID = [..._brandID];
  }
  if (_priceLow) {
    filterParam.priceLow = _priceLow;
  }
  if (_priceHigh) {
    filterParam.priceHigh = _priceHigh;
  }
};

const renderHtmlElement = (
  information = {},
  _clickCallBack,
  _addToCardCallback
) => {
  const $productContainer = document.createElement("div");
  const $productInfoContainer = document.createElement("div");
  const $productThumbnailContainer = document.createElement("div");
  const $productThumbnail = document.createElement("img");
  const $productName = document.createElement("div");
  const $productSmallDescription = document.createElement("div");

  const $productSubContainer = document.createElement("div");
  const $productPrice = document.createElement("div");
  const $addToCartBtn = document.createElement("button");

  $productContainer.classList.add("productContainer");
  $productInfoContainer.classList.add("productInfoContainer");
  $productThumbnailContainer.classList.add("productThumbnailContainer");
  $productName.classList.add("productItemName");
  $productSmallDescription.classList.add("productSmallDescription");
  $productSubContainer.classList.add("productSubContainer");

  $productThumbnail.src = information.thumbnailUrl;
  $productName.innerHTML = information.brandName + " " + information.Name;
  $productSmallDescription.innerHTML = information.smallDescription;
  $productPrice.innerHTML = information.Price + "$";

  $productThumbnailContainer.appendChild($productThumbnail);
  $productSubContainer.appendChild($productPrice);
  $productSubContainer.appendChild($addToCartBtn);
  $addToCartBtn.innerHTML = "Add to cart";

  $productInfoContainer.appendChild($productThumbnailContainer);
  $productInfoContainer.appendChild($productName);
  $productInfoContainer.appendChild($productSmallDescription);

  $productContainer.appendChild($productInfoContainer);
  $productContainer.appendChild($productSubContainer);

  $productInfoContainer.addEventListener("click", () => {
    _clickCallBack(information.productID);
  });
  $addToCartBtn.addEventListener("click", () => {
    _addToCardCallback(information.productID);
  });

  return $productContainer;
};

const paginate = (rawData = [{}], $container) => {
  const $paginationContainer = document.createElement("div");
  $paginationContainer.classList.add("paginationContainer");
  let previous = null;
  const splicedData = [];
  while (rawData.length) {
    splicedData.push(rawData.splice(0, 12));
  }
  splicedData.map((item, index) => {
    const paginateItem = document.createElement("div");
    paginateItem.innerHTML = index + 1;
    paginateItem.classList.add("paginateItem");
    paginateItem.addEventListener("click", () => {
      $container.innerHTML = "";
      item.map((_item) => {
        $container.appendChild(_item);
      });
      $container.appendChild($paginationContainer);
      if (previous) {
        previous.classList.remove("paginateItem_active");
        window.scrollTo(0, 150);
      }
      paginateItem.classList.add("paginateItem_active");
      previous = paginateItem;
    });
    $paginationContainer.appendChild(paginateItem);
    if (paginateItem.innerHTML == 1) {
      paginateItem.click();
    }
  });
  $container.appendChild($paginationContainer);
};

const loadItems = (container, clickCallBack, addToCardCallback) => {
  container.innerHTML = "";
  let paginationData = [];
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: {
      functionname: "fetchAllProducts",
    },
    success: function (data) {
      data.map((item) => {
        const itemSearchString = item.brandName + " " + item.Name;
        if (
          itemSearchString
            .toLowerCase()
            .includes(filterParam.searchValue.toLowerCase()) &&
          (filterParam.catID == "" || item.catID == filterParam.catID) &&
          (filterParam.brandID.length == 0 ||
            filterParam.brandID.indexOf(item.brandID) > -1) &&
          (filterParam.priceLow == "" ||
            Number(item.Price) > Number(filterParam.priceLow)) &&
          (filterParam.priceHigh == "" ||
            Number(item.Price) < Number(filterParam.priceHigh))
        ) {
          paginationData.push(
            renderHtmlElement(item, clickCallBack, addToCardCallback)
          );
        }
      });
      paginate(paginationData, container);
    },
  });
};

export { loadItems, updateFilterParam };
