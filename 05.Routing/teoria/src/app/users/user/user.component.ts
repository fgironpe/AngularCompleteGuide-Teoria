import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /*
      Este código carga los datos de la ruta, pero solo para la primera carga del componente.
      Si estás dentro del componente e intentas acceder a otro usuario en este caso, al estar cargado el componente
      no se refrescan los datos, ya que Angular establece como una pérdida de rendimiento tener que volver a renderizar otra vez
      el mismo componente.
    */
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    /*
      Con esta aproximación, nos suscribimos a los parámetros de la ruta, por lo que cada vez que cambien, se actualizará el valor
      y el componente se renderizará con los nuevos datos que le hemos pasado.
    */
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
