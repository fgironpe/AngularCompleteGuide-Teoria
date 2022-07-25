# Reactive Forms

Para Angular un formulario es un grupo de Form Controls.

## Creación del formulario

### En el componente:
```js
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({});
  }
```
A ```FormGroup``` se le pasa un objeto con todos los controles que tendrá el formulario:
```js
  this.signupForm = new FormGroup({
    'username': new FormControl(null),
    'email': new FormControl(null),
    'gender': new FormControl('male')
  });
```

```FormControl```: Tiene 3 argumentos:
  - Estado del formulario: aquí se le puede asignar el valor por defecto a cada control.
  - Array de validaciones: Las validaciones que tendrá el control.
  - Array de validaciones asíncronas.

### En el template

En la etiqueta form tenemos que agregar la directiva ```[formGroup]="signupForm"``` y asociarla con el formulario
generado en el componente:
```html
  <form [formGroup]="signupForm">
```

En cada input hay que agregar la directiva ```formControlName="username"``` y asociarla con el control que se
ha definido en el componente:
```html
  <input
    type="text"
    id="email"
    class="form-control"
    formControlName="email">
```

## Envío del formulario

Para enviar el formulario se hace igual que en el Template Driven Form, agregando la directiva ```(ngSubmit)```
al elemento form. La diferencia es que no hace falta pasarle la referencia del formulario a la función, ya que
el formulario ya está creado en el componente.

```html
  <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
```

## Validaciones

Las validaciones se hacen directamente en el componente, cuando se crea el control. Angular comprueba en cada
cambio en el formulario el estado del mismo, cambiándolo según interactuamos con los controles:
```js
  this.signupForm = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'gender': new FormControl('male')
  });
```

## Acceso a los controles

Se puede acceder a los controles del formulario mediante el método get del formGroup y pasándole el nombre del control,
tanto en el componente como en el template:

```this.signupForm.get('username')```

## Agrupar controles

### Dentro del componente

Dentro del ```formGroup``` podemos poner todos los ```formGroup``` que queramos y meter dentro los controles que 
pertenecerán al grupo:

```js
  this.signupForm = new FormGroup({
    'userData': new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    }),
    'gender': new FormControl('male')
});
```

### En el template

Hay que envolver a los controles que pertenecerán al nuevo grupo en un div u otro elemento de html con la directiva
```formGroupName="userData"``` asociándola al grupo que se ha creado dentro del formulario.

Ahora para poder acceder a los controles del grupo hay que poner el path dentro del formulario de la siguiente manera:
```formGroup.control```:

```html
  signupForm.get('userData.email')
```

## Array de FormControls

Se pueden crear dinámicamente nuevos controles metiéndolos en un ```FormArray```:

### En el componente:

```js
   this.signupForm = new FormGroup({
    'userData': new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    }),
    'gender': new FormControl('male'),
    'hobbies': new FormArray([])
  });
```

Para acceder a los controles del ```formArray``` podemos crear un getter dentro del componente para poder así 
acceder de forma más legible a estos tanto en el componente como en el template:

```js
  get hobbiesControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
```

Podemos crear una función para poder crear nuevos controles dentro del ```formArray``` dinámicamente y 
asignarla a un botón dentro del template:

```js
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
```

### En el template:

Igual que en los ```formGroups``` hay que envolver al ```formArray``` dentro de un elemento html con la directiva
```formArrayName="hobbies"``` y asociarla al nombre del ```formArray```, aparte necesitaremos recorrer el array:

```html
  <div formArrayName="hobbies">
    <h4>Your Hobbies</h4>
    <button class="btn btn-primary" type="button" (click)="onAddHobby()">Add Hobby</button>
    <div class="form-group" *ngFor="let hobbyControl of hobbiesControls; let i = index">
      <input type="text" class="form-control" [formControlName]="i">
    </div>
  </div>
```

## Custom Validators

Un Validator es una función que Angular ejecuta automáticamente cuando comprueba si el control es válido, 
y lo hace cada vez que cambia el control.

La función recibe como argumento el propio control, de tipo ```FormControl```, y también necesita devolver algo
para que Angular pueda realizar las comprobaciones correctamente, que será un objeto con el siguiente formato:
``` { [s: string]: boolean } ```: 

```js
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } else {
      return null;
    }
  }
```

Para agregar la validación al control:

```js
  'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
```

## Async Validators

Cuando hay que hacer una validación y el datos está por ejemplo en una base de datos y se tardaría tiempo en 
poder realizarla, se usan los async validators:

```js
  'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails]),
```

Para crear un custom async validator tendremos una función que toma como argumento el control y devuelve una
promesa o un observable:

```js
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  const promise = new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (control.value === 'test@test.com') {
        resolve({ 'emailIsForbidden': true });
      } else {
        return null;
      }
    }, 1500);
  });
  return promise;
}
```

## Reaccionar al estado (valueChanges y statusChanges)

valueChanges: Se ejecuta cada vez que un control cambia.
statusChanges: Comprueba los cambios de estado del formulario o de un control individual.

## Cambiar valores de los controles

Se usan las funciones ```setValue()``` y ```patchValue()``` igual que en el Template Driven Form
