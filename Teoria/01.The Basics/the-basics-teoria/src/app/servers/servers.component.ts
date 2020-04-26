import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  /* template: `
    <app-server></app-server>
    <app-server></app-server>`, */
    templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  allowNewServer = false;
  serverCreated = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  servers = ['Testserver', 'Testserver2'];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 1000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Nma is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }

}
