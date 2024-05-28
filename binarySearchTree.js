class Node {
  constructor(d) {
    this.data = d;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    let sortedArray = dedupeAndSort(array);
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  insert(value, root = this.root) {
    if (root === null) {
      root = new Node(value);
      return root;
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (value === root.data) {
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      } else if (root.left === null && root.right !== null) {
        let rootRight = root.right;
        root.right = null;
        root = rootRight;
      } else if (root.left !== null && root.right === null) {
        let rootLeft = root.left;
        root.left = null;
        root = rootLeft;
      } else {
        let rootRight = root.right;
        let rootLeft = root.left;
        if (rootRight.left !== null) {
          let temp = root.right.left;
          root.right.left = null;
          root = temp;
          root.left = rootLeft;
          root.right = rootRight;
        } else {
          root.right = null;
          root = rootRight;
          root.left = rootLeft;
        }
      }
    } else if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    }

    this.root = root;
  }

  find(value, root = this.root) {
    if (root === null) {
      return null;
    }
    if (value === root.data) {
      return root;
    } else if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    }
  }

  levelOrder(callback, root = this.root) {
    const array = [];
    array.push(root);
    if (callback) {
      if (root === null) {
        return null;
      }
      while (array.length !== 0) {
        const current = array.shift();
        callback(current);
        if (current.left !== null) {
          array.push(current.left);
        }
        if (current.right !== null) {
          array.push(current.right);
        }
      }
    } else if (!callback) {
      if (root === null) {
        return null;
      }
      const nodes = [];
      while (array.length !== 0) {
        const current = array.shift();
        nodes.push(current);
        if (current.left !== null) {
          array.push(current.left);
        }
        if (current.right !== null) {
          array.push(current.right);
        }
      }
      return nodes;
    }
  }
}

function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  let mid = Math.floor((start + end) / 2);
  let node = new Node(array[mid]);

  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);

  return node;
}

function dedupeAndSort(array) {
  const set = new Set(array);
  const dedupedArray = Array.from(set);
  return dedupedArray.sort((a, b) => a - b);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree = new Tree([1, 2, 3, 4, 5]);
prettyPrint(tree.root);
tree.insert(9);
tree.insert(8);
tree.insert(2);

prettyPrint(tree.root);
tree.deleteItem(3);
tree.find(9);
console.log("tree.find(9);", tree.find(9));
tree.levelOrder((node) => {
  console.log(node);
});
prettyPrint(tree.root);
