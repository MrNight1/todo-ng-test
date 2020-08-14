import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, concatMap } from 'rxjs/operators';
import { Todo } from './model/todo';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'api/todos';

  todos$ = this.http.get<Todo[]>(this.todoUrl)
    .pipe(
      tap(data => console.log('GET Req: ', JSON.stringify(data))),
  );

  updatedTodosSubject = new BehaviorSubject<number>(0);
  updateAction$ = this.updatedTodosSubject.asObservable();

  allTodos$ = combineLatest([
    this.updateAction$
  ]).pipe(
    concatMap(() => this.http.get<Todo[]>(this.todoUrl) ),
    tap(datos => console.log('ALL: ',datos)),
  );

  constructor(private http: HttpClient) { }

  createTodo(todo: Todo): Observable<Todo>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    todo.id = null;
    console.log('Create method: ', todo);
    return this.http.post<Todo>(this.todoUrl, todo, { headers })
      .pipe(
        tap(data => console.log('createTodo: ' + JSON.stringify(data))),
      );
  }

  refreshTodos(){
    this.updatedTodosSubject.next(1);
  }
}
