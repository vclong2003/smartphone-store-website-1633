class Console {
  $container;

  $leftPanel;
  $rightPanel;

  $orderActionTabContainer;
  $pendingApprovalOrders;
  $onGoingOrder;
  $cancelledOrders;

  $addTabContainer;
  $addCategoryTab;
  $addBrandTab;
  $addProductTab;

  constructor() {
    this.$container = document.createElement("div");

    this.$leftPanel = document.createElement("div");
    this.$rightPanel = document.createElement("div");

    this.$orderActionTabContainer = document.createElement("div");
  }
  render() {
    return this.$container;
  }
}

export { Console };
