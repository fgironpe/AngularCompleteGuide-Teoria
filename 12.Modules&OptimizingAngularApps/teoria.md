# Módulos y Optimización de aplicaciones Angular

## Módulos

https://angular.io/guide/ngmodules
https://angular.io/guide/ngmodule-faq

### Definición

Son métodos para empaquetar juntas partes de una aplicación.

- Angular analiza  los `NgModules` para entender la aplicación y sus funcionalidades.
- Los módulos de Angular definen todos los bloques que usa tu aplicación: Componentes, Directivas, Servicios...
- Una aplicación requiere como mínimo de un módulo (`AppModule`), pero se puede dividir en varios.
- Las funcionalidades de Angular están incluidas en los módulos (FormsModule...) y se cargarán cuando sean necesarias.
- No podrás usar una funcionalidad o bloque sin incluirlo en un módulo.

### Estructura de un módulo:

- **declarations**: Es un array donde pondremos todos los componentes, directivas y pipes que usará nuestra aplicación.
- **imports**: Array que nos permite importar otros módulos dentro del módulo, es importante para poder dividir la aplicación en varios módulos.
- **providers**: Array donde se incluirán los servicios que serán inyectados en la aplicación, aunque también se podrá usar el objeto `{ provideIn: 'root' }` dentro del propio servicio para evitar añadirlo en el array.
- **bootstrap**: Es importante para inicializar la aplicación. Define qué componente está disponible en el `index.html`.
- **entryComponents**: Aquí se añaden los componentes que se crean a través de código (Componentes dinámicos). Le permite a Angular estar al tanto de cuando estos componentes tienen que ser creados programáticamente.
- **exports**: Todos los módulos son independientes y no se comunican entre ellos, por lo que en este array te permitirá exportar el módulo para que sus características puedan ser usadas en otros módulos que lo importen.

### Trabajando con varios módulos:

En vez de tener un módulo muy grande, podemos dividir la aplicación en varios módulos que contendrán componentes, directivas, pipes... que se usarán en áreas de la aplicación que tengan la misma funcionalidad (como por ejemplo el módulo de productos o de pedidos en una tienda online).

Esto hará que la aplicación gane rendimiento y que sea más fácil de mantener al tener todo más ordenado.

### Core Module

Sirve para limpiar un poco el AppModule, en este módulo irían los servicios en el caso de que estuvieran en el array de providers del `AppModule` (si no se han inyectado con el `{ provideIn: 'root'}` en el decorador `@Injectable` dentro del propio servicio).

Los servicios que irían aquí son los que se usan a nivel de aplicación (desde que la aplicación arranca), aunque es recomendable que tengan el `{ provideIn: 'root'}`, ya que con esto harías la misma función, aunque aquí también irían los `Interceptors` que no tienen la posibilidad de tener esa propiedad.

Los servicios no necesitan ser exportados (solo en las `declarations` a otros módulos es necesario), los servicios son automáticamente inyectados a nivel root.

## Lazy Loading

### Definición

Cuando se tiene la aplicación dividida, permite cargar el código de las áreas sólo cuando es realmente necesario.

Nos permite cargar menos código cuando la aplicación carga por primera vez y luego va descargando pequeños paquetes según va necesitándolos.

### Implementación

Para poder implementar Lazy Loading en un módulo, este tiene que tener sus propias rutas.

- En el fichero `app-routing.module` hay que crear un path al módulo:
    - `loadChildren` es una propiedad especial que permite a Angular cargar el código al que hace referencia cuando el usuario navegue a esa ruta, **esto sólo sería para versiones antiguas de Angular** .

        ```js
            { path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipesModule' }
        ```
    - En **versiones modernas**: 
        
        ```js
           { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) }
        ```

- En el `routing module` del módulo que se cargará tienes que tener un path vacío del que partirán las demás rutas hijas que tenga el módulo:

    ```js
        const routes: Routes = [
            {
                path: '',
                component: RecipesComponent,
                canActivate: [AuthGuard],
                children: [
                { path: '', component: RecipeStartComponent },
                { path: 'new', component: RecipeEditComponent },
                {
                    path: ':id',
                    component: RecipeDetailComponent,
                    resolve: [RecipesResolverService]
                },
                {
                    path: ':id/edit',
                    component: RecipeEditComponent,
                    resolve: [RecipesResolverService]
                }
                ]
            }
        ];
    ```

- Una vez hecho esto se tiene que eliminar el import del módulo del AppModule para que finalmente se cargue con Lazy Loading.

### Opmitizar Lazy Loading

Se pueden precargar los módulos con Lazy Loading para evitar el retraso que tendría al cargar si el módulo es muy grande o si la conexión a internet es lenta:

Para ellos, en el método `forRoot()` del `AppRoutingModule`, se tiene que agregar el siguiente parámetro:

```js
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
``` 

## Modulos y Servicios

- Se pueden proveer servicios en:

    - **AppModule**: 
        - Tanto en el array de imports como con el `provideIn: 'root`. Son servicios que están disponibles en toda la aplicación. Se usa la misma instancia del servicio para todos los componentes que lo usen (singleton). 
        - Usa el `root injector`.
        - Debería ser el comportamiento por defecto.

    - **AppComponent u otros componentes**: 
        - Sólo estarán disponibles para ese componente y sus hijos. Cada arbol del componente tendría su propia instancia del servicio, y dentro de cada arbol comparten la misma instancia. 
        - Usa el injector del componente específico.
        - Usarlo cuando el servicio sólo es relevante para ese arbol de componentes.

    - **Eager-loaded modules**: 
        - Es como si lo pusieras en el AppModule o con  el `provideIn: 'root'`. 
        - Usa el `root injector`.
        - Evitar

    - **Lazy-loaded modules**: 
        - Se carga una instancia única para el módulo. Si ese mismo servicio también está disponible elen `AppModule`, tendrá las dos instancias, la general y la del propio módulo. Esto puede causar comportamientos extraños en la aplicación, pero puede ser útil en algunos casos. 
        - Usa el `child injector`.
        - Usarlo sólo si quieres tener una instancia separada del servicio en el módulo, de otro modo habrá bugs extraños

    - Como regla general queremos que los servicios estén a nive de aplicación, a no ser que haya algún motivo para que puedan estar en algún módulo específico o en un módulo con `Lazy Load`.