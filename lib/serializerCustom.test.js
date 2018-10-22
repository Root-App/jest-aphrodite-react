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
var aphrodite_1 = require('aphrodite');
var React = require('react');
var serializer_1 = require('./serializer');
var testUtil_1 = require('./testUtil');
expect.addSnapshotSerializer(
  serializer_1.createSerializer(
    function() {
      return aphrodite_1.StyleSheetTestUtils;
    },
    { removeVendorPrefixes: true },
  ),
);
var Wrapper = function(props) {
  var styles = aphrodite_1.StyleSheet.create({
    wrapper: {
      display: 'flex',
      transform: 'translate(0, 0)',
    },
  });
  return React.createElement(
    'section',
    __assign({ className: aphrodite_1.css(styles.wrapper) }, props),
  );
};
var Title = function(props) {
  var styles = aphrodite_1.StyleSheet.create({
    title: {
      color: 'palevioletred',
      fontSize: '1.5em',
      textAlign: 'center',
    },
  });
  return React.createElement(
    'h1',
    __assign({ className: aphrodite_1.css(styles.title) }, props),
  );
};
test('removes vendor prefixed rules', function() {
  testUtil_1.checkSnapshotForEachMethod(
    React.createElement(
      Wrapper,
      null,
      React.createElement(
        Title,
        null,
        'Hello World, this is my first component styled with aphrodite!',
      ),
    ),
  );
});
test('removes vendor prefixes inside mediaQueries', function() {
  var styles = aphrodite_1.StyleSheet.create({
    root: {
      '@media(min-width: 200px)': {
        transform: 'translate(0, 0)',
      },
      '@supports(display: grid)': {
        display: 'flex',
      },
    },
  });
  testUtil_1.checkSnapshotForEachMethod(
    React.createElement('div', { className: aphrodite_1.css(styles.root) }),
  );
});
