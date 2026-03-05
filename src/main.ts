import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

/*
    directives:-
      Which allow use to change structure of the DOM. 
       - Change the appearance or behavior of an element, component, or another directive.
       - They are used to manipulate the DOM in a declarative way.
       - They can be applied to elements, attributes, and components.
      We have 3 types of directives:
        1. Structural Directives:-
          - *ngIf / @if
          - *ngFor / @for
          - *ngSwitch / @switch
        2. Attribute Directives:-
          - ngClass
          - ngStyle
        3. Component Directives:-
          - AppComponent


    Pipes:-
      Which allow us to transform data in the template.
       - They are used to transform data in a declarative way.
       - They can be applied to elements, attributes, and components.


    Change Detection:-
      Which is the mechanism that Angular uses to update the view when the model changes.
       - It is a process that runs after every asynchronous event (like user input, HTTP requests, timers, etc.) to check if the model has changed and update the view accordingly.
       - Angular uses a unidirectional data flow, which means that changes in the model will automatically update the view, but changes in the view will not automatically update the model unless explicitly bound (e.g., using ngModel for two-way binding).
       - Angular's change detection can be optimized using techniques like OnPush change detection strategy and immutability.

       Strategies:
        1. Default: Angular checks every component in the component tree for changes.
        2. OnPush: Angular only checks a component when its input properties change or when an event is emitted from the component itself.

    Signals:-
      Which are a new reactive primitive in Angular that allow us to manage state and reactivity in a more efficient and declarative way.
       - They are used to create reactive state that can be shared across components and services.
       - They can be created using the `signal()` function and can be read using the `computed()` function.
       - They can be used to create effects that automatically re-run when their dependencies change using the `effect()` function.
       - They provide a more fine-grained reactivity model compared to traditional Angular change detection, allowing for better performance and more predictable updates.
       
    RXJS:-
        Which is a library for reactive programming using Observables, providing a powerful way to manage asynchronous data streams and events in Angular applications.
        
    Observable:-
      Which is a core part of Angular's reactive programming model, allowing us to work with asynchronous data streams.
       - They are used to handle asynchronous operations such as HTTP requests, user input events, and more.
       - They can be created using the `Observable` class from the RxJS library and can be subscribed to in order to receive data updates.
       - They provide a powerful way to manage complex asynchronous workflows, including operators for transforming, filtering, and combining streams of data.

    Observers:-
      Which are objects that subscribe to Observables to receive data updates.
       - They define how to handle the data emitted by an Observable, including handling of next values, errors, and completion.
       - They can be created using the `Observer` interface from the RxJS library and can be passed to the `subscribe()` method of an Observable.

    Subscription:-
      Which is an object that represents the execution of an Observable and allows us to manage the lifecycle of the subscription.
       - It can be used to unsubscribe from an Observable to prevent memory leaks and stop receiving updates when they are no longer needed.
       - It can be created by calling the `subscribe()` method on an Observable, which returns a Subscription object that can be used to unsubscribe later.

    Operators:-
      Which are functions that allow us to transform, filter, and combine Observables in a declarative way.
       - They are used to manipulate the data emitted by Observables, allowing us to create complex asynchronous workflows.
       - They can be imported from the RxJS library and used in a pipeable manner with the `pipe()` method of an Observable.

    Subjects:-
      Which are a special type of Observable that allow us to multicast values to multiple observers.
       - They can be used to create a shared data source that multiple components can subscribe to and receive updates from.
       - They can be created using the `Subject` class from the RxJS library and can be used to emit values to all subscribed observers.  


    switchMap:-
      Which is an RxJS operator that allows us to switch to a new Observable when a new value is emitted from the source Observable.
       - It is used to handle scenarios where we want to cancel the previous Observable and switch to a new one when a new value is emitted.
       - It is commonly used in scenarios like search functionality, where we want to cancel the previous search request and start a new one when the user types a new query.
      `

    mergeMap:-
      Which is an RxJS operator that allows us to merge multiple Observables into a single Observable.
       - It is used to handle scenarios where we want to combine the results of multiple Observables into a single stream of data.
       - It is commonly used in scenarios like handling multiple HTTP requests and combining their results.

    concatMap:-
      Which is an RxJS operator that allows us to concatenate multiple Observables into a single Observable.
       - It is used to handle scenarios where we want to execute multiple Observables in sequence, waiting for each one to complete before starting the next one.
       - It is commonly used in scenarios like handling a series of dependent HTTP requests.  

    exhaustMap:-
      Which is an RxJS operator that allows us to ignore new values emitted from the source Observable while a previous Observable is still executing.
       - It is used to handle scenarios where we want to ignore new values until the current Observable has completed, such as in scenarios like form submission where we want to prevent multiple submissions while a request is still in progress.

    
    BehaviorSubject:-
      Which is a type of Subject that requires an initial value and emits its current value to new subscribers.
       - It is used to represent a value that changes over time and can be observed by multiple components or services.
       - It provides a way to store and emit the current state of a value, allowing new subscribers to receive the latest value immediately upon subscription.

    ReplaySubject:-
      Which is a type of Subject that can buffer a specified number of values and replay them to new subscribers.
        - It is used to represent a value that changes over time and can be observed by multiple components or services, while also allowing new subscribers to receive a specified number of previous values upon subscription.

    AsyncSubject:-
      Which is a type of Subject that only emits the last value to its subscribers when the Observable completes.
       - It is used to represent a value that is only relevant when the Observable completes, such as in scenarios like handling the result of an HTTP request where we only care about the final response.

    pipe:-
      Which is a method that allows us to chain multiple RxJS operators together in a declarative way.
        - It is used to create complex asynchronous workflows by combining multiple operators in a readable and maintainable way.

    tap:-
      Which is an RxJS operator that allows us to perform side effects for notifications from the source Observable.
       - It is used to perform actions such as logging, debugging, or updating external state without affecting the values emitted by the Observable.

    forkJoin:-
      Which is an RxJS operator that allows us to combine multiple Observables and wait for all of them to complete before emitting a single value.
       - It is used to handle scenarios where we want to execute multiple Observables in parallel and wait for all of them to complete before proceeding, such as in scenarios like making multiple HTTP requests and waiting for all responses before updating the UI.

    combineLatest:-
      Which is an RxJS operator that allows us to combine the latest values from multiple Observables and emit a new value whenever any of the source Observables emit a new value.
        - It is used to handle scenarios where we want to combine the latest values from multiple Observables, such as in scenarios like combining user input from multiple form fields.

      debounceTime:-
        Which is an RxJS operator that allows us to delay the emission of values from an Observable by a specified amount of time.
         - It is used to handle scenarios where we want to wait for a certain amount of time before emitting a value, such as in search functionality to avoid making too many requests while the user is typing.

      
    
  */
