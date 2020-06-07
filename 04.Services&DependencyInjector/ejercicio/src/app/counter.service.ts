import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService  {

    inactiveCount: number = 0;
    activeCount: number = 0;

    onAddActiveCount() {
        this.activeCount++;
        console.log("Inactive to active user count: ", this.activeCount);
    }

    onAddInactiveCount() {
        this.inactiveCount++;
        console.log("Active to inactive user count: ", this.inactiveCount);
    }

}