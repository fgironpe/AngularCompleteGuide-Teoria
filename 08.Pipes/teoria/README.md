# Pipes

<https://angular.io/guide/pipes-overview>

## Pipes Parametrizadas:

```html
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }}</p>
```

## Combinar pipes

Se pone un pipe después de otro.

El orden importa, Angular carga los pipes de izquierda a derecha.

```html
{{ server.started | date: 'fullDate' | uppercase }}
```

## Pipes personalizadas

1. Se crea un fichero que contendrá el pipe con el siguiente nombre: 
    
    `nombrePipe.pipe.ts`

2. Dentro del fichero se crea una clase con el nombre del Pipe, que implementa la interfaz ```PipeTransform``` que contiene la función ```transform()```

    ```js
    export class ShortenPipe implements PipeTransform {
      transform(value: any, ...args: any) {
      }
    }
    ```

3. Se agrega el decorador ```@Pipe``` y se especifica el nombre del Pipe
    
    ```js
    @Pipe({
    name: 'shorten'
    })
    ```

4. Se agrega el Pipe al Array de Declarations en el app.module.

También se puede crear y omitir los pasos previos a través del CLI de Angular

    `ng g p nombrePipe`
    
## Pipes de filtrado

Se pueden crear pipes para filtrar listas, agregando un input para realizar el filtrado. 

El pipe en este caso no se pondría en un String Interpolation dentro del template, si no en un `*ngFor`

```html
    <p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }}</p>
```

## Pipes Puras e Impuras

Las pipes impuras se recalculan cada vez que el usuario cambia algo en la aplicación. Esto puede tener problemas de rendimiento cuando la cantidad de datos procesada es muy alta.

Para poder activar esta opción hay que agregar `pure: false` al decorador `@Pipe`:

```js
    @Pipe({
    name: 'shorten',
    pure: false
    })
    ```
