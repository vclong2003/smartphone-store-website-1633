class ProductDetail {
  $container;

  $topBar;
  $backBtn;

  $productDetailContainer;

  $header;

  $briefContainer;
  $leftContainer;
  $rightContainer;

  $thumbnailImg;
  $nameContainer;
  $smallDesContainer;

  $priceAndBtnContainer;
  $price;
  $addTocardBtn;

  $descriptionContainer;
  $img;
  $text;

  constructor(id) {
    this.$container = document.createElement("div");
    this.$topBar = document.createElement("div");
    this.$backBtn = document.createElement("img");
    this.$productDetailContainer = document.createElement("div");
    this.$header = document.createElement("div");
    this.$briefContainer = document.createElement("div");
    this.$leftContainer = document.createElement("div");
    this.$rightContainer = document.createElement("div");
    this.$thumbnailImg = document.createElement("img");
    this.$nameContainer = document.createElement("div");
    this.$smallDesContainer = document.createElement("div");
    this.$priceAndBtnContainer = document.createElemente("div");
    this.$price = document.createElement("div");
    this.$addTocardBtn = document.createElement("button");
    this.$descriptionContainer = document.createElement("div");
    this.$img = document.createElement("img");
    this.$text = document.createElement("div");

    this.$container.classList.add("productDetailScreen");
    this.$topBar.classList.add("productDetailTopBar");
    this.$backBtn.classList.add("productDetailBackBtn");
    this.$productDetailContainer.classList.add("productDetailContainer");
    this.$header.classList.add("productDetailContainer_header");
    this.$briefContainer.classList.add("productDetail_briefContainer");
    this.$leftContainer.classList.add("productDetail_leftContainer");
    this.$rightContainer.classList.add("productDetail_righContainer");
    this.$nameContainer.classList.add("productDetail_nameContainer");
    this.$smallDesContainer.classList.add("productDetail_smallDesContainer");
    this.$priceAndBtnContainer.classList.add(
      "productDetail_priceAndBtnContainer"
    );
    this.$price.classList.add("productDetail_price");
    this.$addTocardBtn.classList.add("productDetail_addTocardBtn");
    this.$descriptionContainer.classList.add(
      "productDetail_descriptionContainer"
    );
    this.$text.classList.add("productDetail_text");

    this.$header.innerHTML = "Category: sdjfsd > Brand: skjdmhjdsfdsd";
    this.$nameContainer.innerHTML = "Ghgsd shdf shdf 4";
    this.$smallDesContainer.innerHTML =
      "dhfjds sjdfh hjfd hsjk hskjdhgdf kjdfhkgjfd jdfkgjhsf gjdfkhgjs hgjsd fkjgsdhfkjs hgjks hgkjfd";
    this.$price.innerHTML = "1200.00";
    this.$addTocardBtn.innerHTML = "Add to card";
    this.$text.innerHTML =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mi massa, fringilla at condimentum ut, auctor eu ipsum. Aenean at mauris at magna placerat dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin iaculis tortor sodales arcu aliquam, et finibus erat euismod. Vivamus tempus tincidunt nibh, nec mattis diam mollis id. Curabitur malesuada consequat purus eget varius. Nullam convallis mauris at turpis dapibus, id feugiat lectus tincidunt.Quisque ullamcorper libero vitae velit mattis, sed molestie est sollicitudin. Sed viverra est vel vehicula dapibus. Integer nec suscipit dolor, a eleifend dui. Vivamus egestas felis libero, ut interdum urna posuere ac. Nulla vitae sem mi. Suspendisse fermentum viverra enim eget dignissim. Vestibulum gravida laoreet lacus, non egestas elit auctor quis. Donec pretium tempus erat, faucibus maximus nisi vulputate vel. Nam mollis arcu vel urna facilisis viverra. Vestibulum ac enim euismod, consectetur velit id, ullamcorper enim.Sed et sagittis sapien. Sed finibus, nisl ut aliquet finibus, dui velit rhoncus dolor, non pretium lacus ex et ipsum. Duis malesuada risus eget felis porta rutrum. Nulla sed nisi enim. Aliquam gravida, erat vel tincidunt feugiat, nisi nulla vehicula nunc, sit amet laoreet erat sem ac ipsum. Fusce massa elit, lacinia eget pellentesque et, rutrum eu tortor. Duis nunc purus, hendrerit ac urna at, fringilla sodales metus.Aliquam non diam turpis. Ut eu nibh massa. Nullam scelerisque posuere metus non consequat. Maecenas hendrerit felis non risus malesuada, ac interdum elit volutpat. Nullam tempor eros sit amet eros tristique, nec pulvinar erat hendrerit. Donec congue nisl augue, quis congue libero tempus nec. Aenean leo est, commodo quis tellus ac, fermentum sagittis nunc. Vivamus pharetra quis justo id suscipit. Ut nec ligula purus. Proin sodales nisi nec eros tincidunt, eget iaculis ipsum tincidunt. Suspendisse potenti. Phasellus dui mauris, consequat dictum nulla id, porttitor tempus sapien. Nam quis vehicula neque.";
  }
  render() {
    this.$topBar.appendChild(this.$backBtn);

    this.$priceAndBtnContainer.appendChild(this.$price);
    this.$priceAndBtnContainer.appendChild(this.$addTocardBtn);

    this.$leftContainer.appendChild(this.$thumbnailImg);
    this.$rightContainer.appendChild(this.$nameContainer);
    this.$rightContainer.appendChild(this.$smallDesContainer);
    this.$rightContainer.appendChild(this.$priceAndBtnContainer);

    this.$briefContainer.appendChild(this.$leftContainer);
    this.$briefContainer.appendChild(this.$rightContainer);

    this.$descriptionContainer.appendChild(this.$img);
    this.$descriptionContainer.appendChild(this.$text);

    this.$productDetailContainer.appendChild(this.$briefContainer);
    this.$productDetailContainer.appendChild(this.$descriptionContainer);

    this.$container.appendChild(this.$topBar);
    this.$container.appendChild(this.$descriptionContainer);
  }
}

export { ProductDetail };
