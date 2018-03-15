(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tree-node-data", [], factory);
	else if(typeof exports === 'object')
		exports["tree-node-data"] = factory();
	else
		root["tree-node-data"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignNodeData = __webpack_require__(1);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_assignNodeData).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.assignNodeData = assignNodeData;

var _nodeUtils = __webpack_require__(2);

var nodeUtils = _interopRequireWildcard(_nodeUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getSiblingData = function getSiblingData(nodes) {
  return nodes.map(function (node, index) {
    return {
      prevNode: nodes[index - 1] || null,
      currentNode: node,
      nextNode: nodes[index + 1] || null
    };
  });
};

var transform = function transform(ancestorNodes, keyField, childrenField) {
  return function (siblingData) {
    var prevNode = siblingData.prevNode,
        currentNode = siblingData.currentNode,
        nextNode = siblingData.nextNode;

    var parentNode = ancestorNodes && ancestorNodes[ancestorNodes.length - 1] || null;

    var parent = null;
    var siblingIndex = null;
    var prev = null;
    var next = null;
    var ancestors = [];

    var prevSibling = prevNode ? prevNode[keyField] : null;
    var nextSibling = nextNode ? nextNode[keyField] : null;

    if (parentNode) {
      parent = parentNode[keyField];
      ancestors = parentNode.nodeData.ancestors.concat([parent]);
      siblingIndex = parentNode[childrenField].indexOf(currentNode);
    }

    if (nodeUtils.hasChildren(currentNode, childrenField)) {
      next = currentNode[childrenField][0][keyField];
    } else if (nextSibling) {
      next = nextSibling;
    } else {
      var eligibleAncestors = ancestorNodes.filter(function (i) {
        return !!i.nodeData.nextSibling;
      }).map(function (i) {
        return i.nodeData.nextSibling;
      });
      next = eligibleAncestors.length > 0 ? eligibleAncestors.pop() : null;
    }

    if (prevNode && nodeUtils.hasChildren(prevNode, childrenField)) {
      var cousins = prevNode[childrenField];
      var lastCousin = cousins[cousins.length - 1];
      prev = lastCousin[keyField];
    } else if (prevSibling) {
      prev = prevSibling;
    } else {
      prev = parentNode && parentNode[keyField];
    }

    var numDescendants = nodeUtils.countDescendants(currentNode, childrenField);
    var numChildren = nodeUtils.countChildren(currentNode, childrenField);
    var nodeData = {
      parent: parent, prev: prev, prevSibling: prevSibling, next: next, nextSibling: nextSibling, siblingIndex: siblingIndex, ancestors: ancestors, numDescendants: numDescendants, numChildren: numChildren
    };

    var transformedNode = _extends({}, currentNode, { nodeData: nodeData });

    if (nodeUtils.hasChildren(currentNode, childrenField)) {
      var _siblingData = getSiblingData(currentNode[childrenField]);
      var transformFunc = transform([].concat(_toConsumableArray(ancestorNodes), [transformedNode]), keyField, childrenField);
      transformedNode[childrenField] = _siblingData.map(transformFunc);
    }

    return transformedNode;
  };
};

function assignNodeData(nodes, config) {
  var keyField = config && config.keyField || 'key';
  var childrenField = config && config.childrenField || 'children';

  var siblingData = getSiblingData(nodes);
  var transformFunc = transform([], keyField, childrenField);

  return siblingData.map(transformFunc);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasChildren = hasChildren;
exports.isBranch = isBranch;
function hasChildren(node) {
  var childrenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

  return !!node[childrenKey] && node[childrenKey].length > 0;
}

function isBranch(node) {
  var childrenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

  return !!node[childrenKey] && node[childrenKey].length >= 0;
}

var countDescendants = exports.countDescendants = function countDescendants(node) {
  var childrenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

  var aggregateFun = function aggregateFun(agg, node) {
    return isBranch(node, childrenKey) ? agg + countDescendants(node, childrenKey) : agg + 1;
  };

  return isBranch(node, childrenKey) ? node[childrenKey].reduce(aggregateFun, 0) : 0;
};

var countChildren = exports.countChildren = function countChildren(node) {
  var childrenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  return isBranch(node, childrenKey) ? node[childrenKey].length : 0;
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=tree-node-data.js.map