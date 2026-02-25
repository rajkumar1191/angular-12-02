import { Injectable } from '@angular/core';

/**
 * 5. DI HIERARCHY / NON-SINGLETON (Component Level Service)
 * Notice there is NO `providedIn: 'root'` here.
 * If we provide this at the Component level (in the @Component providers array), 
 * every instance of that component will get its OWN instance of LoggerService.
 */
@Injectable()
export class LoggerService {
    messages: string[] = [];

    // Unique ID so we can track instance differences
    readonly instanceId = Math.floor(Math.random() * 10000);

    constructor() {
        console.log(`[LoggerService] Instance ${this.instanceId} created`);
    }

    log(msg: string) {
        const timestamp = new Date().toLocaleTimeString();
        this.messages.push(`[${timestamp}] ${msg}`);
    }

    clear() {
        this.messages = [];
    }
}
