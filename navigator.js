import { Console } from "./Screens/Console.js";
import { Login } from "./Screens/Login.js";
import { ProductDisplay } from "./Screens/ProductDisplay.js";
import { Register } from "./Screens/Register.js";
import { Intro } from "./Screens/Intro.js";
import { ProductDetail } from "./Screens/ProductDetail.js";
import { Cart } from "./Screens/Cart.js";
import { User } from "./Screens/User.js";
alertify.set("notifier", "position", "top-left");

const changeScreen = (screen) => {
  history.pushState(undefined, undefined, `?screen=${screen}`);
};

const getUrlParam = (key) => {
  const fullUrlParam = window.location.search.substring(1);
  const urlParamsArr = fullUrlParam.split("&");

  for (let i = 0; i < urlParamsArr.length; i++) {
    const paramKeyValuePair = urlParamsArr[i].split("=");
    if (paramKeyValuePair[0] == key) {
      return paramKeyValuePair[1];
    }
  }
  return null;
};

if (getUrlParam("screen") == null) {
  changeScreen("productDisplayScreen");
}

const registerScreen = new Register();
const loginScreen = new Login();
const productDisplayScreen = new ProductDisplay();
const consoleScreen = new Console();
const introScreen = new Intro();
const productDetailScreen = new ProductDetail();
const cartScreen = new Cart();
const userScreen = new User();

const stack = {
  registerScreen: registerScreen,
  loginScreen: loginScreen,
  productDisplayScreen: productDisplayScreen,
  consoleScreen: consoleScreen,
  introScreen: introScreen,
  productDetailScreen: productDetailScreen,
  cartScreen: cartScreen,
  userScreen: userScreen,
};

let currentScreen = null;

const myApp = document.getElementById("myApp");

const navigate = (screen, routeParam = null) => {
  if (currentScreen) {
    myApp.removeChild(currentScreen);
  }
  if (stack[screen]) {
    if (routeParam) {
      currentScreen = myApp.appendChild(stack[screen].render(routeParam));
    } else {
      currentScreen = myApp.appendChild(stack[screen].render());
    }
  } else {
    alert("Screen not valid!");
  }
};

navigate(getUrlParam("screen"));
window.addEventListener("popstate", () => {
  navigate(getUrlParam("screen"));
});

// for testing purpose
// var getUrlParameter = function getUrlParameter(sParam) {
//   var sPageURL = window.location.search.substring(1),
//       sURLVariables = sPageURL.split('&'),
//       sParameterName,
//       i;

//   for (i = 0; i < sURLVariables.length; i++) {
//       sParameterName = sURLVariables[i].split('=');

//       if (sParameterName[0] === sParam) {
//           return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
//       }
//   }
//   return false;
// };

// window.onload = () => {
//   jQuery.ajax({
//     type: "POST",
//     url: "action.php",
//     dataType: "json",
//     data: { functionname: "fetchSingleProduct", productID: "40" },
//     success: function (data) {
//       console.log( typeof data);
//     },
//   });
// };

export { navigate, getUrlParam, changeScreen };
