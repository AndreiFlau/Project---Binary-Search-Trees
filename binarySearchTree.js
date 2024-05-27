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

    return root;
  }
}

function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  let mid = Math.floor((start + end) / 2);
  let node = new Node(array[mid]);

  node.right = buildTree(array, mid + 1, end);
  node.left = buildTree(array, start, mid - 1);

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

let tree = new Tree([37, 12, 89, 45, 23, 78, 56, 3, 92, 31]);
prettyPrint(tree.root);
tree.insert(9);
tree.insert(8);
tree.insert(2);

prettyPrint(tree.root);
tree.deleteItem(3);
prettyPrint(tree.root);
