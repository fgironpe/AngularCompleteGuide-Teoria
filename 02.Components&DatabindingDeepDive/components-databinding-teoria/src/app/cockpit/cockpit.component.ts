import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  /* 
    @Output: Permite pasar información (en este caso un evento) fuera del evento
    EventEmitter: Convierte la propiedad en un evento que puede ser lanzado por un método del componente.
  */
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();

  /* 
    Viewchild: Permite el total acceso a una referencia local (definida con #nombreReferenciaLocal en el template)
      a cualquier elemento del DOM, o incluso a otros componentes.
      Se le pasa como parámetro el nombre de la referencia local a la que queremos vincularlo. También puede ser otro componente:
        Referencia local: @ViewChild('nombreReferenciaLocal')
        Componente: @ViewChild(nombreComponenteComponent)   
  */
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  // newServerName = '';
  // newServerContent = '';

  constructor() { }

  /* 
    Ciclo de vida del Componente: Cuando Angular crea un componente (cuando se accede a él), Angular pasa por diferentes fases durante la creación
    del componente y nos da la oportunidad de ejecutar código dentro de esas fases.
    
    - Fases de ciclo de vida:
    
    1º - ngOnChanges: Se puede ejecutar más de una vez. Se ejecuta al inicio cuando el componente se crea, pero también es llamado
    cuando cualquiera de las propiedades enlazadas a él cambian (las propiedades con el decorador @Input).

    2º - ngOnInit: Se ejecuta cuando el componenente ha sido inicializado. Aún no se puede ver el componente (no ha sido agregado al DOM), 
    pero Angular ha finalizado la inicialización básica, desde la que se pueden acceder a las propiedades.
    ngOnInit se ejecuta después del constructor.
    
    3º - ngDoCheck: Se ejecuta cada vez que la detección de cambios es ejecutada.
    La detección de cambios es el sistema por el cual Angular determina si se ha cambiado algo en un componente ya sea que se necesite cambiar algo
    algo en el template. Si una propiedad dentro del componente cambia de valor y esa propiedad de muestra en el template, Angular necesita procesar
    de nuevo esa parte de la plantilla y ngDoCheck es ejecutado en cada comprobación que realiza Angular, haya cambios o no, ya que reacciona a
    a cada evento que se ejecuta en el componente.
    ngOnDoCheck se puede usar si queire hacer algo en cada detección del ciclo, como informar a Angular sobre algún cambio que no pudiera
    detectar de alguna otra manera.

    4º - ngAfterContentInit: Se llama cada vez que el contenido que se proyecta via ng-content se ha inicializado, no en la vista del componente
    en sí, si no en la vista del componente padre, especualmente la parte que se agregará a nuestro componente a través de ng-content.
    ngAfterContentInit se ejecuta cada vez que la detección de cambios verifica este contenido que estamos proyectando en nuestro componente.

    5º - ngAfterViewInit: Se ejecuta cuando la vista de nuestro componente (template) ha terminado de inicializarse (ha sido procesada)

    6º - ngAfterViewChecked: Se ejecuta cada vez que se ha comprobado la vista, por lo que una vez que estamos seguros de que todos los cambios 
    que se tuvieron que hacer se muestran en la vista, o Angular no detectó ningún cambio.
    
    7º - ngOnDestroy: Si se destruye un componente (por ejemplo si se ha colocado un ngIf y se establece como false, y por lo tanto es
    eliminado del DOM), se llama a ngOnDestroy, que es un gran lugar para hacer un trabajo de limpieza porque es llamado justo antes de que el 
    componente se haya destruído por Angular.

  */

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    /* emit(), lanza el evento serverCreated */
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      blueprintName: nameInput.value,
      blueprintContent: this.serverContentInput.nativeElement.value
    });
  }

}
