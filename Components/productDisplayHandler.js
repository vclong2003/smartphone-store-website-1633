const renderItems = (
  data = [{}],
  container = document.createElement("div"),
  itemClickCallback,
  addToCardCallback
) => {
  this.$paginationContainer.innerHTML = "";
  let previous = null;
  const splicedData = [];
  while (rawData.length) {
    splicedData.push(rawData.splice(0, 12));
  }
  splicedData.map((item, index) => {
    const paginateItem = document.createElement("div");
    paginateItem.innerHTML = index + 1;
    paginateItem.id = index;
    paginateItem.classList.add("paginateItem");
    paginateItem.addEventListener("click", () => {
      this.$rightPanel.innerHTML = "";
      item.map((_item) => {
        this.$rightPanel.appendChild(_item);
      });
      this.$rightPanel.appendChild(this.$paginationContainer);
      if (previous) {
        previous.classList.remove("paginateItem_active");
        window.scrollTo(0, 150);
      }
      paginateItem.classList.add("paginateItem_active");
      previous = paginateItem;
    });
    this.$paginationContainer.appendChild(paginateItem);
    if (paginateItem.id == 0) {
      paginateItem.click();
    }
  });
  this.$rightPanel.appendChild(this.$paginationContainer);
};
