"use strict";
(() => {
var exports = {};
exports.id = 411;
exports.ids = [411];
exports.modules = {

/***/ 1544:
/***/ ((module) => {

module.exports = require("moralis");

/***/ }),

/***/ 6781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Moralis = (__webpack_require__(1544)["default"]);
// Moralis.start({
//     apiKey: process.env.MORALIS_KEY
// })
const getUserBalance = async (req, res)=>{
    const { userAddress  } = req.query;
    console.log("userAddress", userAddress);
    const user_balance = await Moralis.EvmApi.balance.getNativeBalance({
        chain: "80001",
        address: userAddress
    });
    const json_user_balance = (user_balance.raw.balance / 1e18).toFixed(2);
    const matic_price = await Moralis.EvmApi.token.getTokenPrice({
        address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
    });
    const json_matic_price = matic_price.raw.usdPrice;
    const dollar_value = (json_user_balance * json_matic_price).toFixed(2);
    return res.status(200).json({
        balance: json_user_balance,
        dollar_value
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getUserBalance);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6781));
module.exports = __webpack_exports__;

})();