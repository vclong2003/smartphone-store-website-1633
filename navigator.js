import { Console } from "./Screens/Console.js";
import { Login } from "./Screens/Login.js";
import { ProductDisplay } from "./Screens/ProductDisplay.js";
import { Register } from "./Screens/Register.js";
import { Intro } from "./Screens/Intro.js";
import { ProductDetail } from "./Screens/ProductDetail.js";
import { Cart } from "./Screens/Cart.js";
alertify.set("notifier", "position", "top-left");

const registerScreen = new Register();
const loginScreen = new Login();
const productDisplayScreen = new ProductDisplay();
const consoleScreen = new Console();
const introScreen = new Intro();
const productDetailScreen = new ProductDetail();
const cartScreen = new Cart();

const stack = {
  registerScreen: registerScreen,
  loginScreen: loginScreen,
  productDisplayScreen: productDisplayScreen,
  consoleScreen: consoleScreen,
  introScreen: introScreen,
  productDetailScreen: productDetailScreen,
  cartScreen: cartScreen,
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

navigate("productDisplayScreen");

// for testing purpose
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

export { navigate };
