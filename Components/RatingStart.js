const ratingStar = (star = 0) => {
  const $container = document.createElement("div");
  for (let i = 1; i <= 5; i++) {
    const $star = document.createElement("span");
    $star.classList.add("fa");
    $star.classList.add("fa-star");
    if (i <= star) {
      $star.classList.add("checked");
    }
    $container.appendChild($star);
  }
  return $container;
};

export { ratingStar };

/*
<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
*/
