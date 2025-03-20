import { Component } from '@angular/core';
import { TodoApiService } from '../../../@service/todo-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent {


  // 直接以 public 曝露 service 給模板使用
  constructor(public todoApiService: TodoApiService) {}



  setTodoStatus(status: number) {
    this.todoApiService.setTodoStatus(status);
  }

  clearCompleted() {
    this.todoApiService.clearCompleted();
  }

  ifCompletedZero() {
    return this.todoApiService.ifCompletedZero();
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
}
