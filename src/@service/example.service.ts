import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {


  num = 0;

  add(){
      this.num++;
  }

  constructor() { }
}
