# FORMULARIOS

## Tipos de Formulario:

- Templated Driven Form:
  - Angular infiere el objeto del formulario desde el DOM
  - Son más sencillos que los Reactivos

- Reactive Forms:
  - Se crean programáticamente y se sincronizan con el DOM
  - Son más complejos
  - Te permiten personalizarlos de forma más completa
  - Puedes cambiar cada detalle del formulario
  
## TEMPLATE DRIVEN FORMS

Angular crea un formulario automáticamente cuando detecta una etiqueta ```form``` en el template.

El selector ```form``` hace de selector para alguna directiva de Angular con la que después crea una
representación en Javascript del formulario.

### Crear controles dentro del formulario

Para que Angular detecte que un input sea un control del formulario y queremos controlarlo, hay que agregarle
```[(ngModel]```, que luego hay que asociarlo a una variable dentro del componente: ```[(ngModel]="variable"```

### Enviar y usar el formulario

- Dentro del componente crearemos una función que se encargará de gestionar los datos del formulario que 
queramos enviar y enviarlos.

- Dentro de la etiqueta ```form``` del template tenemos que añadir el evento ```(ngSubmit)="funcion()"```.
Esto hará que cada vez que se pulse el botón de tipo submit del formulario ejecute esa función (que es la 
que se creará dentro del componente)

- Para poder acceder a las propiedades del formulario y poder trabajar con ellas dentro del componente 
hay que crear una referencia del formulario dentro de la etiqueta form del template y pasarla como argumento:  
```html
  <form (ngSubmit)="onSubmit(f)" #f="ngForm">
 ```
  -Dentro del componente:
  ```js
    onSubmit(form: NgForm) {}
 ```

### Acceder al formulario con el decorador ```@ViewChild```
También podemos crear una referencia del formulario dentro del componente mediante el decorador ```@ViewChild```,
que nos permitirá acceder a sus propiedades dentro del componente (y no sólo dentro de la función submit
como en el método anterior):

  ```js
    @ViewChild('f') signupForm: NgForm;
 ```

### Validaciones

Las validaciones se escriben en input dentro del template. Angular detectará las directivas de validación
y configurará el formulario:

```html
    <input
      type="email"
      id="email"
      class="form-control"
      ngModel
      name="email"
      required
      email>
 ```

En los siguientes enlaces se pueden consultar todas las directivas de validación de los formularios:
https://angular.io/api/forms/Validators

https://angular.io/api?type=directive

Según el usuario va modificando e interactuando con el formulario, Angular va agregando clases automáticamente
en los inputs como ```ng-dirty```, ```ng-touched``` o ```ng-valid```, que nos darán información acerca del
estado de cada control individual.

#### Cambiar el aspecto de los inputs según el estado:

Para cambiar el aspecto de los controles del formulario hay que modificar en el css las clases que va 
agregando Angular. Hay que ser muy explícito en cuanto a los selectores que hay que agregar en el css 
para que no afecte a otros controles dentro del formulario:

```css
    input.ng-invalid.ng-touched {
  border: 1px solid red;
}
 ```
En este caso sólo afectará a aquellos inputs que tengan el estado invalid y que hayan sido tocados. 
Si no se agrega la clase ng-touched, se mostrará el borde rojo en todos los inputs que tengan el estado 
invalid nada más cargue el formulario.

#### Agregar mensajes de estado en el template

Se pueden agregar mensajes de estado en el template para darle información al usuario de qué es lo que 
ha fallado, para ello, habrá que referenciar el input  para que podamos acceder desde el template a sus 
propiedades y luego tener un bloque con la condición que debe cumplir para mostrarse:

```html
  <input
    type="email"
    id="email"
    class="form-control"
    ngModel
    name="email"
    required
    email
    #email="ngModel">
  <span 
    class="help-block" 
    *ngIf="email.invalid && email.touched">Please, enter a valid e-mail!</span>
 ```

### Establecer valores por defecto
Para ello hay que asociar el ngModel a una variable con el valor en el componente:

html
```html
  <select
    id="secret"
    class="form-control"
    [ngModel]="defaultQuestion"
    name="secret">
    <option value="pet">Your first Pet?</option>
    <option value="teacher">Your first teacher?</option>
  </select>
 ```
componente:
 ```js
    defaultQuestion = 'pet';
 ```

###  ```Ngmodel```

- No binding ```ngModel```: Sólo indica que ese input es un control.
- One way binding ```[ngModel]```: Para poder dar un valor por defecto al control.
- Two Way Binding: Permite reacciones instantáneamente a los cambios en el control. 
O hacer lo que quieras con ese valor.

### Agrupando Form Controls

Podemos agrupar controles del formulario de la siguiente manera:
```html
  <div id="user-data" ngModelGroup="userData">
    <!-- Inputs que pertenecen al gruopo -->
  </div>
 ```

Esto nos agregará el grupo dentro de las propiedades del formulario, con el que podremos trabajar y hacer
validaciones conjuntas.

Para poder acceder a los datos del grupo dentro del template para poder hacer validaciones hay que agregar
una referencia e igualarla a ```ngModelGroup``:
```html
  <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
    <!-- Inputs que pertenecen al gruopo -->
  </div>
  <span 
    class="help-block" 
    *ngIf="userData.invalid && userData.touched">User Data is invalid!</span>
 ```

### Cambiar desde el componente el valor de los inputs:

Tenemos dos aproximaciones para hacer lo siguiente:

- El método setValue, en el que cambiaremos el valor de todos los inputs del formulario:
  
```js
  this.signupForm.setValue({
    userData: {
      username: suggestedName,
      email: ''
    },
    secret: 'pet',
    questionAnswer: '',
    gender: 'female'
  });
 ```

- El método patchValue, que nos permitirá modificar el valor de los inputs que elijamos:

  ```js
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  ```  
