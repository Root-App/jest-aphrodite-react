'use strict';
var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
var css = require('css');
var css_in_js_utils_1 = require('css-in-js-utils');
function isCSSDeclaration(decl) {
  return decl.type === 'declaration';
}
function isCSSRule(rule) {
  return rule.type === 'rule';
}
function isCSSMediaQuery(rule) {
  return rule.type === 'media';
}
function isCSSSupportsQuery(rule) {
  return rule.type === 'supports';
}
function getSelectors(nodes) {
  return nodes.reduce(function(selectors, node) {
    if (node instanceof HTMLElement) {
      return getSelectorsFromDOM(selectors, node);
    } else {
      var props = typeof node.props === 'function' ? node.props() : node.props;
      return selectors.concat(getSelectorsFromProps(props));
    }
  }, []);
}
exports.getSelectors = getSelectors;
function getSelectorsFromProps(props) {
  if (props === void 0) {
    props = {};
  }
  var className = props.className || props.class;
  if (className) {
    return className
      .toString()
      .split(' ')
      .map(function(cn) {
        return '.' + cn;
      });
  }
  return [];
}
function getSelectorsFromDOM(selectors, node) {
  var allChildren = node.querySelectorAll('*');
  var nodeSelectors = Array.from(node.classList).map(function(cn) {
    return '.' + cn;
  });
  selectors = Array.from(allChildren).reduce(function(s, c) {
    s.push.apply(
      s,
      Array.from(c.classList).map(function(cn) {
        return '.' + cn;
      }),
    );
    return s;
  }, selectors);
  return nodeSelectors.concat(selectors);
}
function filterPrefixedDelcartions(rule) {
  return __assign({}, rule, {
    declarations: rule.declarations.filter(function(declaration) {
      if (isCSSDeclaration(declaration)) {
        return (
          !css_in_js_utils_1.isPrefixedValue(declaration.value) &&
          !css_in_js_utils_1.isPrefixedValue(declaration.property)
        );
      }
    }),
  });
}
function ruleMatchesSelectors(rule, nodeSelectors) {
  return rule.selectors.some(function(selector) {
    var baseSelector = selector.split(/:| |\./).filter(function(s) {
      return !!s;
    })[0];
    return nodeSelectors.some(function(sel) {
      return sel === baseSelector || sel === '.' + baseSelector;
    });
  });
}
function filterRules(nodes, nodeSelectors, removeVendorPrefixes) {
  return nodes.reduce(function(acc, node) {
    if (isCSSRule(node)) {
      var matches = ruleMatchesSelectors(node, nodeSelectors);
      if (matches) {
        return removeVendorPrefixes
          ? acc.concat([filterPrefixedDelcartions(node)])
          : acc.concat([node]);
      }
      return acc;
    }
    if (isCSSMediaQuery(node) || isCSSSupportsQuery(node)) {
      node.rules = filterRules(node.rules, nodeSelectors, removeVendorPrefixes);
      return node.rules.length ? acc.concat([node]) : acc;
    }
    return acc;
  }, []);
}
function getStylesAst(nodeSelectors, getTestUtils, removeVendorPrefixes) {
  var styles = getTestUtils()
    .getBufferedStyles()
    .join('');
  var ast = css.parse(styles);
  ast.stylesheet.rules = filterRules(
    ast.stylesheet.rules,
    nodeSelectors,
    removeVendorPrefixes,
  );
  return ast;
}
function getStyles(nodeSelectors, getTestUtils, removeVendorPrefixes) {
  var ast = getStylesAst(nodeSelectors, getTestUtils, removeVendorPrefixes);
  return css.stringify(ast);
}
exports.getStyles = getStyles;
