import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoClass, TodStatusType } from '../app/@model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private apiUrl = 'http://localhost:3000/todos';

  toDoListContent: TodoClass[] = [];
  nowTodoStatusType = TodStatusType.ALL;
  TodoStatusType = TodStatusType;

  constructor(private http: HttpClient) { }

  // 載入資料
  loadTodos() {
    this.get_data().subscribe(data => {
      this.toDoListContent = data.map(todo =>
        new TodoClass(todo.Thing, todo.status, todo.Editing, todo.id));
    });
  }

  clickCheck(item: TodoClass) {
    item.toggle();
    if (item.id != null) {
      this.update_data(item).subscribe();
    }
  }

  delete(index: number) {
    const item = this.toDoListContent[index];
    if (item && item.id != null) {
      this.delete_data(item).subscribe(() => {
        this.toDoListContent.splice(index, 1);
      });
    }
  }

  // 新增 Todo
  add(thing: string) {
    const newTodo = new TodoClass(thing);
    return this.http.post<TodoClass>(this.apiUrl, newTodo).subscribe(() => {
      this.loadTodos();
    });
  }

  // 更新 Todo：調用 API 並重載資料
  update(item: TodoClass, input: string) {
    if (item.id != null) {
      this.update_data(item).subscribe(() => {
        this.loadTodos();
      });
    }
  }

  // 設定過濾狀態
  setTodoStatus(status: number) {
    this.nowTodoStatusType = status;
  }

  // 根據狀態返回對應的 Todo 列表
  get getNowTodoList(): TodoClass[] {
    switch (this.nowTodoStatusType) {
      case TodStatusType.Active:
        return this.todoActive;
      case TodStatusType.Completed:
        return this.todoCompleted;
      default:
        return this.toDoListContent;
    }
  }

  // 回傳尚未完成的 Todo 列表
  get todoActive(): TodoClass[] {
    return this.toDoListContent.filter(data => !data.status);
  }

  // 回傳已完成的 Todo 列表
  get todoCompleted(): TodoClass[] {
    return this.toDoListContent.filter(data => data.status);
  }

  // 清除所有已完成的 Todo
  clearCompleted() {
    const completed = this.todoCompleted;
    completed.forEach(item => {
      if (item.id != null) {
        this.delete_data(item).subscribe(() => {
          this.loadTodos();
        });
      }
    });
  }

  ifCompletedZero() {
    return this.toDoListContent.length !== 0;
  }

  // ★ 新增：全選/全不選功能封裝在 service 中
  toggleAll() {
    const newStatus = !(this.toDoListContent.length > 0 && this.toDoListContent.every(item => item.status));
    this.toDoListContent.forEach(item => {
      item.status = newStatus;
      if (item.id != null) {
        this.update_data(item).subscribe();
      }
    });
  }

  // ★ 新增：更新 Todo 詳細邏輯封裝
  updateTodo(item: TodoClass, newValue: string) {
    const trimmedValue = newValue.trim();
    if (trimmedValue === '') {
      item.Editing = false;
      return;
    }
    // 使用儲存的原始值作為比較基準
    if (trimmedValue !== item.originalThing) {
      item.Thing = trimmedValue;
      if (item.id != null) {
        this.update_data(item).subscribe({
          next: () => {
            item.Editing = false;
          },
          error: (error) => {
            console.error('更新失敗', error);
          }
        });
      } else {
        item.Editing = false;
      }
    } else {
      item.Editing = false;
    }
  }


  // 以下為與後端 API 互動的方法
  get_data() {
    return this.http.get<TodoClass[]>(this.apiUrl);
  }

  add_data(value: TodoClass) {
    return this.http.post<TodoClass>(this.apiUrl, value);
  }

  update_data(value: TodoClass) {
    return this.http.put(`${this.apiUrl}/${value.id}`, value);
  }

  delete_data(value: TodoClass) {
    return this.http.delete(`${this.apiUrl}/${value.id}`);
  }
}
