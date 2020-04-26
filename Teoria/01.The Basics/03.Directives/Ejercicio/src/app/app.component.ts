import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .whiteFont {
      color: white;
    }
  `]
})
export class AppComponent {
  title = 'the-basics-teoria';
  
  displaySecret = false;
  logs = [];

  onShowLog(event) {
    let log = (this.logs.length + 1)  + " => "  + Date();
    this.displaySecret = !this.displaySecret;
    this.logs.push(log)
  }
}
