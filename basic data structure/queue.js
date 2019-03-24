// queue
class Queue {
    constructor() {
        this.queue = [];
    }

    enQueue(item) {
        this.queue.push(item);
    }

    deQueue() {
        return this.queue.shift();
    }

    getHeader() {
        return this.queue[0];
    }

    getLength() {
        return this.queue.length;
    }

    isEmpty() {
        return this.getLength() === 0;
    }
}

// circular queue
class SqQueue {
    constuctor(length) {
        this.queue = new Array(length +1);
        // head of queue
        this.first = 0;
        // tail of queue
        this.last = 0;
        // size of queue
        this.size = 0;
    }

    enQueue(item) {
        // if last + 1 = first, need enlarge the size of queue
        if (this.first === (this.last +1) % this.queue.length) {
            this.resize(this.getLength() * 2 + 1);
        }
        this.queue[this.last] = item;
        this.size++;
        this.last = (this.last + 1) % this.queue.length;
    }

    deQueue() {
        if (this.isEmpty()) {
            throw Error('Queue is already empty');
        }
        let r = this.queue[this.first];
        this.queue[this.first] = null;
        this.first = (this.first + 1) % this.queue.length;
        this.size--;
        // when the length of queue less than the total length of the Array
        // let the size = (total length) / 2, in order to save memory
        if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
            this.resize(this.getLength() / 2);
        }
        return r;
    }

    getHeader() {
        if (this.isEmpty()) {
            throw Error('Queue is Empty');
        }
        return this.queue[this.first];
    }

    getLength() {
        return this.queue.length - 1;
    }

    isEmpty() {
        return this.first === this.last;
    }

    resize(length) {
        let q = new Array(length);
        for(let i = 0; i < length; i++) {
            q[i] = this.queue[(i + this.first) % this.queue.length];
        }
        this.queue = q;
        this.first = 0;
        this.last = this.size;
    }
}