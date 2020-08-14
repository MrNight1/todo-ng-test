import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: []
})
export class TodoAddComponent implements OnInit {
  todoForm: FormGroup;
  
  constructor(private fb: FormBuilder, private todoService: TodoService) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      todoName: ''
    });
  }

  onAdd(event: KeyboardEvent) {
    let newTodo = new Todo();
    newTodo.title = this.todoForm.get('todoName').value;
    console.log('Picaste: ', newTodo.title);

    this.todoService.createTodo(newTodo).subscribe();
    this.todoForm.reset();
    this.todoService.refreshTodos();
  }

}
