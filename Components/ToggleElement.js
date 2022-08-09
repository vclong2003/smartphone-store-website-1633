const toggleElement = (element) => {
  if (element.style.visibility == "unset") {
    element.style.visibility = "hidden";
  } else {
    element.style.visibility = "unset";
  }
};

export { toggleElement };
