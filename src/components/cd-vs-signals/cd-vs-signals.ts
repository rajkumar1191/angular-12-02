import { Component, signal, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cd-vs-signals',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cd-vs-signals.html',
    styleUrl: './cd-vs-signals.css',
    // OnPush makes the component only check when @Inputs change, events fire inside it, or strict references change
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdVsSignals {
    // 1. Traditional Property (Requires Zone.js / event to trigger UI update)
    traditionalValue = 0;
    hideTraditionalChanges = false;

    // 2. Signal Property (Fine-grained reactivity, independent of component check cycle)
    signalValue = signal(0);

    constructor(private ngZone: NgZone) { }

    updateTraditional() {
        this.traditionalValue++;
        // Because a click event triggered this, Zone.js automatically fires change detection globally.
    }

    updateSignal() {
        // Signals tell Angular exactly which piece of UI to update, without walking the whole tree.
        this.signalValue.update(v => v + 1);
    }

    simulateAsyncOutsideZone() {
        // This simulates an API call or WebSocket event that happens OUTSIDE Angular's knowledge
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                // We update both values here, but Angular doesn't know about it natively
                this.traditionalValue++;
                this.signalValue.update(v => v + 1);

                // RESULT: 
                // traditionalValue will NOT update on the screen until you click something else.
                // signalValue WILL update on the screen in future Angular versions with zoneless, 
                // and safely sets the notification even if the component is OnPush.
            }, 1000);
        });
    }

    getRenderCount() {
        // This is a bad practice generally, but it demonstrates how often Angular runs Change Detection
        console.log('[CD vs Signals] Component Re-checked!');
        return new Date().toLocaleTimeString();
    }
}
