import { Console } from "./Screens/Console.js";
import { Login } from "./Screens/Login.js";
import { ProductDisplay } from "./Screens/ProductDisplay.js";
import { Register } from "./Screens/Register.js";
import { Intro } from "./Screens/Intro.js";
alertify.set("notifier", "position", "top-left");

const registerScreen = new Register();
const loginScreen = new Login();
const productDisplayScreen = new ProductDisplay();
const consoleScreen = new Console();
const introScreen = new Intro();

const stack = {
  registerScreen: registerScreen,
  loginScreen: loginScreen,
  productDisplayScreen: productDisplayScreen,
  consoleScreen: consoleScreen,
  introScreen: introScreen,
};

let currentScreen = null;

const myApp = document.getElementById("myApp");

const navigate = (screen) => {
  if (currentScreen) {
    myApp.removeChild(currentScreen);
  }
  if (stack[screen]) {
    currentScreen = myApp.appendChild(stack[screen].render());
  } else {
    alert("Screen not valid!");
  }
};

navigate("productDisplayScreen");

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
//       query: "SELECT * FROM `brand`",
//     },
//     success: function (data) {
//       console.log(data);
//     },
//   });
// };

export { navigate };
