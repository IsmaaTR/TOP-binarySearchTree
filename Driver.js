import Tree from './Tree.js';

const createRandomArray = size => {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 101));
    }
    return array;
}

const printCallback = (node) => {
    console.log(node.data);
}

const tree = new Tree(createRandomArray(20));
console.log('-----------Balanced?---------');
console.log(tree.isBalanced());
console.log('-----------Inorder----------');
tree.inOrder(printCallback);
console.log('-----------Preorder----------');
tree.preOrder(printCallback);
console.log('-----------Postorder----------');
tree.postOrder(printCallback);
console.log('-----------Add numbers----------');
tree.insert(120);
tree.insert(121);
tree.insert(122);
tree.insert(123);
tree.insert(124);
console.log('-----------Balanced?---------');
console.log(tree.isBalanced());
console.log('-----------Rebalance---------');
tree.rebalance();
console.log('-----------Balanced?---------');
console.log(tree.isBalanced());
console.log('-----------Inorder----------');
tree.inOrder(printCallback);
console.log('-----------Preorder----------');
tree.preOrder(printCallback);
console.log('-----------Postorder----------');
tree.postOrder(printCallback);