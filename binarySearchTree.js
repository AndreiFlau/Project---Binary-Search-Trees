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

  inOrder(callback, root = this.root, nodes = []) {
    if (callback) {
      if (root === null) {
        return root;
      }
      this.inOrder(callback, root.left, nodes);
      console.log(root.data);
      callback(root);
      this.inOrder(callback, root.right, nodes);
    } else if (!callback) {
      if (root === null) {
        return root;
      }
      this.inOrder(callback, root.left, nodes);
      console.log(root.data);
      nodes.push(root.data);
      this.inOrder(callback, root.right, nodes);
      return nodes;
    }
  }

  preOrder(callback, root = this.root, nodes = []) {
    if (callback) {
      if (root === null) {
        return root;
      }
      console.log(root.data);
      callback(root);
      this.preOrder(callback, root.left, nodes);
      this.preOrder(callback, root.right, nodes);
    } else if (!callback) {
      if (root === null) {
        return root;
      }
      console.log(root.data);
      nodes.push(root.data);
      this.preOrder(callback, root.left, nodes);
      this.preOrder(callback, root.right, nodes);
      return nodes;
    }
  }

  postOrder(callback, root = this.root, nodes = []) {
    if (callback) {
      if (root === null) {
        return root;
      }
      this.postOrder(callback, root.left, nodes);
      this.postOrder(callback, root.right, nodes);
      console.log(root.data);
      callback(root);
    } else if (!callback) {
      if (root === null) {
        return root;
      }
      this.postOrder(callback, root.left, nodes);
      this.postOrder(callback, root.right, nodes);
      console.log(root.data);
      nodes.push(root.data);
      return nodes;
    }
  }

  height(node, root = this.root, height = 0) {
    let depthOfNodes = this.depthOfEveryNode();
    let deepestNode = depthOfNodes.reduce(
      (max, obj) => (max.depth > obj.depth ? max : obj),
      depthOfNodes[0]
    );
    let targetNode = depthOfNodes.find((obj) => obj.node === node);
    if (node === root) {
      height = deepestNode.depth;
      return height;
    }
    if (root === null) {
      return null;
    } else if (node === root.data && root.left === null && root.right === null) {
      height = 0;
      return height;
    } else if (node < root.data) {
      return this.height(node, root.left, height);
    } else if (node > root.data) {
      return this.height(node, root.right, height);
    } else {
      height = deepestNode.depth - targetNode.depth;
      return height;
    }
    // }
    // if (node === root.data && root.left === null && root.right === null) {
    //   height = 0;
    //   return height;
    // } else if (node < root.data) {
    //   height += 1;
    //   return this.height(node, root.left, height);
    // } else if (node > root.data) {
    //   height += 1;
    //   return this.height(node, root.right, height);
    // }
    // height -= 1;
    return height;
  }

  sideHeight(node) {
    if (node === null) {
      return -1; // Height of null tree is -1
    }

    // Height of a tree is max height of either left or right subtree plus 1
    return 1 + Math.max(this.sideHeight(node.left), this.sideHeight(node.right));
  }

  depth(node, root = this.root, depth = 0) {
    if (root === null) {
      return null;
    }
    if (node === root.data) {
      return depth;
    } else if (node < root.data) {
      depth += 1;
      return this.depth(node, root.left, depth);
    } else if (node > root.data) {
      depth += 1;
      return this.depth(node, root.right, depth);
    }
    return depth;
  }

  depthOfEveryNode(nodes = [], root = this.root, depth = 0) {
    if (root === null) {
      return null;
    }

    // depth += 1;
    nodes.push({ node: root.data, depth: depth });
    depth += 1;
    this.depthOfEveryNode(nodes, root.left, depth);
    this.depthOfEveryNode(nodes, root.right, depth);
    // nodes.push({ Root: root.data, Depth: depth });
    return nodes;
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    let heightDiff = this.sideHeight(root.right) - this.sideHeight(root.left);
    if (heightDiff <= 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance(root = this.root) {
    if (this.isBalanced(root)) {
      return;
    }
    let originalTree = this.inOrder();
    this.root = buildTree(originalTree, 0, originalTree.length - 1);
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

// let tree = new Tree([1, 2, 3, 4, 5]);
// prettyPrint(tree.root);
// tree.insert(9);
// tree.insert(8);
// tree.insert(2);

// prettyPrint(tree.root);
// tree.deleteItem(3);
// tree.find(9);
// console.log("tree.find(9);", tree.find(9));
// tree.levelOrder((node) => {
//   console.log(node);
// });
// tree.inOrder();
// tree.preOrder();
// tree.postOrder();
// prettyPrint(tree.root);
// tree.depthOfEveryNode();
// console.log("tree.depth(2);", tree.depth(2));
// console.log("tree.height(5);", tree.height(5));
// tree.isBalanced();
// console.log("tree.isBalanced()", tree.isBalanced());
// tree.insert(10);
// tree.insert(11);
// prettyPrint(tree.root);
// tree.rebalance();
// prettyPrint(tree.root);

function treeDriver(treeClass) {
  let random = Math.floor(Math.random() * 15) + 1;
  function randomArray(numOfItems) {
    let array = [];
    for (let index = 0; index < numOfItems; index++) {
      array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
  }
  let randomArr = randomArray(random);
  let tree = new treeClass(randomArr);
  prettyPrint(tree.root);
  console.log("Is your tree balanced?", tree.isBalanced());
  console.log("Level Order:");
  tree.levelOrder().forEach((element) => {
    console.log(element);
  });
  console.log("Pre Order:");
  tree.preOrder();
  console.log("Post Order:");
  tree.postOrder();
  console.log("In Order:");
  tree.inOrder();
  tree.insert(Math.floor(Math.random() * 1000) + 1);
  tree.insert(Math.floor(Math.random() * 1000) + 1);
  tree.insert(Math.floor(Math.random() * 1000) + 1);
  tree.insert(Math.floor(Math.random() * 1000) + 1);
  tree.insert(Math.floor(Math.random() * 1000) + 1);
  tree.insert(Math.floor(Math.random() * 1000) + 1);
  prettyPrint(tree.root);
  console.log("Tree is now unbalanced!");
  console.log("Is your tree balanced?", tree.isBalanced());
  console.log("Rebalancing your tree!");
  tree.rebalance();
  prettyPrint(tree.root);
  console.log("Your tree is now balanced!");
  console.log("Is your tree balanced?", tree.isBalanced());
}

treeDriver(Tree);
