import { Component, effect, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signal-child',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="child-box">
      <h4>Signal Child Component</h4>
      
      <!-- Reading a signal Input -->
      <p>Received Message (Signal Input): <strong>{{ message() }}</strong></p>
      
      <!-- Updating a Model -->
      <div class="form-group mt-2">
        <label>Update Shared Counter (Model Two-Way Binding):</label>
        <div class="flex-row">
          <button (click)="decrement()" class="btn btn-sm btn-outline">-</button>
          <span class="count-display">{{ countValue() }}</span>
          <button (click)="increment()" class="btn btn-sm btn-outline">+</button>
        </div>
      </div>
      
      <!-- Emitting an Output -->
      <button (click)="pingParent()" class="btn btn-sm btn-primary mt-2">Ping Parent (Signal Output)</button>
    </div>
  `,
    styles: [`
    .child-box { padding: 15px; border: 2px dashed #4299e1; border-radius: 8px; background: #ebf8ff; margin-top: 15px; }
    .child-box h4 { margin-top: 0; color: #2b6cb0; }
    .flex-row { display: flex; align-items: center; gap: 10px; }
    .count-display { font-weight: bold; font-size: 1.2rem; min-width: 30px; text-align: center; }
    .btn-outline { border: 1px solid #cbd5e0; background: white; padding: 4px 10px; cursor: pointer; border-radius: 4px;}
    .btn-outline:hover { background: #edf2f7; }
    .btn-primary { background: #3182ce; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;}
    .btn-primary:hover { background: #2b6cb0; }
    .mt-2 { margin-top: 10px; }
  `]
})
export class SignalChildComponent {
    // 1. Signal Input (Read-only, reactive, replaces @Input)
    message = input<string>('Default Message');

    // 2. Signal Model (Two-way binding, readable & writable, replaces @Input + @Output)
    countValue = model<number>(0);

    // 3. Signal Output (Replaces @Output + EventEmitter)
    onPing = output<string>();

    constructor() {
        // We can use an effect to log whenever the model changes (from either side!)
        effect(() => {
            console.log(`[SignalChild] Counter Model changed to: ${this.countValue()}`);
        });
    }

    increment() {
        // Update the model -> implicitly triggers output update up to parent
        this.countValue.update(c => c + 1);
    }

    decrement() {
        this.countValue.update(c => c - 1);
    }

    pingParent() {
        // Emit a value
        this.onPing.emit(`Child Pinged at ${new Date().toLocaleTimeString()}!`);
    }
}
