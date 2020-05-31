import { Directive, ElementRef, OnInit } from "@angular/core";

/* 
    selector: Indica como tendremos que llamar a la direciva desde el html 
*/
@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

    /* 
        En el constructor le pasamos una referencia a un elemento (que será la referencia al elemento al que le ponemos la directiva en el html para poder acceder a sus propiedades)
    */
    constructor(private elementRef: ElementRef) {
    }

    /* 
        Accedemos a las propiedades del elemnto que se ha instanciado a la hora de crear la directiva en el constructor y podemos trabajar con ellas. Es recomendable tener la lógica de la
        direciva en el método OnInit antes que en el constructor.
    */
    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
        this.elementRef.nativeElement.style.color = 'white';
    }
}