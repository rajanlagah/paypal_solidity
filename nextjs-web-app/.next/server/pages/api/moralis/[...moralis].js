"use strict";
(() => {
var exports = {};
exports.id = 128;
exports.ids = [128];
exports.modules = {

/***/ 739:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _moralis_)
});

;// CONCATENATED MODULE: external "@moralisweb3/next"
const next_namespaceObject = require("@moralisweb3/next");
;// CONCATENATED MODULE: ./pages/api/moralis/[...moralis].js

/* harmony default export */ const _moralis_ = ((0,next_namespaceObject.MoralisNextApi)({
    apiKey: process.env.MORALIS_API_KEY
}));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(739));
module.exports = __webpack_exports__;

})();