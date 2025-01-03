export class ListNode<T> {
  readonly data: T;
  next: ListNode<T> = this;
  prev: ListNode<T> = this;

  constructor(data: T) {
    this.data = data;
  }
}
