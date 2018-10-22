'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var replaceClassNames_1 = require('./replaceClassNames');
exports.replaceClassNames = replaceClassNames_1.replaceClassNames;
var serializer_1 = require('./serializer');
exports.createSerializer = serializer_1.createSerializer;
var aphroditeSerializer = serializer_1.serializer(false);
exports.aphroditeSerializer = aphroditeSerializer;
var test = aphroditeSerializer.test,
  print = aphroditeSerializer.print;
exports.test = test;
exports.print = print;
