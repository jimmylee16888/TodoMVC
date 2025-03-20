// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // 預設路由導向 home
  { path: 'home', component: HomeComponent },
  { path: 'todos', component: TodosComponent },
];
