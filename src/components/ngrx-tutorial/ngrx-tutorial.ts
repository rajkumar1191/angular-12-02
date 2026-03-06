import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CounterActions from '../../state/counter/counter.actions';
import { selectCount, selectCounterError, selectCounterLoading } from '../../state/counter/counter.selectors';

@Component({
  selector: 'app-ngrx-tutorial',
  imports: [],
  templateUrl: './ngrx-tutorial.html',
  styleUrl: './ngrx-tutorial.css',
})
export class NgrxTutorial {
  private store = inject(Store);

  // Using selectSignal for seamless integration with Angular Signals
  count = this.store.selectSignal(selectCount);
  loading = this.store.selectSignal(selectCounterLoading);
  error = this.store.selectSignal(selectCounterError);

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    this.store.dispatch(CounterActions.reset());
  }

  loadAsync() {
    this.store.dispatch(CounterActions.loadCount());
  }
}
