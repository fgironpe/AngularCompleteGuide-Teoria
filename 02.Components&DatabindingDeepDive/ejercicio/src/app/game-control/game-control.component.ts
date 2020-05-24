import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  public interval;
  public number = 0;
  @Output() numberIncrement: EventEmitter<number> = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onStartGame() {
    this.interval = setInterval(() => {
      this.numberIncrement.emit(this.number++);
    }, 1000);
  }

  onStopGame() {
    clearInterval(this.interval);
  }

}
