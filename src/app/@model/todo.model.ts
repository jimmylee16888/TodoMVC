export interface Todo {
  id?: number;  // 後端產生的唯一識別值
  status: boolean;
  Thing: string;
  Editing: boolean;
}

export class TodoClass implements Todo {
  id?: number;
  status: boolean;
  Thing: string;
  Editing: boolean;
  public originalThing: string = '' // 新增原始值屬性


  constructor(thing: string, status: boolean = false, editing: boolean = false, id?: number) {
    this.Thing = thing;
    this.status = status;
    this.Editing = editing;
    if (id) { this.id = id; }

  }

  toggle() {
    this.status = !this.status;
  }
}

export enum TodStatusType {
  ALL,
  Active,
  Completed
}
