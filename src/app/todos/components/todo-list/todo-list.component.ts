import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { ITodo } from '@app/todos/interfaces';
import { TodosService } from '@app/todos/services/todos.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeTodo, updateTodo } from '../../state/todo.actions'
import { filterMode } from '../../state/todos.reducer';
export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}
@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnInit {
  newText: string;
  actionClass = '';
  filterMode = 'All';
  editIndex: number = -1;
  showEdit: boolean = false;
  list: any = [];
  newList: any = []
  todos$: Observable<ITodosState>;
  constructor(private store: Store<{ todos: ITodosState }>, private todosService: TodosService, private _cdr: ChangeDetectorRef) {
    this.todos$ = store.select('todos');
  }
  ngOnInit() {
    this.todos$
   
  }

  removeItem(i) {
    this.todosService.removeTodo(i);
  }
  completeTask(i) {
    this.todosService.toggleCompleted(i);
  }
  editTodo(l, i) {
    this.showEdit = true;
    this.editIndex = i;
    this.newText = l.text;
  }
  textchange(e, i) {
    if (e.keyCode == 13) { 
      this.todosService.updateTodo(i, this.newText);
      this.editIndex = -1;
    }
   
  }
}
