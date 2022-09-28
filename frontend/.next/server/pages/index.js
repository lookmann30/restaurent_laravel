"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\nfunction page() {\n    return null;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (page);\nasync function getServerSideProps(context) {\n    const { res  } = context;\n    res.writeHead(302, {\n        Location: \"/login\"\n    });\n    res.end();\n    return {\n        props: {}\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUVBLFNBQVNBLElBQUksR0FBRztJQUVkLE9BQU8sSUFBSTtDQUNaO0FBRUQsaUVBQWVBLElBQUksRUFBQztBQUViLGVBQWVDLGtCQUFrQixDQUFDQyxPQUFPLEVBQUU7SUFFaEQsTUFBTSxFQUFFQyxHQUFHLEdBQUUsR0FBR0QsT0FBTztJQUV2QkMsR0FBRyxDQUFDQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQUVDLFFBQVEsRUFBRSxRQUFRO0tBQUMsQ0FBQyxDQUFDO0lBQzFDRixHQUFHLENBQUNHLEdBQUcsRUFBRSxDQUFDO0lBRVYsT0FBTztRQUNMQyxLQUFLLEVBQUcsRUFBRTtLQUNYO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50X21hbmFnZW1lbnQvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbIlxuXG5mdW5jdGlvbiBwYWdlKCkge1xuXG4gIHJldHVybiBudWxsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoY29udGV4dCkge1xuXG4gIGNvbnN0IHsgcmVzIH0gPSBjb250ZXh0O1xuXG4gIHJlcy53cml0ZUhlYWQoMzAyLCB7IExvY2F0aW9uOiBcIi9sb2dpblwifSk7XG4gIHJlcy5lbmQoKTtcblxuICByZXR1cm4geyBcbiAgICBwcm9wcyA6IHt9XG4gIH1cbn0iXSwibmFtZXMiOlsicGFnZSIsImdldFNlcnZlclNpZGVQcm9wcyIsImNvbnRleHQiLCJyZXMiLCJ3cml0ZUhlYWQiLCJMb2NhdGlvbiIsImVuZCIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();