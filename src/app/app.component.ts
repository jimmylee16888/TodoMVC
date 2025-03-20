import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoApiService } from '../@service/todo-api.service';
import { TodoClass } from './@model/todo.model';
import { TodoHeaderComponent } from "./components/todo-header/todo-header.component";
import { TodoMainComponent } from "./components/todo-main/todo-main.component";
import { TodoFooterComponent } from "./components/todo-footer/todo-footer.component";
import { TodosComponent } from "./todos/todos.component";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule, TodoHeaderComponent, TodoMainComponent, TodoFooterComponent, TodosComponent, HomeComponent],
  providers: [TodoApiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  // 直接以 public 曝露 service 給模板使用
  constructor(public todoApiService: TodoApiService) {}

  ngOnInit(): void {
    this.todoApiService.loadTodos();
  }

}
