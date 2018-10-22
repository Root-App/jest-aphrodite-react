'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var aphroditeMatcher = /(_[\w\d]+(\-o_O\-)*)/gi;
var defaultClassNameReplacer = function(className) {
  return className
    .replace('.', '')
    .replace(aphroditeMatcher, function(_match, _hash, sep) {
      return sep ? '-' : '';
    });
};
exports.replaceClassNames = function(selectors, styles, code, replacer) {
  if (replacer === void 0) {
    replacer = defaultClassNameReplacer;
  }
  var index = 0;
  return selectors.reduce(function(acc, className) {
    if (styles.includes(className)) {
      var escapedRegex = new RegExp(
        className.replace('.', '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'g',
      );
      return acc.replace(escapedRegex, replacer(className, index++));
    }
    return acc;
  }, styles + '\n\n' + code);
};
