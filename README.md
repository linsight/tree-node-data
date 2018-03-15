# tree-node-data

`tree-node-data` assigns a set of structure meta data for each node in your tree data structure.

Meta data includes __parent__, __prev__, __prevSibling__, __next__, __nextSibling__, __siblingIndex__, __ancestors__, 
__numDescendants__, __numChildren__.

It is useful for building tree structure UI for data display and data traversal.

## Install

`npm install tree-node-data`

## Features

1. Fast. We use it to handle 4000+ nodes tree in production with no obvious delay.
2. Clean. All added data are contained in the `nodeData` field; Original tree node data is intact.


## Example

__In short__, it provides a function `assignNodeData` that assigns an extra field named `nodeData` to each node of your tree:
 
<table>
<tr>
<th>Origin</th>
<th>Result</th>
</tr>
<tr>
 <td valign="top">
 
```
[{
name: 'Software'
key: 1,
children: [
  { 
    name: 'Graphic software',
    key: 2,
    children: [
      {
        name: 'Photoshop',
        key: 4,        
      },
      {
        name: 'Adobe CS3',
        key: 5,        
      }      
    ]
  }
]
}]


```

</td>

 <td valign="top">

```
[{
  name: 'Software',
  key: 1,
  children: [{
    name: 'Graphic software',
    key: 2,
    children: [{
      name: 'Photoshop',
      key: 4,
      nodeData: {
        parent: 2,
        prev: 2,
        prevSibling: null,
        next: 5,
        nextSibling: 5,
        siblingIndex: 0,
        ancestors: [1, 2],
        numDescendants: 0,
        numChildren: 0
      }
    },
      {
        name: 'Adobe CS3',
        key: 5,
        nodeData: {
          parent: 2,
          prev: 4,
          prevSibling: 4,
          next: null,
          nextSibling: null,
          siblingIndex: 1,
          ancestors: [1, 2],
          numDescendants: 0,
          numChildren: 0
        }
      }],
    nodeData: {
      parent: 1,
      prev: 1,
      prevSibling: null,
      next: 4,
      nextSibling: null,
      siblingIndex: 0,
      ancestors: [1],
      numDescendants: 2,
      numChildren: 2
    }
  }],
  nodeData: {
    parent: null,
    prev: null,
    prevSibling: null,
    next: 2,
    nextSibling: null,
    siblingIndex: null,
    ancestors: [],
    numDescendants: 2,
    numChildren: 1
  }
}];

```
</td>
</tr>
</table>
     

## Node Data

Field|Description
---|---
parent|key value of parent node
prevSibling| key value of previous sibling node. `null` if the current node has no previous sibling node. i.e. it is the first/only child of its parent.
nextSibling| key value of next sibling node. `null` if the current node has no next sibling node. i.e. it is the last/only child of its parent.
prev|key value of previous node. Previous node is defined as previous sibling if found or parent node. 
next|key value of next node. Next node is defined as next sibling node if found. Otherwise, it will be the 'nextSibling' of the closest ancestor that has a 'nextSibling';
siblingIndex| The integer index of the current node amongst its siblings. Index starts from 0.
ancestors|Array of key values of all ancestor nodes. This is useful for working out branch collapsed/expanded status.
numDescendants| This is the number of **leaf** nodes.  This is useful for showing all items under a branch node.
numChildren| number of direct child nodes.


## API

```
import assignNodeData from 'tree-node-data';

const config = {
  childrenField: 'children', // e.g. customise the field for children nodes. e.g. 'subItems', default 'children'
  keyField: 'key', // e.g. customise the field for node key. e.g. 'id', default 'key'
};

const nodesWithData = assignNodeData(
  nodes, // array of tree nodes. 
  config,
)
```


# Tips

1. All nodes should have a distinct 'key' value.
2. If you want to process a tree instead of an array of nodes, wrap the root node in an array as the parameter to `assignNodeData`;
