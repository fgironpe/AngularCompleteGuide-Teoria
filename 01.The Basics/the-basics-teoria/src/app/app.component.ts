import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the-basics-teoria';

/* Data Binding: Comunicación entre el código Typescript y el template:
    Output Data (TS => HTML)
    - Sting interpolation : {{data}}
    - Property Binding: [property]="data"
    React to (user) Events (HTML => TS)
    - Event Binding: (event)="expression"
*/

/* Directivas: Instrucciones en el DOM 
    - Las directivas que empiezan con * (como *ngIf o ngFor), son directivas estructurales, es decir, que cambian la estructura del DOM añadiendo o quitando elementos. 
*/

}
