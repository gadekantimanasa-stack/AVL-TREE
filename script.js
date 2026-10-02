// ========================================
// AVL TREE NODE
// ========================================

class Node {

    constructor(value) {

        this.value = value;

        this.left = null;

        this.right = null;

        this.height = 1;
    }
}


// ========================================
// AVL TREE
// ========================================

class AVLTree {

    constructor() {

        this.root = null;
    }


    // Get height
    getHeight(node) {

        if (node === null) {
            return 0;
        }

        return node.height;
    }


    // Get balance factor
    getBalance(node) {

        if (node === null) {
            return 0;
        }

        return (
            this.getHeight(node.left) -
            this.getHeight(node.right)
        );
    }


    // Update height
    updateHeight(node) {

        node.height =
            1 +
            Math.max(
                this.getHeight(node.left),
                this.getHeight(node.right)
            );
    }


    // ========================================
    // RIGHT ROTATION
    // ========================================

    rightRotate(y) {

        let x = y.left;

        let T2 = x.right;


        // Perform rotation
        x.right = y;

        y.left = T2;


        // Update heights
        this.updateHeight(y);

        this.updateHeight(x);


        return x;
    }


    // ========================================
    // LEFT ROTATION
    // ========================================

    leftRotate(x) {

        let y = x.right;

        let T2 = y.left;


        // Perform rotation
        y.left = x;

        x.right = T2;


        // Update heights
        this.updateHeight(x);

        this.updateHeight(y);


        return y;
    }


    // ========================================
    // INSERT
    // ========================================

    insert(node, value) {

        // Normal BST insertion
        if (node === null) {

            return new Node(value);
        }


        if (value < node.value) {

            node.left =
                this.insert(node.left, value);

        }
        else if (value > node.value) {

            node.right =
                this.insert(node.right, value);

        }
        else {

            // Duplicate values are not allowed
            return node;
        }


        // Update height
        this.updateHeight(node);


        // Get balance factor
        let balance =
            this.getBalance(node);


        // ====================================
        // LL CASE
        // ====================================

        if (
            balance > 1 &&
            value < node.left.value
        ) {

            return this.rightRotate(node);
        }


        // ====================================
        // RR CASE
        // ====================================

        if (
            balance < -1 &&
            value > node.right.value
        ) {

            return this.leftRotate(node);
        }


        // ====================================
        // LR CASE
        // ====================================

        if (
            balance > 1 &&
            value > node.left.value
        ) {

            node.left =
                this.leftRotate(node.left);

            return this.rightRotate(node);
        }


        // ====================================
        // RL CASE
        // ====================================

        if (
            balance < -1 &&
            value < node.right.value
        ) {

            node.right =
                this.rightRotate(node.right);

            return this.leftRotate(node);
        }


        return node;
    }


    // ========================================
    // DELETE
    // ========================================

    delete(node, value) {

        if (node === null) {
            return node;
        }


        // Search for the node
        if (value < node.value) {

            node.left =
                this.delete(node.left, value);

        }
        else if (value > node.value) {

            node.right =
                this.delete(node.right, value);

        }
        else {

            // Node with one child or no child
            if (
                node.left === null ||
                node.right === null
            ) {

                let child =
                    node.left
                    ? node.left
                    : node.right;

                if (child === null) {

                    node = null;

                } else {

                    node = child;
                }

            }
            else {

                // Node with two children

                let successor =
                    this.getMinValueNode(
                        node.right
                    );

                node.value =
                    successor.value;

                node.right =
                    this.delete(
                        node.right,
                        successor.value
                    );
            }
        }


        if (node === null) {
            return node;
        }


        // Update height
        this.updateHeight(node);


        // Balance factor
        let balance =
            this.getBalance(node);


        // ====================================
        // LL CASE
        // ====================================

        if (balance > 1) {

            if (this.getBalance(node.left) >= 0) {

                return this.rightRotate(node);
            }


            // LR Case

            node.left =
                this.leftRotate(node.left);

            return this.rightRotate(node);
        }


        // ====================================
        // RR CASE
        // ====================================

        if (balance < -1) {

            if (this.getBalance(node.right) <= 0) {

                return this.leftRotate(node);
            }


            // RL Case

            node.right =
                this.rightRotate(node.right);

            return this.leftRotate(node);
        }


        return node;
    }


    // ========================================
    // FIND MINIMUM NODE
    // ========================================

    getMinValueNode(node) {

        let current = node;

        while (current.left !== null) {

            current = current.left;
        }

        return current;
    }


    // ========================================
    // SEARCH
    // ========================================

    search(node, value) {

        if (node === null) {
            return false;
        }

        if (node.value === value) {
            return true;
        }

        if (value < node.value) {

            return this.search(
                node.left,
                value
            );

        } else {

            return this.search(
                node.right,
                value
            );
        }
    }


    // ========================================
    // INORDER
    // ========================================

    inorder(node, result = []) {

        if (node !== null) {

            this.inorder(
                node.left,
                result
            );

            result.push(node.value);

            this.inorder(
                node.right,
                result
            );
        }

        return result;
    }


    // ========================================
    // PREORDER
    // ========================================

    preorder(node, result = []) {

        if (node !== null) {

            result.push(node.value);

            this.preorder(
                node.left,
                result
            );

            this.preorder(
                node.right,
                result
            );
        }

        return result;
    }


    // ========================================
    // POSTORDER
    // ========================================

    postorder(node, result = []) {

        if (node !== null) {

            this.postorder(
                node.left,
                result
            );

            this.postorder(
                node.right,
                result
            );

            result.push(node.value);
        }

        return result;
    }
}


// ========================================
// CREATE AVL TREE
// ========================================

const avl = new AVLTree();


// ========================================
// INSERT VALUE
// ========================================

function insertValue() {

    const input =
        document.getElementById("valueInput");

    const value =
        parseInt(input.value);

    const message =
        document.getElementById("message");


    if (isNaN(value)) {

        message.textContent =
            "Please enter a valid number.";

        message.style.color = "red";

        return;
    }


    // Check duplicate
    if (avl.search(avl.root, value)) {

        message.textContent =
            "Value already exists in the tree.";

        message.style.color = "red";

        return;
    }


    avl.root =
        avl.insert(
            avl.root,
            value
        );


    message.textContent =
        "Value " + value +
        " inserted successfully.";

    message.style.color = "green";


    input.value = "";

    updateDisplay();
}


// ========================================
// DELETE VALUE
// ========================================

function deleteValue() {

    const input =
        document.getElementById("valueInput");

    const value =
        parseInt(input.value);

    const message =
        document.getElementById("message");


    if (isNaN(value)) {

        message.textContent =
            "Please enter a valid number.";

        message.style.color = "red";

        return;
    }


    if (!avl.search(avl.root, value)) {

        message.textContent =
            "Value not found in the tree.";

        message.style.color = "red";

        return;
    }


    avl.root =
        avl.delete(
            avl.root,
            value
        );


    message.textContent =
        "Value " + value +
        " deleted successfully.";

    message.style.color = "green";


    input.value = "";

    updateDisplay();
}


// ========================================
// SEARCH VALUE
// ========================================

function searchValue() {

    const input =
        document.getElementById("valueInput");

    const value =
        parseInt(input.value);

    const message =
        document.getElementById("message");


    if (isNaN(value)) {

        message.textContent =
            "Please enter a valid number.";

        message.style.color = "red";

        return;
    }


    const found =
        avl.search(
            avl.root,
            value
        );


    if (found) {

        message.textContent =
            "Value " + value +
            " found in the AVL tree.";

        message.style.color = "green";

    } else {

        message.textContent =
            "Value " + value +
            " not found.";

        message.style.color = "red";
    }
}


// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

    displayTree();

    displayTraversals();
}


// ========================================
// DISPLAY TRAVERSALS
// ========================================

function displayTraversals() {

    const inorder =
        avl.inorder(avl.root);

    const preorder =
        avl.preorder(avl.root);

    const postorder =
        avl.postorder(avl.root);


    document.getElementById("inorder")
        .textContent =
        inorder.length
            ? inorder.join(" → ")
            : "-";


    document.getElementById("preorder")
        .textContent =
        preorder.length
            ? preorder.join(" → ")
            : "-";


    document.getElementById("postorder")
        .textContent =
        postorder.length
            ? postorder.join(" → ")
            : "-";
}


// ========================================
// DISPLAY TREE
// ========================================

function displayTree() {

    const treeContainer =
        document.getElementById("tree");


    treeContainer.innerHTML = "";


    if (avl.root === null) {

        treeContainer.innerHTML =
            `<div class="empty">
                Tree is empty
            </div>`;

        return;
    }


    treeContainer.appendChild(
        createTreeNode(avl.root)
    );
}


// ========================================
// CREATE VISUAL TREE NODE
// ========================================

function createTreeNode(node) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "tree-node";


    // Node circle

    const nodeElement =
        document.createElement("div");

    nodeElement.className =
        "node";

    nodeElement.textContent =
        node.value;


    wrapper.appendChild(nodeElement);


    // Children

    if (
        node.left !== null ||
        node.right !== null
    ) {

        const children =
            document.createElement("div");

        children.className =
            "children";


        // Left child

        if (node.left !== null) {

            const left =
                document.createElement("div");

            left.className =
                "child";

            left.appendChild(
                createTreeNode(node.left)
            );

            children.appendChild(left);
        }


        // Right child

        if (node.right !== null) {

            const right =
                document.createElement("div");

            right.className =
                "child";

            right.appendChild(
                createTreeNode(node.right)
            );

            children.appendChild(right);
        }


        wrapper.appendChild(children);
    }


    return wrapper;
}


// ========================================
// CLEAR TREE
// ========================================

function clearTree() {

    avl.root = null;


    document.getElementById("message")
        .textContent =
        "AVL tree cleared.";

    document.getElementById("message")
        .style.color = "#333";


    document.getElementById("valueInput")
        .value = "";


    updateDisplay();
}


// ========================================
// INITIAL DISPLAY
// ========================================

updateDisplay();
