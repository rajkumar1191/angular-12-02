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

  */