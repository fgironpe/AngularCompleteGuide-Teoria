import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  serverElements = [
    {
      type: 'server',
      name: 'Testserver',
      content: 'Just a test'
    }
  ];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {blueprintName: string, blueprintContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.blueprintName,
      content: blueprintData.blueprintContent
    });
  }

  /* Método para probar ngOnChanges, cada vez que se pulse el botón, se llamará a ngOnChanges 
     y nos devolverá el objeto name que tiene el decorador @Input */
  onChangesFirst() {
    this.serverElements[0].name = "Changed!";
  }

  onDestroyFirst() {
    this.serverElements.splice(0,1);
  }
 
}
