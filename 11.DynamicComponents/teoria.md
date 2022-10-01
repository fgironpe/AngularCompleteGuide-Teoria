# Componentes Dinámicos

Son componentes que se crean dinámicamente en tiempo de ejecución.

Por ejemplo alertas, modales u otros elementos que se crean cuando haces cierta acción.

## Funcionamiento de Componentes dinámicos

Hay dos formas de cargar un componente dinámicamente, en el template o programáticamente:

### Template:

- Es la forma más sencilla de cargar un componente dinámico, ya que sólo tendremos que tener el selector del componente con un `*ngIf` con la condición necesaria para crearlo.

#### Creación del componente

```html
    <app-alert [message]="error" *ngIf="error"></app-alert>
```

- Los datos necesarios del componente se establecen mediante property binding:
    - Template:

        ```js
            [message]="error"
        ```
    - Componente:

        ```js
            @Input() message: string;
        ```

#### Eliminar componente

Para ello tendremos que emitir un evento desde el que podrás enviar datos a otro componente según las necesidades.

También necesitaremos un método qué se ejecutará cuando se pulse un botón dentro del elemento dinámico o fuera de él donde se emirá el evento creado.

```js
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
```

En el componente desde el que se abre el componente dinámico tendremos que tener un método para poder resetear la condición necesaria para abrirlo:

- Template:

    ```html
        <app-alert [message]="error" *ngIf="error" (close)="onHandleError()"></app-alert>
    ```
- Componente:

    ```js
        onHandleError() {
            this.error = null;
        }
    ```

### Dynamic Component Loader

https://angular.io/guide/dynamic-component-loader

- Era una utilidad que ya no existe o no se debería usar.
- El componente se crea desde el código y luego se añade al DOM manualmente.
- Se tiene que controlar desde el código cómo se instancia, qué datos necesita, y cómo se elimina cuando no queremos mostrarlo.

#### Creación del Componente Dinámico

Crearemos un método en el que se creará el componente dinámico y que será llamado donde queramos que se genere.

Necesitamos instanciar el componente, para ello tendremos que inyectar la clase `ComponentFactoryResolver` en el componente:

```js
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
```

Dentro del método tenemos que llamar al método `resolveComponentFactory()`, al que pasamos por parámetro el componente dinámico que queremos crear y que nos devolverá un objeto de tipo `ComponentFactory`, que básicamente es un objeto que sabe cómo crear el componente.

Ya con la factoría podremos crear un componente concreto, pero también necesitaremos un lugar en el DOM al que poder adjuntarlo, y para ello le tendremos que decir a Angular conde irá el componente.

##### Adjuntar componente dinámico en el DOM

Angular necesita un `ViewContainerRef`, que es un objeto gestionado por Angular, que le da a Angular una referencia a un sitio en el DOM con el que podrá interactuar.

Para poder hacer esto es una buena práctica crear una directiva.

En esta directiva se inyectará el `ViewContainerRef` de forma pública para poder acceder es este desde fuera de la directiva.

Esto nos dará acceso a la referencia del lugar donde se usará la directiva, lo que nos dará información donde se usará la directiva, y en el que tendremos método que nos permitirán crear un componente en ese lugar por ejemplo.

Ahora seremos capaces de agregar la directiva en algún lugar de nuestro template y tener acceso a él con un `@Viewchild` y tener acceso al `ViewContainerRef` con la información del objeto.

- Directiva:
    
    ```js
        @Directive({
            selector: '[appPlaceholder]'
        })
        export class PlaceholderDirective {
        constructor(public viewContainerRef: ViewContainerRef) {}
        }
    ```

- Template:

    ```html
        <ng-template appPlaceholder></ng-template>
    ```

    `ng-template` no se renderiza directamente en el DOM, pero es accesible por Angular y podrá decidir cuáno crearlo.

- Componente:

    - Le pasamos un tipo que será la directiva que hemos creado. Esto hará que automáticamente Angular encuentre el primer sitio donde se use en el template del componente. Ahora tendremos acceso al `ViewContainerRef` desde el componente:

        ```js
            @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
        ```

    - Con el método `clear()` borramos todos los componentes que se han creado anteriormente en este lugar.

        ```js
            const hostViewContainerRef = this.alertHost.viewContainerRef;
            hostViewContainerRef.clear();
        ```

    - Creamos el componente pasándole la factoría que creamos anteriormente.
    
        ```js
            hostViewContainerRef.createComponent(alertCmpFactory);
        ```

    ```js
        private showErrorAlert(message: string) {
            const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
            const hostViewContainerRef = this.alertHost.viewContainerRef;
            hostViewContainerRef.clear();

            hostViewContainerRef.createComponent(alertCmpFactory);
        }
    ```

    #### Pasar datos al componente

    - Guardamos la creación del componente en una variable para poder interactuar con el componente:
        
        ```js
            const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        ```

    - Con la propiedad `instance` podremos acceder a la instancia concreta del componente que hemos creado y en el que podremos acceder a las propiedades internas del componente:
        
        ```js
            componentRef.instance.message = message;
        ```

    #### Cerrar el componente

    - Para cerrar el componente tendremos que susbribirnos al evento que creamos en el componente:
        
        ```js
            this.closeSub = componentRef.instance.closeAlert.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        ```