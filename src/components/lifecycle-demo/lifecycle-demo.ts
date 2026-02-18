import {
    Component,
    OnInit,
    OnChanges,
    OnDestroy,
    AfterViewInit,
    AfterContentInit,
    SimpleChanges,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-lifecycle-demo',
    imports: [FormsModule],
    templateUrl: './lifecycle-demo.html',
    styleUrl: './lifecycle-demo.css'
})
export class LifecycleDemo {

    @Input() data: string = '';

    @Output() reset = new EventEmitter();

    /*

        Life cycle hooks present in Angular:-

        ngOnChanges - trigger before ngOnInit and whenever there is change happens to input properties. 

        ngOnInit - Call at component initize - fetch the data

        ngDoCheck - every change detection happen - array / object

        ngAfterContentInit - <ng-content> test content </ng-content> -> use to show projected content -> whether it got initialized or not 

        ngAfterContentChecked - whether all contents where projected or not

        ngAfterViewInit - 

        ngAfterViewChecked - 

        ngOnDestroy -> cancel if there any on going subscription present

    */

    constructor() {
        console.log('%c[LifecycleDemo] 1. Constructor called', 'color: blue');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('%c[LifecycleDemo] 2. ngOnChanges called', 'color: orange', changes);
    }

    ngOnInit(): void {
        console.log('%c[LifecycleDemo] 3. ngOnInit called', 'color: green');
    }

    ngAfterContentInit(): void {
        console.log('%c[LifecycleDemo] 4. ngAfterContentInit called', 'color: purple');
    }

    ngAfterViewInit(): void {
        console.log('%c[LifecycleDemo] 5. ngAfterViewInit called', 'color: red');
    }

    ngOnDestroy(): void {
        console.log('%c[LifecycleDemo] 6. ngOnDestroy called - Cleanup happening here!', 'color: black; background: yellow');
    }

    sendReset(): void{
        this.reset.emit('Initial Data');
    }
}
