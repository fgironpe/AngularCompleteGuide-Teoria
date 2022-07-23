import { 
  Component, 
  OnInit, 
  Input, 
  OnChanges, 
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  /* @Input: Decorador que indica que esta propiedad puede ser compartida con otros componentes y viene desde otro componente.
  Se puede poner un alias dentro del paréntesis 
    para indicar el nombre con el que se quiere exportar la variable 
  */
  @Input('srvElement') element: {
    type: string,
    name: string,
    content: string
  }
  @Input() name: string;

  /* ViewChild: Permite acceder a componentes de la vista. */
  @ViewChild('heading', {static: true}) header: ElementRef;
  
  /* ContentChild: Permite acceder a elementos de la vista que son proyectados a este componente desde otro componente a través de ng-content */
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef; 

  constructor() { 
    console.log("contructor called!");
  }


  /*  
    Es lo primero en ejecutarse después del constructor, y también cuando unas de las propiedades @Input del componente cambia.
    Recibe un argumento de tipo SimpleChanges: Es un objeto que contiene las propiedades compartidas con @Input.
    Este método puede ser interesante para reaccionar ante cualquier cambio de las propiedades con @Input y poder
    tratar con los valores para almacenarlos antes del cambio.
  */
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called! => ", changes);

  }

  /* 
    Se ejecuta una vez el componente se ha inicializado (después del constructor).
    El componente aún no se ha agregado al DOM, por lo que aún no se vería, pero se puede acceder a las propiedades
    e inicializarlas en este método.
  */
  ngOnInit(): void {
    console.log("ngOnInit called!");
    console.log("heading ngOnInit => ", this.header.nativeElement.textContent);
    console.log("paragraph ngOnInit => ", this.paragraph.nativeElement.textContent);
  }

  /* 
    Se ejecuta en cada ejecución del detector de cambios de Angular.
    Se le llama cada vez que Angular busca algún cambio y hay un par de triggers que activan este método:
     - Cuando un evento es invocado cuando hacemos click.
     - Cuando una promesa nos devuelve algún dato.
    En éste método no es recomendable escribir código muy complejo porque el rendimiento de la app podría reducirse, 
    aunque es bastante eficiente.
    Este método es útil si se necesita comprobar o modificar algo de forma manual porque Angular no lo recogió.
  */
  ngDoCheck() {
    console.log("ngDoCheck called!");
  }

  /* 
    Sólo se llama una vez, cuando el contenido proyectado a través de ng-content se ha inicializado.
    No la vista del componente, si no la del padre.
    Nos permite acceder a los elementos de la vista que son proyectados desde el componente padre a nuestro
    componente y tienen el decorador de @ContentChild
  */
  ngAfterContentInit() {
    console.log("ngAfterViewContentInit called!");
    console.log("paragraph ngAfterContentInit => ", this.paragraph.nativeElement.textContent);
  }

  /*
    Se ejecuta cuando el detector de cambios comprueba el contenido que se ha proyectado en el componente.
    Se ejecuta después de DoCheck (después de cada ciclo de detección de cambios) */
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called!");
  }


  /* 
    Se ejecuta cuando la vista del componente se ha inicializado (cuando se ha renderizado)
    Nos permite acceder a los elementos de la vista (con @ViewChild)
  */
  ngAfterViewInit() {
    console.log("ngAfterViewInit called!");
    console.log("heading ngAfterViewInit=> ", this.header.nativeElement.textContent);
  }

  /* 
    Se ejecuta cada vez que la vista (o los hijos de la vista) han sido comprobados. 
    Cuando todos los cambios que se han tenido que hacer son renderizados en la vista o no se ha detectado ningún cambio.
  */
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called!");
  }

  /* 
    Se ejecuta antes de que un componente se destruya.
  */
  ngOnDestroy() {
    console.log("ngOnDestroy called!");
  }

}
