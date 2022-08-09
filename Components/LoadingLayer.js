class LoadingLayer {
  $imgContainer;
  $img;
  constructor() {
    this.$imgContainer = document.createElement("div");
    this.$imgContainer.id = "loadingLayer";

    this.$img = document.createElement("img");
    this.$img.src = "./Assets/Img/ripple_loding.svg";
  }
  render() {
    this.$imgContainer.appendChild(this.$img);
    return this.$imgContainer;
  }
}
export { LoadingLayer };
