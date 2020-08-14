import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent {
  selectedFilter: number = 0;
  // 0: All todos
  // 1: pending todos
  // 2: completed todos
  all$ = this.todoService.allTodos$;
  
  pendingTodos$ = this.all$.pipe(
    map(todos =>  todos.filter(todo => todo.complete === false))
  );

  constructor(private todoService: TodoService) { }

  onSelected(filter: number){
    this.selectedFilter = filter;
    this.todoService.filteredTodos(filter);
  }

  deleteCompleted(dtos){
    console.log('OLA -> Recibí esto de la GUI: ', dtos);
    const ids: number[] = dtos.filter( todo => todo.complete).map(data => data.id);
    console.log('K ASE -> Despues de filtrar: ', ids);
    this.todoService.deleteCompleted(ids).subscribe();
    this.todoService.refreshTodos();
  }

}
