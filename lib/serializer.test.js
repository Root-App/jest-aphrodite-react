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
var _1 = require('.');
var testUtil_1 = require('./testUtil');
expect.addSnapshotSerializer(_1.aphroditeSerializer);
var Wrapper = function(props) {
  var styles = aphrodite_1.StyleSheet.create({
    wrapper: {
      background: 'papayawhip',
      padding: '4em',
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
test('Wrapper', function() {
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
test('when the root element does not have styles', function() {
  testUtil_1.checkSnapshotForEachMethod(
    React.createElement('div', null, React.createElement(Wrapper, null)),
  );
});
test("doesn't fail for nodes without styles", function() {
  testUtil_1.checkSnapshotForEachMethod(React.createElement('div', null));
});
test('joins multiple classes', function() {
  var styles = aphrodite_1.StyleSheet.create({
    first: { color: 'red' },
    second: { backgroundColor: 'black' },
    third: { color: 'blue' },
  });
  testUtil_1.checkSnapshotForEachMethod(
    React.createElement('div', {
      className: aphrodite_1.css(styles.first, styles.second, styles.third),
    }),
  );
});
test('supports mediaQueries', function() {
  var styles = aphrodite_1.StyleSheet.create({
    root: {
      color: 'red',
      '@media(min-width: 200px)': {
        color: 'black',
      },
    },
  });
  testUtil_1.checkSnapshotForEachMethod(
    React.createElement('div', { className: aphrodite_1.css(styles.root) }),
  );
});
test('supports pseudo selectors', function() {
  var styles = aphrodite_1.StyleSheet.create({
    root: {
      color: 'red',
      ':hover': {
        color: 'green',
      },
      '@media(min-width: 200px)': {
        ':hover': {
          color: 'black',
        },
      },
    },
  });
  testUtil_1.checkSnapshotForEachMethod(
    React.createElement('div', { className: aphrodite_1.css(styles.root) }),
  );
});
