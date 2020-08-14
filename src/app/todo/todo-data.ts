import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './model/todo';

export class TodoData implements InMemoryDbService{
    createDb(){
        const todos: Todo[] = [
            {
                id: 1,
                title: 'formar un crew',
                complete: true
            },
            {
                id: 2,
                title: 'Save the world!',
                complete: false
            },
            {
                id: 3,
                title: 'Reclutar a Peter Parker',
                complete: true
            },
            {
              id: 4,
              title: 'Beat Thanos',
              complete: false
            }
        ];

        return { todos };
    }
}
