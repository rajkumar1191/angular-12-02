import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsTutorial, forbiddenNameValidator } from './forms-tutorial';
import { FormControl } from '@angular/forms';

describe('FormsTutorial', () => {
    let component: FormsTutorial;
    let fixture: ComponentFixture<FormsTutorial>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsTutorial]
        }).compileComponents();

        fixture = TestBed.createComponent(FormsTutorial);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('forbiddenNameValidator should return error if name is forbidden', () => {
        const validator = forbiddenNameValidator(/bob/i);
        const control = new FormControl('Bob');
        expect(validator(control)).toEqual({ forbiddenName: { value: 'Bob' } });
    });

    it('forbiddenNameValidator should return null if name is valid', () => {
        const validator = forbiddenNameValidator(/bob/i);
        const control = new FormControl('Alice');
        expect(validator(control)).toBeNull();
    });

    it('should add an alias', () => {
        const initialLength = component.aliases.length;
        component.addAlias();
        expect(component.aliases.length).toBe(initialLength + 1);
    });

    it('should remove an alias', () => {
        component.addAlias();
        const lengthBeforeRemove = component.aliases.length;
        component.removeAlias(0);
        expect(component.aliases.length).toBe(lengthBeforeRemove - 1);
    });
});
