import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, concatMap, map, switchMap } from 'rxjs/operators';
import { Todo } from './model/todo';
import { Observable, BehaviorSubject, combineLatest, from } from 'rxjs';

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

  // Reacting to a filter
  private filterSelectedSubject = new BehaviorSubject<number>(0);
  filterSelectedAction$ = this.filterSelectedSubject.asObservable();

  simpleFilter$ = combineLatest([
    this.allTodos$,
    this.filterSelectedAction$
  ]).pipe(
    map(([todos, filtro]) => {
      if(filtro === 1) 
        return todos.filter(todo => todo.complete === false);
      if( filtro === 2)
        return todos.filter(todo => todo.complete === true);
      return todos;
    })
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

  updateTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, { headers })
      .pipe(
        tap(() => console.log('updateTodo: ', todo)),
        // Return the todo on an update
        map(() => todo),
      );
  }

  deleteTodo(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todoUrl}/${id}`;
    return this.http.delete<Todo>(url, { headers })
      .pipe(
        tap(data => console.log('deleteTodo: ' + id)),
      );
  }

  deleteCompleted(ids: number[]){
    console.log('Recibí: ', ids);
    return from(ids).pipe(
      switchMap((id) => this.deleteTodo(id))
    );
  }

  // Filter todos by status
  filteredTodos(filtro: number) {
    this.filterSelectedSubject.next(filtro);
  }

  refreshTodos(){
    this.updatedTodosSubject.next(1);
  }
}
