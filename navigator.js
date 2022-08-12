import { Console } from "./Screens/Console.js";
import { Login } from "./Screens/Login.js";
import { ProductDisplay } from "./Screens/ProductDisplay.js";
import { Register } from "./Screens/Register.js";
import { Intro } from "./Screens/Intro.js";

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

navigate("consoleScreen");

window.onload = () => {
  // for testing purpose
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
  const test =
    encodeURIComponent(`【Smoothest Mobile Screen】Gaming Phone with a 165Hz refresh rate, this 6.8” AMOLED screen delivers beautiful HD+ visuals at up to 165 frames per second. With a 720Hz touch sampling rate for multi fingers, the Cell Phone delivers ultra-fast touch and precise response, giving you a serious competitive edge while gaming. The 5G Smartphone have also Under-display Fingerprint Sensor and SGS Eye Care Certification.
  【Latest Chip and Larger Storage】The Gaming Smartphone has the latest Qualcomm Snapdragon 8 Gen 1. Play your favorite games with ease with the raw power of the new CPU clocking in at nearly 3G Hz and enjoy Triple-A graphics thanks to the fast rendering power of the GPU. 18GB RAM + 256GB ROM provides not only a fun gaming experience and effects, also large storage space for game downloads.
  【Ultra HD AI Quad Camera】Rear Camera are 64-Megapixel (F1.79) + 8-Megapixel(F2.2) + 2-Megapixel(F2.4) and support 8K resolution at 30fps, 4K at 60fps/30fps, 1080P at 60fps/30fps, 720P at 30fps. The Wide Angle Respectively are 78.3°+120°+78°. Front Camera is 8-Megapixel and support 1080P/720P at 30fps video recording. Amazing realistic colors and contrast, dynamic tone mapping.
  【Multi-Dimensional Cooling System】The Gaming Phone incorporates new aerospace-grade phase change materials (PCM) . Heat can be stored inside this material and released slowly so you feel less heat from the phone while playing, making it more comfortable to hold the phone. The High-Speed Built-In Turbofan accelerates heat dissipation and the fan noise is as quiet as a whisper.
  【5G & WIFI 6E Connection and 4500mAh Battery】5G is SA+NSA dual mode and supports all key regions up to 3.0 Gbps uploads, up to 7.5 Gbps downloads. WIFI 6E is up to 3.5Gbps. These bring mobile gaming to a whole new level. Download the latest games and videos in gigabit speeds with ease to show off your smooth, low latency experience. The Cell Phone certified 30W charger, charge 0-100% in 65 minutes and supports up to 65W fast charging.
  【Supported Network Frequency Bands】REDMAGIC 7 Smartphone supports below frequency bands. IMPORTANT NOTES: Please Confirm Your SIM Card's frequency bands are included in below Supported Bands before Order. 5G Network is NSA: n41/n78/n77/n38 and SA: n41/n78/n1/n77（3600M-4100M）/n28A/n3/n7/n8/n20/n5. 2G+3G+4G Network are GSM 2/3/5/8; CDMA/EVDO: BC0/BC1; WCDMA: B1/2/4/5/6/8/19; TD-LTE: B34/B38/39/40/41; FDD-LTE: B1/B2/B3/B4/B5/B7/B8/B12/B17/B18/B19/B20/B26/B28A/B66.
  `);
  //console.log(test);
  //console.log(decodeURIComponent(test));
  alertify.set("notifier", "position", "top-left");
  jQuery.ajax({
    type: "POST",
    url: "action.php",
    dataType: "json",
    data: { functionname: "getData", query: "SELECT * FROM `category`" },
    success: function (data) {
      console.log(data);
    },
  });
};

export { navigate };
