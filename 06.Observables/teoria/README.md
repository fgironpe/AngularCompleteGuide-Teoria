# Observables

## ¿Qué es un observable?
 Un observable es una fuente de datos.

En un proyecto de Angular, un observable es un objeto que se importa de una librería de terceros llamada rxjs.

## Patrón Observable
Se implementa siguiendo el patrón observable, el que tenemos un observable y un observer, y entre ellos hay un 
flujo de datos, en el que se emiten multiples eventos o paquetes de datos desde el observable.

El observer se podría decir que es tu código, la función ```subscribe()```.

Dentro tienes 3 modos de manejar los paquetes de datos recibidos:
  - Puedes manejar los datos normales: ¿Qué sucederá cuando se recibe un nuevo paquete de datos?
  - Puedes manejar los errores: ¿Qué sucederá cuando recibimos un error?
  - Puedes manejar el completado del observable: ¿Qué sucederá cuando el observable se completa?

Los observables se usan para gestionar tareas asíncronas, debido a que todas las fuentes de datos, o eventos
que se desencadenan en tu código, o una petición HTTP son asíncronas, y no sabes cuando sucederán.

## Unsubscribe

Cuando tienes un observable que no es de Angular, sigue activo aun cuando cambias de componente, por lo que cuando
vuelves al componente en el que se encuentra, se activa de nuevo, teniendo dos observables activos (y así
cada vez que repites el proceso). Esto puede llevar a una fuga de memoria y ralentizar la aplicación, por lo que 
habría que eliminar la suscripción a ese observable.

```js

  private firstObsSubscription: Subscription;
  
  ngOnInit() {
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
  
```

Si usas un observable de Angular (como http o params), es Angular quien se encarga de hacer el unsubscribe. 

## Operators

Nos permiten filtrar o transformar los datos que recibimos en un observable.

### pipe()

Representa un flujo de datos y nos permite usar operators para filtrarlo o modificarlo.

### map()

Nos permite transformar los datos que recibimos del observable.

Usa una función como argumento que son los datos recibidos del Observable.

### filter()

Nos permite filtrar qué datos del observable queremos procesar o no.

### Otros

Hay muchos otros operatos más, que se pueden consultar en la página de rxjs:
https://rxjs.dev/guide/operators

```js

  this.firstObsSubscription = customIntervalObservable.pipe(
    filter(data => {
      return data > 0;
    }),
    map((data: number) => {
      return `Round ${ data + 1}`;
    }),
  ).subscribe(data => {
    console.log(data);
  }, error => {
    console.log(error);
    alert(error.message);
  }, () => {
    console.log('Completed!');
  });
  
```

## Subject

Es un tipo especial de Observable. Los observables son como pasivos, están a la escucha y cuando los datos cambian
emiten un evento que recogen los elementos suscritos a este. Sin embargo Subject también es un observable, pero 
es más activo, ya que puedes llamar al método next desde fuera del observable, y es perfecto para usarlo como
un EventEmitter, ya que es más eficiente y te permite usar operators.

Es recomendable hacer unsubscribe de los subjects una vez no los necesitas.

## Enlaces útiles:

Documentación oficial: https://rxjs-dev.firebaseapp.com/
Curso gratuito RXJS Youtube: https://academind.com/learn/javascript/understanding-rxjs/
