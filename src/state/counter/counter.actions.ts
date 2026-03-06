import { createAction, props } from '@ngrx/store';

// Basic actions
export const increment = createAction('[Counter Tutorial] Increment');
export const decrement = createAction('[Counter Tutorial] Decrement');
export const reset = createAction('[Counter Tutorial] Reset');

// Async actions (to demonstrate @ngrx/effects)
export const loadCount = createAction('[Counter Tutorial] Load Count Base');
export const loadCountSuccess = createAction(
    '[Counter Tutorial] Load Count Success',
    props<{ count: number }>()
);
export const loadCountFailure = createAction(
    '[Counter Tutorial] Load Count Failure',
    props<{ error: string }>()
);
