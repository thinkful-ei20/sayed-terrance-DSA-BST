class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        if (this.right === null) {
          this.right = new BinarySearchTree(key, value, this);
        } else {
          this.right.insert(key, value);
        }
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function findHeight(tree) {
  if (!tree) {
    return 0;
  }
  const leftHeight = findHeight(tree.left);
  const rightHeight = findHeight(tree.right);

  return Math.max(leftHeight, rightHeight) + 1;
}

function checkTree(node) {
  if (!node) {
    return true;
  }
  if (node.left !== null && node.left.key > node.key) {
    return false;
  }
  if (node.right !== null && node.right.key < node.key) {
    return false;
  }
  const leftSide = checkTree(node.left);
  const rightSide = checkTree(node.right);
  if (!leftSide || !rightSide) {
    return false;
  }
  return true;
}

function thirdLargest(node, count = { n: 0 }) {
  if (!node || count.n === 3) return;

  thirdLargest(node.right, count);
  count.n++;

  if (count.n === 3) {
    console.log(node.key);
  }

  thirdLargest(node.left, count);
}

function checkBalance(node) {
  const leftHeight = findHeight(node.left);
  const rightHeight = findHeight(node.right);

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return false;
  }
  return true;
}

const BST = new BinarySearchTree;

BST.insert(3)
BST.insert(1)
BST.insert(4)
BST.insert(6)
BST.insert(9)
// BST.insert(2)
// BST.insert(5)
// BST.insert(7)
// BST.left.key = 10;
// BST.insert(14)
// BST.insert(20)
// BST.insert(25)

console.log(findHeight(BST));
console.log(checkTree(BST));
thirdLargest(BST);
console.log(checkBalance(BST));

// const setParentsNull = (tree) => {
//   if (!tree.left && !tree.right) {
//     tree.parent = null;
//     return;
//   } else
//   if(!tree.right){
//     tree.parent = null;
//     return setParentsNull(tree.left);
//   } else
//   if(!tree.left){
//     tree.parent = null;
//     return setParentsNull(tree.right);
//   } else {
//     tree.parent = null;
//     setParentsNull(tree.right);
//     setParentsNull(tree.left);
//   }
// };
// const replacer = (name, val) => {
//   if(val === null){
//     return undefined;
//   } else {
//     return val;
//   }
// };

// const display = (rootTree) => {
//   setParentsNull(rootTree);
//   console.log(JSON.stringify(rootTree, replacer, 2));
// };
// display(BST);