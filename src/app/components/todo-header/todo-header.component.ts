import { Component } from '@angular/core';
import { TodoApiService } from '../../../@service/todo-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-header',
  imports: [FormsModule],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.css'
})
export class TodoHeaderComponent {
  todoInputModel = '';
  placeholder = '輸入新的任務...';

  // 直接以 public 曝露 service 給模板使用
    constructor(public todoApiService: TodoApiService) {}

    add() {
      if (this.todoInputModel.trim() === '') return;
      this.todoApiService.add(this.todoInputModel);
      this.todoInputModel = '';
    }

}
