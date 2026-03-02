import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


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
       
        
  */