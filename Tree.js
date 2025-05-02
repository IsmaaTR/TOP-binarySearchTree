import Node from './Node.js';

export default class Tree {

    constructor(array) {
        this.root = this.buildTree(array);
        this.prettyPrint(this.root);
    }

    buildTree(array) {
        //Sort the array
        array.sort((a,b) => a - b);
        //Delete duplicates
        const uniqueNumbers = [...new Set(array)];
        //Build the tree
        return this.buildTreeRecursive(uniqueNumbers, 0, uniqueNumbers.length - 1);
    }

    buildTreeRecursive(sortedArray, start, end) {
        //Corner case
        if (start > end) return null;

        const mid = Math.ceil((start + end) / 2);
        const rootNode = new Node(sortedArray[mid]);
        rootNode.left = this.buildTreeRecursive(sortedArray, start, mid - 1);
        rootNode.right = this.buildTreeRecursive(sortedArray, mid+1, end);

        return rootNode;
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      }
}