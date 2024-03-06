export default class LinkedList<T> {
  head: null | Node<T>;
  tail: null | Node<T>;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  prepend(value: T) {
    // O(1)
    let newNode = new Node(value);
    if (this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    let oldHead = this.head;
    if (!oldHead) throw new Error("Head cannot be null");
    oldHead.prev = newNode;
    this.head = newNode;
    this.head.next = oldHead;
    this.length++;
    return newNode;
  }

  append(value: T) {
    // O(1)
    let newNode = new Node(value);

    if (this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    let oldTail = this.tail;
    if (!oldTail) throw new Error("Tail cannot be null");

    oldTail.next = newNode;
    this.tail = newNode;
    this.tail.prev = oldTail;
    this.length++;
    return newNode;
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

export class Node<T> {
  prev: null | Node<T>;
  value: T;
  next: null | Node<T>;

  constructor(value: T) {
    this.prev = null;
    this.value = value;
    this.next = null;
  }
}
