import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * 3. SHARED STATE SERVICE
 * This service acts as a single source of truth for UI state or shared data.
 * Being 'root' provided, all components get the EXACT same instance (Singleton).
 */
@Injectable({
    providedIn: 'root'
})
export class SharedStateService {
    // BehaviorSubject holds the current value and emits to new subscribers immediately
    // subject, behaviorSubject, replaySubject and asyncSubject are different types of RxJS subjects with varying behaviors regarding value emission and subscription handling. BehaviorSubject is ideal for shared state as it always has a current value and emits it to new subscribers right away.
    private notificationCountSubject = new BehaviorSubject<number>(0);

    // Expose as an observable so components can subscribe but not randomly emit values
    notificationCount$: Observable<number> = this.notificationCountSubject.asObservable();

    constructor() {
        console.log('[SharedStateService] Initialized as a Singleton');
    }

    incrementValue(): void {
        const currentValue = this.notificationCountSubject.value;
        this.notificationCountSubject.next(currentValue + 1);
    }

    reset(): void {
        this.notificationCountSubject.next(0);
    }
}
