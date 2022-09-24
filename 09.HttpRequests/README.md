# HTTP

https://angular.io/guide/http

## Headers

Cuando se configura una petición Http, a veces se necesitan cabeceras personalizadas, por ejemplo cuando el back end necesita autorización o necesitas adjuntar un `Content-Type`...

Todos los métodos Http tienen un segundo argumento que es un objeto donde puedes configurar la petición, y dentro hay un objeto `headers`, en el que se creará una instancia de `HttpHeaders` donde se podrán agregar cabeceras que se necesiten:

```js
this.http
    .get<{ [key: string]: Post }>(
    'url',
    {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' })
    }
    )
```

## Query Parameters

Dependiendo del API al que se esté apuntando puede ser necesario enviar Query Parameters.

Esto podría hacerse directamente dentro de la url: `http://url?param=value`, pero es más conveniente hacerlo de la manera que se explicará a continuación.

Para configurarlos, dentro del segundo parámetro de la petición (`options`, donde se agregan las cabeceras), agregamos el parámetro `params` en el que crearemos una instancia de `HttpParams`, que tiene el método `.set()` en el que podremos establecer el nombre y el valor:

```js
this.http
    .get<{ [key: string]: Post }>(
    'url',
    {
        params: new HttpParams().set('print', 'pretty')
    }
    )
```

Se pueden agregar varios parámetros a la petición de la siguiente manera:

```js
let searchParams = new HttpParams();
searchParams = searchParams.append('print', 'pretty');
searchParams = searchParams.append('custom', 'key');

this.http
    .get<{ [key: string]: Post }>(
    'url',
    {
        params: searchParams
    }
    )
```

## Observando diferentes tipos de respuesta

Hay veces que necesitas acceder al objeto entero de la respuesta en vez de solo el body de la misma para poder formatearlo y mostrarlo en la UI.

En estos casos, se puede cambiar la forma en la que Angular recoge la respuesta y solicitar a angular que en vez de darte los datos extraidos y formateados, darte el objeto de respuesta completo.

Para hacer esto, en la petición Http, en el argumento `options`, tendremos que usar el parámetro `observe`, que tiene varios tipos:

```observe?: 'body' | 'events' | 'response'```

- Body: Devuelve un observable de `<T>` con el mismo `T` de tipo de `body`. Lo que hace es que obtienes los datos de la respuesta extraídos y convertidos a JSON. Es la opción por defecto.
    
- Response: Devuelve un observable de tipo `HttpResponse<T>`, donde el parámetro 'T' depende del tipo de respuesta y cualquier parámetro de tipo proporcionado opcionalmente. Lo que hace es devolver el objeto de respuesta completo (con el body y la cabecera).

- Events: Devuelve un observable del flujo `HttpEvent` sin procesar, incluidos los eventos de progreso de forma predeterminada. Lo que hace es devolver dos eventos (objetos):
    - Un objeto de tipo enum en el que nos indica el tipo de evento que se está devolviendo dependiendo del número que se retorna:

    ```json
        { type: 0 }
    ```

    - Se puede controlar lo que quieres que haga la aplicación dependiendo del tipo de respuesta que obtenga comparándola con cualquier parámetro del tipo `HttpEventType`:

        ```js
            this.http
                .delete(
                    'https://ng-complete-guide-6d845-default-rtdb.europe-west1.firebasedatabase.app/post.json',
                    {
                    observe: 'events'
                    }
                ).pipe(tap(event => {
                    console.log("event => ", event);
                    if (event.type === HttpEventType.Sent) {
                    // Hacer cosas mientras la solicitud se está enviando
                    }
                    if (event.type === HttpEventType.Response) {
                    console.log("eventBody => ", event.body)
                    }
                }));
        ```

    - Un objeto de tipo `HttpResponse` con la respuesta completa (igual que en el tipo `observe: 'response'`)

## Cambiar el tipo de `ResponseBody`

Puedes cambiar el tipo de respuesta que recibes. Por defecto es en JSON, y esto dice a angular que automáticamente convierta la respuesta a este formato.
Pero puedes cambiar el tipo de respuesta si no necesitas un JSON, por ejemplo a `blob` si quieres recibir un fichero:

```responseType: 'arraybuffer' | 'blob' | 'json' | 'text'```

```js

this.http
    .get<{ [key: string]: Post }>(
        'url',
        {
            responseType: 'json'
        }
    )
```

## Interceptors

https://angular.io/guide/http#intercepting-requests-and-responses

Interceptan todas las peticiones Http que entran y salen de la aplicación para poder tratarlas.

Puede venir bien para por ejemplo tratar los errores que se devuelven del back de forma genérica, o si hay una cabecera especial que se tiene que enviar en todas las peticiones al back, se podría hacer dentro de un Interceptor.

El `Interceptor` implementa la interfaz `HttpInterceptor`, que contiene el método `intercept()`, que nos permitirá ejecutar código antes de que la petición se envíe:

`intercept()`: Tiene dos argumentos:

    - `req: HttpRequest<any>`: Un objeto request.
    - `next: HttpHandler`: Función que permite que la petición continúe y salga del inerceptor para que continúe su flujo.

```js
    import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

    export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request is on its way");
        return next.handle(req);
    }
    }
```

```return next.handle(req);``` Permite que la petición siga  su curso.

### Inyectar Interceptor

Los interceptores hay que inyectarlos como proveedores en un módulo (ya sea app u otro):

```js
    providers: [
        {
        provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
```

### Manipulando objetos de respuesta

Dentro de un interceptor, no sólo puedes bloquear datos, si no modificar los objetos de respuesta, aunque estos son inmutables.

Para poder modificarlo, hay que crear uno nuevo, en el que se llamará al método `clone()` de la clase `HttpRequest`, al que se le pasará un objeto donde se podrán sobreescribir los parámetros de la petición:

- Se puede establecer una nueva url:

    ```js
       const modifiedRequest = req.clone({ url: 'url' });
    ```

- Agregar nuevas cabeceras:
    ```js
       const modifiedRequest = req.clone({ headers: req.headers.append });
    ```

- Agregar nuevos parámetros o cualquier otra cosa que se le pueda modificar a una petición. 

### Interceptores de respuestas:

No sólo es posible interactuar con las peticiones en un Interceptor, si no que también puedes hacerlo con las respuestas.

Lo puedes hacer agregando algo al método `handle()` para poder manejar la respuesta, ya que el manejador (`handle()`) es un observable, lo que tiene sentido porque al final, las peticiones son observables a los que nos acabamos suscribiendo en otras partes de la aplicación.

Hay que agregar un `.pipe()`, para poder trabajar con los datos de la respuesta, que podremos modificar (con un `map()`), revisar (`tap()`) o hacer cualquier cosa con ella.



```js
    import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

    export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request is on its way");
        return next.handle(req).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
    }
```

### Multiples Interceptors.

El orden a la hora de implementarlos es importante, ya que será el orden en el que serán ejecutados.

Esto se hará en el fichero .module, en el que se definirá el orden según el que tengan dentro del array `providers`:

```js
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
  ],

```