class Stack {
    constructor() {
        this.items = [];
        this.container = document.getElementById('stack-container');
        this.message = document.getElementById('stack-message');
    }

    push(element) {
        if (!element) {
            this.showMessage("Please enter data to push.");
            return;
        }
        this.items.push(element);
        this.render();
        this.showMessage(`Pushed: ${element}`);
    }

    pop() {
        if (this.isEmpty()) {
            this.showMessage("Stack is empty (Underflow)");
            return;
        }
        const poppedElement = this.items.pop();

        // Visual removal animation
        const visualItems = this.container.children;
        const lastItem = visualItems[visualItems.length - 1]; // Top is visually the last child in flex-reverse? No, flex-direction: column-reverse makes last element appear at top.
        // Actually, in DOM order for column-reverse:
        // HTML: [Item 1, Item 2, Item 3] 
        // Display:
        // Item 3
        // Item 2
        // Item 1
        // So pop() removes the last element of the array. The last element in DOM corresponds to top.

        if (lastItem) {
            lastItem.style.animation = 'popOut 0.4s forwards';
            setTimeout(() => {
                this.render();
                this.showMessage(`Popped: ${poppedElement}`);
            }, 400);
        } else {
            this.render();
        }
    }

    top() {
        if (this.isEmpty()) {
            this.showMessage("Stack is empty");
            return;
        }
        this.showMessage(`Top/Peek: [${this.items[this.items.length - 1]}]`);

        // Highlight top
        const visualItems = this.container.children;
        if (visualItems.length > 0) {
            const topItem = visualItems[visualItems.length - 1];
            topItem.style.transform = "scale(1.1)";
            topItem.style.boxShadow = "0 0 15px rgba(255, 107, 107, 0.6)";
            setTimeout(() => {
                topItem.style.transform = "";
                topItem.style.boxShadow = "";
            }, 500);
        }
    }

    clear() {
        this.items = [];
        this.render();
        this.showMessage("Stack cleared");
    }

    isEmpty() {
        return this.items.length === 0;
    }

    showMessage(msg) {
        this.message.textContent = msg;
    }

    render() {
        this.container.innerHTML = '';
        this.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'stack-item';
            div.textContent = item;
            this.container.appendChild(div);
        });
    }
}

class Queue {
    constructor() {
        this.items = [];
        this.container = document.getElementById('queue-container');
        this.message = document.getElementById('queue-message');
    }

    enqueue(element) {
        if (!element) {
            this.showMessage("Please enter data to enqueue.");
            return;
        }
        this.items.push(element);
        this.render();
        this.showMessage(`Enqueued: ${element}`);
    }

    dequeue() {
        if (this.isEmpty()) {
            this.showMessage("Queue is empty (Underflow)");
            return;
        }

        // Visual removal animation for the first item (Front)
        const visualItems = this.container.children;
        const firstItem = visualItems[0];

        if (firstItem) {
            firstItem.style.animation = 'dequeueOut 0.4s forwards';
            setTimeout(() => {
                const dequeuedElement = this.items.shift();
                this.render();
                this.showMessage(`Dequeued: ${dequeuedElement}`);
            }, 400);
        } else {
            this.items.shift();
            this.render();
        }
    }

    front() {
        if (this.isEmpty()) {
            this.showMessage("Queue is empty");
            return;
        }
        this.showMessage(`Front: [${this.items[0]}]`);

        // Highlight front
        const visualItems = this.container.children;
        if (visualItems.length > 0) {
            const frontItem = visualItems[0];
            frontItem.style.transform = "scale(1.1)";
            frontItem.style.boxShadow = "0 0 15px rgba(129, 236, 236, 0.8)";
            setTimeout(() => {
                frontItem.style.transform = "";
                frontItem.style.boxShadow = "";
            }, 500);
        }
    }

    clear() {
        this.items = [];
        this.render();
        this.showMessage("Queue cleared");
    }

    isEmpty() {
        return this.items.length === 0;
    }

    showMessage(msg) {
        this.message.textContent = msg;
    }

    render() {
        this.container.innerHTML = '';
        this.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'queue-item';
            div.textContent = item;
            this.container.appendChild(div);
        });
    }
}

// Initialize
const stack = new Stack();
const queue = new Queue();

// Input handling
const dataInput = document.getElementById('data-input');
const addBtn = document.getElementById('add-btn');

// Stack Controls
document.getElementById('stack-push').addEventListener('click', () => {
    stack.push(dataInput.value);
    dataInput.value = '';
    dataInput.focus();
});
document.getElementById('stack-pop').addEventListener('click', () => stack.pop());
document.getElementById('stack-top').addEventListener('click', () => stack.top());
document.getElementById('stack-clear').addEventListener('click', () => stack.clear());

// Queue Controls
document.getElementById('queue-enqueue').addEventListener('click', () => {
    queue.enqueue(dataInput.value);
    dataInput.value = '';
    dataInput.focus();
});
document.getElementById('queue-dequeue').addEventListener('click', () => queue.dequeue());
document.getElementById('queue-front').addEventListener('click', () => queue.front());
document.getElementById('queue-clear').addEventListener('click', () => queue.clear());

// "Add to Structures" button (optional helper basically doing push and enqueue or just focus? 
// The user request shows "Add to structures" in the image which implies adding to BOTH or selecting one. 
// However, standard stack/queue visualizers usually separate the actions.
// Looking at the provided screenshot, the "Add to structure" button seems to be a common input area.
// But the stack and queue have their own buttons. 
// I'll make "Add to Structures" just focus the input or maybe add to both?
// Let's make it add to BOTH for fun, or just ensure input is ready for the individual buttons.
// Actually, likely the user types in input, then clicks Stack Push OR Queue Enqueue. 
// The "Add to Structures" button might be a generic "Submit" that adds to both? 
// Let's implement it to Add to BOTH to be useful, as a "Simultaneous Add".
// OR, based on typical UI, it might be a "Set Data" button. 
// Let's stick to the individual buttons being the primary drivers. 
// But I will wire up the "Add to Structures" button to add to BOTH for convenience as a "bulk add" feature if valid.

addBtn.addEventListener('click', () => {
    const val = dataInput.value;
    if (val) {
        stack.push(val);
        queue.enqueue(val);
        dataInput.value = '';
        dataInput.focus();
    }
});
