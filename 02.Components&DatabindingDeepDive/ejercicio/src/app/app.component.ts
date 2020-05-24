import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public title = 'Assingnment 4';
  public oddList: number[] = [];
  public evenList: number[] = [];

  onDivideNumbers(number: number) {
    if(number %2 == 0) {
      this.evenList.push(number);
    }
    else {
      this.oddList.push(number);
    }
  }

}
