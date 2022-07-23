import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServers() {
    // Complex calculations
    this.router.navigate(['/servers']);
  }

  onLoadServer(id: number) {
    /*
    *   queryParams: Se le pasa un objeto por parámetro. Permite crear una url con distintos parámetros: ?allowEdit=1
    *   fragment: Se le pasa un string. Permite crear framentos en la url: #fragment
    * */
    this.router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '1' }, fragment: 'loading' });
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
  this.authService.logout();
  }

}
