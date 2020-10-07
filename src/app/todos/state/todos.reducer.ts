import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import cloneDeep from 'lodash.clonedeep';
import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';
import { updateTodo } from './todo.actions';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{ text, completed: false }, ...existingState.todos],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      let todos = [...existingState.todos];
      const updatedTodos = JSON.parse(JSON.stringify(todos));
      updatedTodos[index].text = text;
      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      let todos = [...existingState.todos];
      const updatedTodos = JSON.parse(JSON.stringify(todos));
      updatedTodos[index].completed = !updatedTodos[index].completed;

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleAllCompleted, (existingState) => {
      let todos = [...existingState.todos];
      let updatedTodos = JSON.parse(JSON.stringify(todos));
      updatedTodos.forEach(element => {
        element.completed = true;
      });

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
