import { Console } from "./Screens/Console.js";
import { Login } from "./Screens/Login.js";
import { ProductDisplay } from "./Screens/ProductDisplay.js";
import { Register } from "./Screens/Register.js";
import { Intro } from "./Screens/Intro.js";
import { ProductDetail } from "./Screens/ProductDetail.js";
alertify.set("notifier", "position", "top-left");

const registerScreen = new Register();
const loginScreen = new Login();
const productDisplayScreen = new ProductDisplay();
const consoleScreen = new Console();
const introScreen = new Intro();
const productDetailScreen = new ProductDetail();

const stack = {
  registerScreen: registerScreen,
  loginScreen: loginScreen,
  productDisplayScreen: productDisplayScreen,
  consoleScreen: consoleScreen,
  introScreen: introScreen,
  productDetailScreen: productDetailScreen,
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

navigate("consoleScreen");

// alertify.prompt(
//   "",
//   "Enter category name",
//   "test",
//   function (evt, value) {
//     alertify.success("You entered: " + value);
//   },
//   function () {
//     alertify.error("Cancel");
//   }
// );

// for testing purpose
// window.onload = () => {
//   jQuery.ajax({
//     type: "POST",
//     url: "action.php",
//     dataType: "json",
//     data: {
//       functionname: "getData",
//       query: "SELECT COUNT(*) FROM `product` WHERE `catID` = 2;",
//     },
//     success: function (data) {
//       console.log(data);
//     },
//   });
// };

export { navigate };
