import { Component } from '@angular/core';
import { TodoHeaderComponent } from "../components/todo-header/todo-header.component";
import { TodoMainComponent } from "../components/todo-main/todo-main.component";
import { TodoFooterComponent } from "../components/todo-footer/todo-footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [TodoHeaderComponent, TodoMainComponent, TodoFooterComponent, RouterModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {

}
