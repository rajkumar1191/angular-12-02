import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalChildComponent } from './signal-child';

@Component({
    selector: 'app-signals-tutorial',
    standalone: true,
    imports: [CommonModule, FormsModule, SignalChildComponent],
    templateUrl: './signals-tutorial.html',
    styleUrl: './signals-tutorial.css'
})
export class SignalsTutorial {
    // ==========================================
    // 1. BASIC SIGNALS (`signal()`)
    // ==========================================

    // Writable Signals
    firstName = signal('John');
    lastName = signal('Doe');
    quantity = signal(1);
    price = signal(19.99);

    // Array Signal
    todos = signal<{ id: number, text: string, done: boolean }[]>([
        { id: 1, text: 'Learn Angular Signals', done: true },
        { id: 2, text: 'Master Deferrable Views', done: false }
    ]);

    // ==========================================
    // 2. COMPUTED SIGNALS (`computed()`)
    // ==========================================
    // Automatically re-evaluates ONLY when dependencies change
    // Note: Computed signals are Read-Only!
    fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
    totalCost = computed(() => this.quantity() * this.price());

    // Advanced computation
    pendingTodosCount = computed(() => this.todos().filter(t => !t.done).length);

    // ==========================================
    // 3. EFFECT (`effect()`)
    // ==========================================
    effectLogs: string[] = [];

    constructor() {
        // effect() runs at least once, and then automatically re-runs whenever any signal read inside it changes.
        effect(() => {
            const currentName = this.fullName(); // Track this signal
            const cost = this.totalCost();       // Track this signal

            const logMsg = `[Effect Triggered] Name: ${currentName} | Cart Total: $${cost.toFixed(2)}`;
            console.log(logMsg);

            // We must avoid mutating signals inside effects directly without un-tracking, 
            // but just pushing to a standard array for display is okay in this context.
            // (Using setTimeout to bypass angular lifecycle check in dev mode for UI logs)
            setTimeout(() => this.effectLogs.unshift(logMsg));
            if (this.effectLogs.length > 5) this.effectLogs.pop();
        });
    }

    // --- Actions ---

    updateName(first: string, last: string) {
        this.firstName.set(first);
        this.lastName.set(last);
    }

    incrementQty() {
        // update() is useful when the new value depends on the previous value
        this.quantity.update(q => q + 1);
    }

    toggleTodo(id: number) {
        // Mutating arrays/objects inside signals requires creating a new reference 
        // or using update() carefully
        this.todos.update(currentTodos =>
            currentTodos.map(t => t.id === id ? { ...t, done: !t.done } : t)
        );
    }


    // ==========================================
    // 4. SIGNAL INPUTS, OUTPUTS, & MODELS
    // ==========================================

    // Value passed as an Input to the child
    parentMessage = signal('Hello from Parent!');

    // Used in Two-Way binding with the Child's model()
    sharedCounter = signal(5);

    // Captured from Child's Output signal
    lastPingFromChild = signal('No pings yet.');

    handleChildPing(evt: string) {
        this.lastPingFromChild.set(evt);
    }
}
