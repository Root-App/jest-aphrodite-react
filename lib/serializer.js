'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var cssUtil_1 = require('./cssUtil');
var reactUtils_1 = require('./reactUtils');
var replaceClassNames_1 = require('./replaceClassNames');
function createSerializer(getStyleSheetTestUtils, _a) {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.removeVendorPrefixes,
    removeVendorPrefixes = _c === void 0 ? false : _c,
    classNameReplacer = _b.classNameReplacer;
  function test(val) {
    return (
      val &&
      !val.withStyles &&
      (val.$$typeof === Symbol.for('react.test.json') ||
        (val instanceof HTMLElement && !isBeingSerialized(val)))
    );
  }
  function print(val, printer) {
    var nodes = reactUtils_1.getNodes(val);
    nodes.forEach(function(node) {
      return (node.withStyles = true);
    });
    var selectors = cssUtil_1.getSelectors(nodes);
    var styles = cssUtil_1.getStyles(
      selectors,
      getStyleSheetTestUtils,
      removeVendorPrefixes,
    );
    var printedVal = printer(val);
    if (styles) {
      return replaceClassNames_1.replaceClassNames(
        selectors,
        styles,
        printedVal,
        classNameReplacer,
      );
    } else {
      return printedVal;
    }
  }
  return {
    test: test,
    print: print,
  };
}
exports.createSerializer = createSerializer;
function isBeingSerialized(node) {
  var currentNode = node;
  while (currentNode) {
    if (currentNode.withStyles) {
      return true;
    }
    currentNode = currentNode.parentNode;
  }
  return false;
}
// doing this to make it easier for users to mock things
// like switching between development mode and whatnot.
var getAphroditeStyleSheetTestUtils = function(useImportant) {
  return function() {
    return require('aphrodite' + (useImportant ? '' : '/no-important'))
      .StyleSheetTestUtils;
  };
};
exports.serializer = function(useImportant) {
  return createSerializer(getAphroditeStyleSheetTestUtils(useImportant));
};
