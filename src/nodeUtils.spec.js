import { expect } from 'chai';
import * as nodeUtils from './nodeUtils';

const tree = [
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

describe('nodeUtils', () => {
  describe('hasChildren', () => {
    it('should test if have children or not', () => {
      const testCases = [
        { node: tree[0].children[1], hasChild: false },
        { node: tree[0].children[2], hasChild: true },
        { node: tree[1], hasChild: true },
      ];

      testCases.forEach((testCase) => {
        const result = nodeUtils.hasChildren(testCase.node);
        expect(result).to.equal(testCase.hasChild);
      });
    });
  });

  describe('countDescendants', () => {
    it('should count number of descendants', () => {
      const testCases = [
        { node: tree[0].children[1], descendants: 0 },
        { node: tree[0].children[2], descendants: 3 },
        { node: tree[1], descendants: 5 },
      ];

      testCases.forEach((testCase) => {
        const result = nodeUtils.countDescendants(testCase.node);
        expect(result).to.equal(testCase.descendants);
      });
    });
  });

  describe('countChildren', () => {
    it('should count number of children', () => {
      const testCases = [
        { node: tree[0].children[1], children: 0 },
        { node: tree[0].children[2], children: 3 },
        { node: tree[1], children: 3 },
      ];

      testCases.forEach((testCase) => {
        const result = nodeUtils.countChildren(testCase.node);
        expect(result).to.equal(testCase.children);
      });
    });
  });
});
