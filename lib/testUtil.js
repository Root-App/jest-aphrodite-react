'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var enzyme = require('enzyme');
var enzyme_to_json_1 = require('enzyme-to-json');
var reactTestRenderer = require('react-test-renderer');
var react_testing_library_1 = require('react-testing-library');
function checkSnapshotForEachMethod(ui) {
  var rtrResult = reactTestRenderer.create(ui).toJSON();
  expect(rtrResult).toMatchSnapshot('react-test-renderer');
  var enzymeMethods = ['shallow', 'mount', 'render'];
  enzymeMethods.forEach(function(method) {
    var tree = enzyme[method](ui);
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot('enzyme.' + method);
  });
  var container = react_testing_library_1.render(ui).container;
  expect(container.firstChild).toMatchSnapshot('react-testing-library');
  react_testing_library_1.cleanup();
}
exports.checkSnapshotForEachMethod = checkSnapshotForEachMethod;
