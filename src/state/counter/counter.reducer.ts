import { createReducer, on } from '@ngrx/store';
import { initialCounterState } from './counter.state';
import * as CounterActions from './counter.actions';

export const counterReducer = createReducer(
    initialCounterState,

    // Basic Reducers
    on(CounterActions.increment, (state) => ({ ...state, count: state.count + 1 })), // ({ loading: false, error: null, count: 1 })
    on(CounterActions.decrement, (state) => ({ ...state, count: state.count - 1 })),
    on(CounterActions.reset, (state) => ({ ...state, count: 0 })),

    // Async Reducers
    on(CounterActions.loadCount, (state) => ({ ...state, loading: true, error: null })),
    on(CounterActions.loadCountSuccess, (state, { count }) => ({ ...state, count, loading: false })),
    on(CounterActions.loadCountFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
