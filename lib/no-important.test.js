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
var no_important_1 = require('aphrodite/no-important');
var React = require('react');
var no_important_2 = require('./no-important');
var testUtil_1 = require('./testUtil');
expect.addSnapshotSerializer(no_important_2.aphroditeSerializer);
var Wrapper = function(props) {
  var styles = no_important_1.StyleSheet.create({
    wrapper: {
      background: 'papayawhip',
      padding: '4em',
    },
  });
  return React.createElement(
    'section',
    __assign({ className: no_important_1.css(styles.wrapper) }, props),
  );
};
var Title = function(props) {
  var styles = no_important_1.StyleSheet.create({
    title: {
      color: 'palevioletred',
      fontSize: '1.5em',
      textAlign: 'center',
    },
  });
  return React.createElement(
    'h1',
    __assign({ className: no_important_1.css(styles.title) }, props),
  );
};
test('no-important', function() {
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
test('no-important exports match default package exports', function() {
  var defaultExports = require('.');
  var noImportantExports = require('./no-important');
  expect(Object.keys(defaultExports)).toEqual(Object.keys(noImportantExports));
});
