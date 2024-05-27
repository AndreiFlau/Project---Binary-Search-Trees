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

  insert(value) {}

  deleteItem(value) {}
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
  return dedupedArray.sort();
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

let tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
prettyPrint(tree.root);
