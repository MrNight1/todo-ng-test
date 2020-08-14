import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Todo } from './model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'api/todos';

  todos$ = this.http.get<Todo[]>(this.todoUrl)
    .pipe(
      tap(data => console.log('GET Req: ', JSON.stringify(data))),
  );

  constructor(private http: HttpClient) { }
}
