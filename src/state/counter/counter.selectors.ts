import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

// Select the specific feature slice from the global state
export const selectCounterState = createFeatureSelector<CounterState>('counter');

// Select specific properties from the feature slice
export const selectCount = createSelector(
    selectCounterState,
    (state: CounterState) => state.count
);

export const selectCounterLoading = createSelector(
    selectCounterState,
    (state: CounterState) => state.loading
);

export const selectCounterError = createSelector(
    selectCounterState,
    (state: CounterState) => state.error
);
