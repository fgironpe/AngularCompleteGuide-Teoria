import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  /* 
    Se tiene que poner la condición como un @Input y se tiene que llamar igual que la directiva.
    Este @Input es un setter de la propiedad, por lo que puede funcionar como un método que se ejecuta cada vez que la propiedad cambia fuera de la directiva
  */
  @Input() appUnless(condition: boolean) {
    if(!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  /* 
    - TemplateRef: Permite acceder a las propiedades elemento de la plantilla que queramos modificar, eliminar o crear.
    - ViewContainer: Marca el lugar donde ponemos la directiva dentro de la plantilla
  */
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
