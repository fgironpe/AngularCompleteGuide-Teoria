import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username: string = "";
  usernameMax: string = "";

  // Mi solución
  onResetUsername() {
    this.username="";
  }

  // Solución Profesor

}
