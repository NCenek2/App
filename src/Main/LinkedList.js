export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  prepend(value) {
    // O(1)
    let newNode = new Node(value, this.head);
    if (this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    this.head = newNode;
    this.length++;
    return newNode;
  }

  removeHead() {
    // O(1)
    if (this.length == 0) return null;
    let removedNode = this.head;
    if (this.length == 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return removedNode;
    }

    this.head = this.head.next;
    this.length--;
    return removedNode;
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
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return newNode;
  }

  removeTail() {
    // O(n)
    if (this.length == 0) return null;
    if (this.length == 1) {
      let removedNode = this.tail;
      this.head = null;
      this.tail = null;
      this.length--;
      return removedNode;
    }

    let previous = null;
    let current = this.head;
    while (current.next) {
      previous = current;
      current = current.next;
    }
    let removedNode = current;
    previous.next = null;
    this.tail = previous;
    this.length--;
    return removedNode;
  }

  print() {
    // O(n)
    let output = "";
    let current = this.head;
    while (current) {
      output = `${output}${current.value} -> `;
      current = current.next;
    }
    console.log(`${output}null`);
    return;
  }
}

export class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
