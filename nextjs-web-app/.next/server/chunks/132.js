"use strict";
exports.id = 132;
exports.ids = [132];
exports.modules = {

/***/ 4132:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ButtonColored)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8003);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4661);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_moralis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6921);
/* harmony import */ var react_moralis__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_moralis__WEBPACK_IMPORTED_MODULE_2__);




const coloredShades = _index_js__WEBPACK_IMPORTED_MODULE_3__.C`
    :after {
        background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_3__.g)("light", 90)};
    }

    :hover {
        :after {
            background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_3__.g)("light", 70)};
        }
    }

    :active {
        :after {
            background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_3__.g)("light", 50)};
        }
    }
`;
const coloredRed = _index_js__WEBPACK_IMPORTED_MODULE_3__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.red};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.red};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.red};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.red};
    }

    ${coloredShades}
`;
const coloredGreen = _index_js__WEBPACK_IMPORTED_MODULE_3__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.green};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.green};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.green};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.green};
    }

    ${coloredShades}
`;
const coloredBlue = _index_js__WEBPACK_IMPORTED_MODULE_3__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.blue};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.blue};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.blue};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.blue};
    }

    ${coloredShades}
`;
const coloredYellow = _index_js__WEBPACK_IMPORTED_MODULE_3__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.yellow};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.yellow};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.yellow};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_3__.c.yellow};
    }

    ${coloredShades}
`;
const getColored = (color2) => {
  switch (color2) {
    case "red":
      return coloredRed;
    case "green":
      return coloredGreen;
    case "blue":
      return coloredBlue;
    case "yellow":
      return coloredYellow;
    default:
      return;
  }
};
const ButtonColoredStyled$1 = (0,_index_js__WEBPACK_IMPORTED_MODULE_3__.s)(_index_js__WEBPACK_IMPORTED_MODULE_3__.B)`
    :after {
        background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_3__.g)("dark", 0)};
        content: '';
        display: block;
        height: 100%;
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        transition: all 0.3s ease;
        width: 100%;
        z-index: 0;
    }

    ${({
  color: color2
}) => color2 && getColored(color2)}
`;
var styles = {
  ButtonColoredStyled: ButtonColoredStyled$1
};
const {
  ButtonColoredStyled
} = styles;
const ButtonColored = ({
  color: color2,
  ...props
}) => /* @__PURE__ */ (0,_index_js__WEBPACK_IMPORTED_MODULE_3__.j)(ButtonColoredStyled, {
  color: color2,
  ...props
});



/***/ })

};
;