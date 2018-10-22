'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function getNodes(node, nodes) {
  if (nodes === void 0) {
    nodes = [];
  }
  if (node.children) {
    var children =
      typeof node.children === 'function' ? node.children() : node.children;
    if (Array.isArray(children)) {
      children.forEach(function(child) {
        return getNodes(child, nodes);
      });
    }
  }
  if (typeof node === 'object') {
    nodes.push(node);
  }
  return nodes;
}
exports.getNodes = getNodes;
