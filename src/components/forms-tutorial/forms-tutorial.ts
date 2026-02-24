import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

// Custom Validator (Reactive Forms)
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
}

// Cross-field Validator (Reactive Forms)
export const identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get('name');
    const alterEgo = control.get('alterEgo');

    return name && alterEgo && name.value === alterEgo.value
        ? { identityRevealed: true } : null;
};

// Async Validator (Reactive Forms)
export function uniqueUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        // Simulate an API call to check if username is 'admin'
        return of(control.value).pipe(
            delay(1000), // simulate network latency
            map(username => (username === 'admin' ? { usernameTaken: true } : null))
        );
    };
}

@Component({
    selector: 'app-forms-tutorial',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './forms-tutorial.html',
    styleUrl: './forms-tutorial.css'
})
export class FormsTutorial {
    // ==========================================
    // 1. Template Driven Forms
    // ==========================================
    templateFormModel = {
        username: '',
        email: '',
        agreed: false
    };

    onSubmitTemplateDriven(form: any) {
        console.log('Template Driven Form Submitted:', form.value);
        if (form.valid) {
            alert('Template Form Submitted Successfully!\nCheck console for details.');
            form.resetForm();
        }
    }

    // ==========================================
    // 2. Reactive Forms
    // ==========================================

    // A. Standalone FormControl
    singleControl = new FormControl('Initial Value', [Validators.required, Validators.minLength(3)]);

    // B. FormGroup with FormBuilder
    profileForm: FormGroup;

    constructor(private fb: FormBuilder) {
        // Using FormBuilder to create the group concisely
        this.profileForm = this.fb.group({
            username: ['',
                // Synchronous Validators
                [Validators.required, Validators.minLength(4), forbiddenNameValidator(/bob/i)],
                // Asynchronous Validator
                [uniqueUsernameValidator()]
            ],
            email: ['', [Validators.required, Validators.email]],
            
            // Nested FormGroup for Cross-field Validation
            identities: this.fb.group({
                name: ['', Validators.required],
                alterEgo: ['']
            }, { validators: identityRevealedValidator }), // Apply cross-field validator here

            // Dynamic Forms: FormArray
            aliases: this.fb.array([
                this.fb.control('')
            ])
        });
    }

    // Getter for easy access to FormArray in the template
    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    addAlias() {
        this.aliases.push(this.fb.control(''));
    }

    removeAlias(index: number) {
        this.aliases.removeAt(index);
    }

    onSubmitReactive() {
        console.log('Reactive Form Submitted:', this.profileForm.value);
        if (this.profileForm.valid) {
            alert('Reactive Form Submitted Successfully!\nCheck console for details.');
            this.profileForm.reset();
        } else {
            // Mark all fields as touched to trigger validation messages
            this.profileForm.markAllAsTouched();
        }
    }
}
