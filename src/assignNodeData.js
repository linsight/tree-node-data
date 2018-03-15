import * as nodeUtils from './nodeUtils';

const getSiblingData = (nodes) => nodes.map((node, index) => ({
  prevNode: nodes[index - 1] || null,
  currentNode: node,
  nextNode: nodes[index + 1] || null,
}));


const transform = (ancestorNodes, keyField, childrenField) => (siblingData) => {
  const { prevNode, currentNode, nextNode } = siblingData;
  const parentNode = ancestorNodes && ancestorNodes[ancestorNodes.length-1] || null;

  let parent = null;
  let siblingIndex = null;
  let prev = null;
  let next = null;
  let ancestors = [];

  const prevSibling = prevNode ? prevNode[keyField] : null;
  const nextSibling = nextNode ? nextNode[keyField] : null;

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
    const eligibleAncestors = ancestorNodes
      .filter(i => !!i.nodeData.nextSibling)
      .map(i => i.nodeData.nextSibling);
    next = eligibleAncestors.length > 0 ? eligibleAncestors.pop() : null;
  }

  if (prevNode && nodeUtils.hasChildren(prevNode, childrenField)) {
    const cousins = prevNode[childrenField];
    const lastCousin = cousins[cousins.length - 1];
    prev = lastCousin[keyField];
  } else if (prevSibling) {
    prev = prevSibling;
  } else {
    prev = parentNode && parentNode[keyField];
  }

  const numDescendants = nodeUtils.countDescendants(currentNode, childrenField);
  const numChildren = nodeUtils.countChildren(currentNode, childrenField);
  const nodeData = {
    parent, prev, prevSibling, next, nextSibling, siblingIndex, ancestors, numDescendants, numChildren,
  };

  const transformedNode = {...currentNode, nodeData};

  if (nodeUtils.hasChildren(currentNode, childrenField)) {
    const siblingData = getSiblingData(currentNode[childrenField]);
    const transformFunc = transform([...ancestorNodes, transformedNode], keyField, childrenField);
    transformedNode[childrenField] = siblingData.map(transformFunc);
  }

  return transformedNode;
};


export default function (nodes, config) {
  const keyField = config && config.keyField || 'key';
  const childrenField = config && config.childrenField || 'children';

  const siblingData = getSiblingData(nodes);
  const transformFunc = transform([], keyField, childrenField);

  return siblingData.map(transformFunc);
}

