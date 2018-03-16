import { expect } from 'chai';
import assignNodeData from './assignNodeData';

const nodes = [
  {
    text: 'foo',
    key: 'foo',
    children: [
      {
        text: 'bar',
        key: 'bar',
      },
      {
        text: 'boo',
        key: 'boo',
      },
      {
        text: 'poo',
        key: 'poo',
        children: [
          {
            text: 'kar',
            key: 'kar',
          },
          {
            text: 'moo',
            key: 'moo',
            children: [
              {
                text: 'dar sar',
                key: 'dar sar',
              },
            ],
          },
          {
            text: 'koo',
            key: 'koo',
          },
        ],
      },
    ],
  },
  {
    text: 'xfoo',
    key: 'xfoo',
    children: [
      {
        text: 'xbar',
        key: 'xbar',
      },
      {
        text: 'xboo',
        key: 'xboo',
      },
      {
        text: 'xpoo',
        key: 'xpoo',
        children: [
          {
            text: 'xkar',
            key: 'xkar',
          },
          {
            text: 'xmoo',
            key: 'xmoo',
            children: [
              {
                text: 'xdar sar',
                key: 'xdar sar',
              },
            ],
          },
          {
            text: 'xkoo',
            key: 'xkoo',
          },
        ],
      },
    ],
  },
];

const nodes2 = [{
  name: 'Software',
  id: 1,
  subItems: [
    {
      name: 'Graphic software',
      id: 2,
      subItems: [
        {
          name: 'Photoshop',
          id: 4,
        },
        {
          name: 'Adobe CS3',
          id: 5,
        }
      ]
    }
  ]
}];


const nodes3 = [{
  name: 'A',
  key: 0,
  children: [
    {
      name: 'B',
      key: 1,
      children: [
        {
          name: 'C',
          key: 2,
          children: [
            {
              name: 'D',
              key: 3,
              children: [
                {
                  name: 'E',
                  key: 4,
                }
              ]
            }
          ]
        },
        {
          name: 'F',
          key: 5,
        }
      ]
    }
  ]
}];


describe('assignNodeData', () => {
  it('assign a nodeData field to each tree node', () => {
    const resultNode = assignNodeData(nodes);

    expect(resultNode[0].nodeData).to.deep.equal(
      {
        parent: null,
        prev: null,
        prevSibling: null,
        next: 'bar',
        nextSibling: 'xfoo',
        siblingIndex: null,
        ancestors: [],
        numDescendants: 5,
        numChildren: 3
      });
    expect(resultNode[1].nodeData).to.deep.equal(
      {
        parent: null,
        prev: 'poo',
        prevSibling: 'foo',
        next: 'xbar',
        nextSibling: null,
        siblingIndex: null,
        ancestors: [],
        numDescendants: 5,
        numChildren: 3
      });
    expect(resultNode[0].children[2].nodeData).to.deep.equal(
      {
        parent: 'foo',
        prev: 'boo',
        prevSibling: 'boo',
        next: 'kar',
        nextSibling: null,
        siblingIndex: 2,
        ancestors: ['foo'],
        numDescendants: 3,
        numChildren: 3
      });
    expect(resultNode[1].children[1].nodeData).to.deep.equal(
      {
        parent: 'xfoo',
        prev: 'xbar',
        prevSibling: 'xbar',
        next: 'xpoo',
        nextSibling: 'xpoo',
        siblingIndex: 1,
        ancestors: ['xfoo'],
        numDescendants: 0,
        numChildren: 0
      });
  });

  it('can also assignNode with custom key field and children field', () => {
    const resultNode = assignNodeData(nodes2, { keyField: 'id', childrenField: 'subItems' });
    const expected =
      [{
        name: 'Software',
        id: 1,
        subItems: [{
          name: 'Graphic software',
          id: 2,
          subItems: [{
            name: 'Photoshop',
            id: 4,
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
              id: 5,
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

    expect(resultNode).to.deep.equal(expected);
  });

  it('can find the "next" key', () => {
    const resultNode = assignNodeData(nodes3);
    const expected = {
      name: 'E',
      key: 4,
      nodeData: {
        parent: 3,
        prev: 3,
        prevSibling: null,
        next: 5,
        nextSibling: null,
        siblingIndex: 0,
        ancestors: [0, 1, 2, 3],
        numDescendants: 0,
        numChildren: 0
      }
    };

    expect(resultNode[0].children[0].children[0].children[0].children[0])
      .to.deep.equal(expected);
  });
});
