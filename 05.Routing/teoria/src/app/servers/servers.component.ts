import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: { id: number, name: string, status: string }[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    /*
      Programáticamente establecemos el componente al que queremos ir.
      relativeTo nos dice desde qué ruta partimos para poner la url
      ActivatedRoute: Si lo inyectamos en el constructor, hace saber al componente en qué ruta nos encontramos
    */
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
