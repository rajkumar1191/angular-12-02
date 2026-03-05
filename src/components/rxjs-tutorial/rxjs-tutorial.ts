import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    Subject,
    Observable,
    of,
    interval,
    timer,
    forkJoin,
    combineLatest,
    merge,
    throwError
} from 'rxjs';
import {
    map,
    filter,
    switchMap,
    mergeMap,
    concatMap,
    exhaustMap,
    debounceTime,
    distinctUntilChanged,
    takeUntil,
    catchError,
    retry,
    delay,
    take
} from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-tutorial',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './rxjs-tutorial.html',
    styleUrl: './rxjs-tutorial.css'
})
export class RxjsTutorial implements OnInit, OnDestroy {
    // --- 1. Higher-Order Mapping Operators ---
    mapLogs: string[] = [];

    // Real world use case Subjects usually bound to a button click
    private switchMapSubject = new Subject<number>();
    private mergeMapSubject = new Subject<number>();
    private concatMapSubject = new Subject<number>();
    private exhaustMapSubject = new Subject<number>();

    // behaviorSubject and replaysubject 

    // private behaviorSubject = new BehaviorSubject<string>('Initial Value');
    // private replaySubject = new ReplaySubject<string>(2); // Buffer size of 2
    // private asyncSubject = new AsyncSubject<string>();


    // --- 2. Filtering Operators ---
    searchInput = '';
    private searchSubject = new Subject<string>();
    searchLogs: string[] = [];

    // Unsubscribe management
    private destroy$ = new Subject<void>();

    // --- 3. Combination Operators ---
    combineLogs: string[] = [];

    // --- 4. Error Handling ---
    errorLogs: string[] = [];

    ngOnInit() {
        this.setupMappingOperators();
        this.setupFilteringOperators();
    }

    ngOnDestroy() {
        // Unsubscribe from all open streams using takeUntil to prevent memory leaks
        this.destroy$.next();
        this.destroy$.complete();
    }

    // ==========================================
    // 1. HIGHER-ORDER MAPPING OPERATORS
    // ==========================================

    // Simulated API call taking 1.5 seconds
    private mockApiCall(id: number): Observable<string> {
        return of(`Data for Request #${id}`).pipe(delay(1500));
    }

    private setupMappingOperators() {
        // switchMap: Cancels previous requests. Ideal for search typeaheads.
        this.switchMapSubject.pipe(
            switchMap(id => this.mockApiCall(id)),
            takeUntil(this.destroy$)
        ).subscribe(res => this.logMap(`switchMap Result: ${res}`));

        // mergeMap (flatMap): Runs all requests concurrently in parallel. Ideal for bulk disjoint saves.
        this.mergeMapSubject.pipe(
            mergeMap(id => this.mockApiCall(id)),
            takeUntil(this.destroy$)
        ).subscribe(res => this.logMap(`mergeMap Result: ${res}`));

        // concatMap: Runs requests strictly in order, waiting for one to finish before starting the next.
        this.concatMapSubject.pipe(
            concatMap(id => this.mockApiCall(id)),
            takeUntil(this.destroy$)
        ).subscribe(res => this.logMap(`concatMap Result: ${res}`));

        // exhaustMap: Ignores new requests while a current request is pending. Ideal for login buttons.
        this.exhaustMapSubject.pipe(
            exhaustMap(id => this.mockApiCall(id)),
            takeUntil(this.destroy$)
        ).subscribe(res => this.logMap(`exhaustMap Result: ${res}`));
    }

    triggerMap(type: 'switch' | 'merge' | 'concat' | 'exhaust') {
        const reqId = Math.floor(Math.random() * 100);
        this.logMap(`--> Triggered ${type}Map Request #${reqId}`);

        switch (type) {
            case 'switch': this.switchMapSubject.next(reqId); break;
            case 'merge': this.mergeMapSubject.next(reqId); break;
            case 'concat': this.concatMapSubject.next(reqId); break;
            case 'exhaust': this.exhaustMapSubject.next(reqId); break;
        }
    }

    private logMap(msg: string) {
        this.mapLogs.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
        if (this.mapLogs.length > 8) this.mapLogs.pop();
    }

    // ==========================================
    // 2. FILTERING OPERATORS
    // ==========================================

    onSearchChange(value: string) {
        this.searchSubject.next(value);
    }

    private setupFilteringOperators() {
        this.searchSubject.pipe(
            // Wait 500ms after the last keystroke before emitting
            debounceTime(500),
            // Only emit if the current value is different than the last emitted value
            distinctUntilChanged(),
            // Don't emit empty strings
            filter(val => val.trim().length > 0),
            // Automatically clean up when component is destroyed
            takeUntil(this.destroy$)
        ).subscribe(searchTerm => {
            this.searchLogs.unshift(`[🔍 Searching API for]: "${searchTerm}"`);
        });
    }

    // ==========================================
    // 3. COMBINATION OPERATORS
    // ==========================================

    runForkJoin() {
        this.combineLogs.unshift(`[forkJoin] Starting... waiting for ALL to complete.`);

        // forkJoin waits for all Observables to COMPLETE, then issues a single array of last values.
        forkJoin({
            users: of([{ name: 'John' }]).pipe(delay(1000)),
            roles: of(['Admin', 'User']).pipe(delay(2000)),
            settings: of({ theme: 'dark' }).pipe(delay(500))
        }).pipe(take(1)).subscribe(res => {
            this.combineLogs.unshift(`[forkJoin] DONE. Got users, roles, and settings together!`);
        });
    }

    runCombineLatest() {
        this.combineLogs.unshift(`[combineLatest] Starting... waiting for at least 1 emission from all.`);

        // combineLatest emits an array whenever ANY observable emits, as long as ALL have emitted at least once.
        const obs1$ = interval(1000).pipe(map(v => `T1-${v}`), take(4));
        const obs2$ = interval(1500).pipe(map(v => `T2-${v}`), take(3));

        combineLatest([obs1$, obs2$]).subscribe(([val1, val2]) => {
            this.combineLogs.unshift(`[combineLatest] Emitted: [${val1}, ${val2}]`);
        });
    }

    runMerge() {
        this.combineLogs.unshift(`[merge] Interleaving multiple streams...`);

        // merge simply funnels multiple observable outputs into a single stream as they happen.
        const fast$ = interval(500).pipe(map(v => `FAST-${v}`), take(4));
        const slow$ = interval(1000).pipe(map(v => `SLOW-${v}`), take(3));

        merge(fast$, slow$).subscribe(res => {
            this.combineLogs.unshift(`[merge] Emitted: ${res}`);
        });
    }


    // ==========================================
    // 4. ERROR HANDLING
    // ==========================================

    private simulateFailingApi(retryAttempt = false): Observable<string> {
        return timer(500).pipe(
            switchMap(() => {
                // Assume it always fails
                return throwError(() => new Error('500 Internal Server Error'));
            })
        );
    }

    runCatchError() {
        this.errorLogs.unshift(`[catchError] Firing request...`);
        this.simulateFailingApi().pipe(
            catchError(err => {
                this.errorLogs.unshift(`[catchError] Intercepted Error: ${err.message}. Returning fallback data.`);
                // Returning a safe 'fallback' observable so the subscriber un-notices the crash
                return of('Fallback Cache Data');
            })
        ).subscribe(val => {
            this.errorLogs.unshift(`[catchError] Subscriber received: ${val}`);
        });
    }

    runRetry() {
        this.errorLogs.unshift(`[retry] Firing request that constantly fails...`);
        let attempts = 0;

        timer(500).pipe(
            switchMap(() => {
                attempts++;
                this.errorLogs.unshift(`[retry] API Attempt #${attempts}... Failed.`);
                return throwError(() => new Error('Network Timeout'));
            }),
            // Automatically resubscribe to the source Observable 2 more times (total 3 tries)
            retry(2),
            catchError(err => {
                this.errorLogs.unshift(`[retry] Finally gave up after retries. Error: ${err.message}`);
                return of('Final Failure State');
            })
        ).subscribe();
    }
}
