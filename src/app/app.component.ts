import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITodo } from './todos/interfaces/ITodo';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, changeFilterMode } from './todos/state/todo.actions';
import { TodosService } from './todos/services/todos.service';
import { FILTER_MODES } from './todos/constants/filter-modes';
import { filterMode } from './todos/state/todos.reducer';
import { element } from 'protractor';
export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  inputText: string;
  activeFilter='All'
  filterModes: FILTER_MODES;
  todos$: Observable<ITodosState>;
  constructor(private store: Store<{ todos: ITodosState }>, private todosService: TodosService) {
    this.todos$ = store.select('todos');
  }
  textchange(e) {
    if (e.keyCode == 13) {
      this.todosService.addTodo(this.inputText)
      this.inputText = '';
    }
  }
  filterSelected(filter) {
    this.activeFilter = filter;
    this.todosService.changeFilterMode(filter)
  }
  clearCompleted() {
    this.todosService.clearCompleted()
  }
  countRemaining(): number {
    let count = 0;
    this.todos$.subscribe(ele => {
      ele.todos.forEach(element => {
        if (!element.completed) {
          count++
        }
      })
     })
    return count;
  }
}
