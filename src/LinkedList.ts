import { ListNode } from "./ListNode";

export class LinkedList<T> {
  private head: ListNode<T> | null = null;

  peak(): T {
    if (!this.head) {
      throw new Error("Peaking an empty list");
    }

    return this.head.data;
  }

  insertAtBegin(data: T): void {
    const newNode: ListNode<T> = new ListNode(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.head.prev;
      this.head.prev.next = newNode;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  removeLast(): T {
    if (!this.head) {
      throw new Error("Removing from an empty list");
    }

    if (this.head === this.head.next) {
      const removedNode: ListNode<T> = this.head;
      this.head = null;
      return removedNode.data;
    }

    const removedNode: ListNode<T> = this.head.prev;

    this.head.prev = this.head.prev.prev;
    this.head.prev.next = this.head;

    return removedNode.data;
  }
}
