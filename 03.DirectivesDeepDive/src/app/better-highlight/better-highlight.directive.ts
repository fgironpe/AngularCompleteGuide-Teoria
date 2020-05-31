import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit {


  /* 
    - Permite agregar parámetros a la directiva, luego se pueden invocar desde la plantilla de la siguiente forma:
      <p appBetterHighlight [defaultColor]="'blue'" [highlightColor]="'transparent'".
    - Si dentro del parámetro del @Input le ponemos el mismo nombre que la directiva, podremos acceder a esta propiedad desde la plantilla únicamente poniendo el nombre
    de la directiva entre corchetes y el valor que se le quiere dar a la propiedad: <p [appBetterHighlight]="'red'" [defaultColor]="'blue'".
    - Es posible acortar la forma en la que llamamos a las propiedades de la directiva en la plantilla de la siguiente manera: <p appBetterHighlight defaultColor="blue">
      Se podrían quitar los corchetes que envuelven el nombre de la propiedad y también las comillas simples del valor de la propiedad en el caso de que ésta sea string.
  */
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';

  /* 
    Permite enlazar una propiedad para poder trabajar con ella, en este caso la propiedad backgroundColor de css.
  */
  @HostBinding('style.backgroundColor') backgroundColor: string;


  /* 
    elRef: Referencia al elemento del DOM al que afectará la directiva
    renderer: Permite acceder a las propiedades del elemento elRef de forma más segura sin tener que acceder directamente al DOM.
  */
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }

  /* 
    HostListener: Permite escuchar eventos y reaccionar a ellos de la forma que se progrme.
    Como parámetro tiene que estar entre comillas el nombre del evento al que queremos reaccionar
  */
  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

}
