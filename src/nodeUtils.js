export function hasChildren(node, childrenKey='children') {
  return !!node[childrenKey] && node[childrenKey].length > 0;
}

export function isBranch(node, childrenKey='children') {
  return !!node[childrenKey] && node[childrenKey].length >= 0;
}

export const countDescendants = (node, childrenKey='children') => {
  const aggregateFun = (agg, node) => (
    isBranch(node, childrenKey) ? agg + countDescendants(node, childrenKey) : agg + 1
  );

  return isBranch(node, childrenKey) ? node[childrenKey].reduce(aggregateFun, 0) : 0;
};

export const countChildren = (node, childrenKey='children') =>
  (isBranch(node, childrenKey) ? node[childrenKey].length : 0);
