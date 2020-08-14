import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input()
  detail: Todo;

  constructor(private todoService: TodoService) { console.log(JSON.stringify(this.detail)); }

  ngOnInit() {
    console.log(JSON.stringify(this.detail));
  }

}
