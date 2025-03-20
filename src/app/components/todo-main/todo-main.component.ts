import { Component } from '@angular/core';
import { TodoApiService } from '../../../@service/todo-api.service';
import { TodoClass } from '../../@model/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-main.component.html',
  styleUrl: './todo-main.component.css'
})
export class TodoMainComponent {

  constructor(public todoApiService: TodoApiService) {}

  // 只呼叫 service 層的功能
  toggleAll() {
    this.todoApiService.toggleAll();
  }
  clickCheck(item: TodoClass) {
    this.todoApiService.clickCheck(item);
  }

  // 進入編輯模式，僅保留畫面聚焦的邏輯
  edit(item: TodoClass) {
    console.log("edit");
    item.Editing = true;
    // 儲存原始值，供後續比較用
    item.originalThing = item.Thing;
    setTimeout(() => {
      const inputElem = document.getElementById(`editInput-${item.id}`);
      if (inputElem) {
        (inputElem as HTMLInputElement).focus();
      }
    }, 0);
  }


  delete(index: number) {
    this.todoApiService.delete(index);
  }

  update(item: TodoClass, inputValue: string) {
    this.todoApiService.updateTodo(item, inputValue);
  }


  // Expose getters for template 使用
  get getNowTodoList() {
    return this.todoApiService.getNowTodoList;
  }
  get nowTodoStatusType() {
    return this.todoApiService.nowTodoStatusType;
  }
  get TodoStatusType() {
    return this.todoApiService.TodoStatusType;
  }
  get todoActive() {
    return this.todoApiService.todoActive;
  }

  get toggleAllBtnState(): boolean {
    return this.todoApiService.toDoListContent.length > 0 &&
           this.todoApiService.toDoListContent.every(item => item.status);
  }

}
