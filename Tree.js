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

    insert(value) {
        //New tree
        if (this.root === null) {
            this.root = new Node(value);
            this.prettyPrint(this.root);
            return;
        }

        //Find the node to introduce the new value
        let currentNode = this.root;
        let parentNode = null;
        while(currentNode !== null) {
            if (value === currentNode.data)
                return;

            parentNode = currentNode;
            value > currentNode.data ? currentNode = currentNode.right : currentNode = currentNode.left;
        }

        //Introduce the value
        value > parentNode.data ? parentNode.right = new Node(value) : parentNode.left = new Node(value);
        this.prettyPrint(this.root);
    }

    delete(value) {
        if (this.root === null) {
            return;
        }

        // Helper function to delete a node recursively
        const deleteNode = (node, value) => {
            if (node === null) return node;

            if (value < node.data) {
                // Si el valor a eliminar es menor, busca en el subárbol izquierdo
                node.left = deleteNode(node.left, value);
            } else if (value > node.data) {
                // Si el valor a eliminar es mayor, busca en el subárbol derecho
                node.right = deleteNode(node.right, value);
            } else {
                // Nodo encontrado (node.data === value)

                // Caso 1: Nodo sin hijos (nodo hoja)
                if (node.left === null && node.right === null) {
                    return null; // Elimina el nodo devolviendo `null`
                }

                // Caso 2: Nodo con un solo hijo (derecho)
                if (node.left === null) {
                    return node.right; // Reemplaza el nodo con su hijo derecho
                }

                // Caso 3: Nodo con un solo hijo (izquierdo)
                if (node.right === null) {
                    return node.left; // Reemplaza el nodo con su hijo izquierdo
                }

                // Caso 4: Nodo con dos hijos
                // Encuentra el sucesor in-order (el menor valor en el subárbol derecho)
                let successor = node.right;
                while (successor.left !== null) {
                    successor = successor.left;
                }

                // Reemplaza el valor del nodo actual con el valor del sucesor
                node.data = successor.data;

                // Elimina el sucesor del subárbol derecho
                node.right = deleteNode(node.right, successor.data);
            }

            return node; // Devuelve el nodo con las referencias actualizadas
        };

        // Actualiza la raíz del árbol después de la eliminación
        this.root = deleteNode(this.root, value);
        this.prettyPrint(this.root);
    }

    find(value) {
        let currentNode = this.root;
        while(currentNode.data !== value && currentNode !== null) {
            value > currentNode.data ? currentNode = currentNode.right : currentNode = currentNode.left;
        }
        return currentNode;
    }

    levelOrder(callback) {
        if (callback === null)
            throw new Error('Callback function needed');

        /**
         * Aux function which traverse through the tree with the given node as the root
         * and executes the callback in every node
         * @param {*} node 
         * @param {*} callback 
         */
        const levelOrderRecursive = (nodeArray, callback) => {
            //Corner case
            if(nodeArray.length === 0) {
                return;
            }

            let children = [];

            nodeArray.forEach(node => {
                callback(node);
                if(node.left !== null)
                    children.push(node.left);
                if (node.right !== null)
                    children.push(node.right);
            });
            levelOrderRecursive(children, callback);
        }
        
        //Call the aux function
        const initialNodes = [this.root];
        levelOrderRecursive(initialNodes, callback);
    }

    preOrder(callback) {
        if (callback === null)
            throw new Error('Callback function needed');

        const preOrderRecursive = (node, callback) => {
            if(node === null)
                return;

            callback(node);
            preOrderRecursive(node.left, callback);
            preOrderRecursive(node.right, callback);
        }

        preOrderRecursive(this.root, callback);
    }

    inOrder(callback) {
        if (callback === null)
            throw new Error('Callback function needed');

        const inOrderRecursive = (node, callback) => {
            if(node === null)
                return;

            inOrderRecursive(node.left, callback);
            callback(node);
            inOrderRecursive(node.right, callback);
        }

        inOrderRecursive(this.root, callback);
    }

    postOrder(callback) {
        if (callback === null)
            throw new Error('Callback function needed');

        const postOrderRecursive = (node, callback) => {
            if (node === null)
                return;

            postOrderRecursive(node.left, callback);
            postOrderRecursive(node.right, callback);
            callback(node);
        }

        postOrderRecursive(this.root, callback);
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