import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import * as CounterActions from './counter.actions';

@Injectable()
export class CounterEffects {
    private actions$ = inject(Actions);

    // Mock an HTTP request to load an initial count or a random count
    loadCount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CounterActions.loadCount),
            switchMap(() => {
                // Simulate network delay
                return of({ count: Math.floor(Math.random() * 100) }).pipe(
                    delay(1500),
                    map(response => CounterActions.loadCountSuccess({ count: response.count })),
                    // Simulate error handling conceptually, though this specific observable won't throw
                    catchError(error => of(CounterActions.loadCountFailure({ error: error.message })))
                );
            })
        );
    });
}
