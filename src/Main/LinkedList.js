export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  prepend(value) {
    // O(1)
    let newNode = new Node(value);
    if (this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    let oldHead = this.head;
    oldHead.prev = newNode;
    this.head = newNode;
    this.head.next = oldHead;
    this.length++;
    return newNode;
  }

  append(value) {
    // O(1)
    let newNode = new Node(value, null);

    if (this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    let oldTail = this.tail;
    oldTail.next = newNode;
    this.tail = newNode;
    this.tail.prev = oldTail;
    this.length++;
    return newNode;
  }

  map(fn) {
    const res = new LinkedList();
    let cursor = this.root;
    while (cursor) {
      res.add(fn(cursor.value));
      cursor = cursor.next;
    }

    return res;
  }

  printForward() {
    let output = "";
    for (let cur = this.head; cur != null; cur = cur.next) {
      output = `${output}${cur.value} -> `;
    }
    return `${output}null`;
  }

  printBackward() {
    let output = "";
    for (let cur = this.tail; cur != null; cur = cur.prev) {
      output = `<- ${output}${cur.value}`;
    }
    return `null${output}`;
  }
}

export class Node {
  constructor(value) {
    this.prev = null;
    this.value = value;
    this.next = null;
  }
}
