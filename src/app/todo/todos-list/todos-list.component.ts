import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})

export class TodosListComponent {

  todos$ = this.todoService.simpleFilter$.pipe(
    catchError(err => {
      console.log('error ', err);
      return EMPTY;
    })
  );

  constructor(private todoService: TodoService) { }

}
