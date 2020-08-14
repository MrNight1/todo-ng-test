import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../model/todo';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input()
  detail: Todo;

  completedForm: FormGroup;
  editing: boolean = false;

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) { }

  ngOnInit() {
    //console.log(JSON.stringify(this.detail));
    this.completedForm = this.fb.group({
      completedName: this.detail.complete
    });

    this.completedForm.get('completedName').valueChanges.subscribe(
      value => {
        this.detail.complete = value;
        console.log('Completed todo: ', JSON.stringify(this.detail));
        this.updateTodo();
      }
    );

    this.todoForm = this.fb.group({
      todoName: this.detail.title
    });
  }

  toggleEdit(){
    this.editing = !this.editing;
  }

  onEdit(event: KeyboardEvent) {
    this.detail.title = this.todoForm.get('todoName').value;
    console.log('Edit: ', this.detail);

    if(this.editing){
      this.updateTodo();
    }
    this.toggleEdit()
  }

  updateTodo(){
    this.todoService.updateTodo(this.detail).subscribe();
    this.todoService.refreshTodos();
  }

}
