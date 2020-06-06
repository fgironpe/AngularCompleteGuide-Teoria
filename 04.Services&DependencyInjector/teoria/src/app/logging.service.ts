export class LoggingService {

    /* 
        Un servicio es simplemente una clase de typescript, no hace falta decorador.
    */   
   /* 
        Injector de dependencias:
            - Una dependencia es una clase o algo de lo que se tiene dependencia: Por ejemplo una clase depende de otra cuando esa clase necesita
            utilizar un método de la otra. El injector de dependencias injecta una instancia de la clase en nuestro componente automáticamente.
            Todo lo que necesitamos hacer es informar a Anguolar de que necesitamos esa instancia.
            Para eso, necesitamos añadir un constructor a la clase donde queremos injectar la dependencia y pasarle como parámetro una instancia de la clase de la que se dependerá:
                constructor(private loggingService: LoggingService)
            Ahora Angular sabe que queremos injectar una dependencia, pero no sabe cómo hacerlo, para ello, necesitamos proveer un servicio. Proveer simplemente significa que le decimos
            a Angular como crear el servicio.
            Para proveer el servicio, necesitamos agregar la propiedad providers al decorador de la clase en la que queremos injectar la dependencia, donde tendremos que especificar
            la clase de la dependencia que queramos injectar:
                providers: [LoggingService]
            Después ya podremos acceder a ese servicio desde cualquier método del componente invocándolo: this.loggingService.metodo().

            - El injector de dependencias de Angular es un inyector jerárquico. Significa que si proveemos un servicio  en un componente, Angular
            sabe cómo crear una instancia en ese componente y en todos sus hijos, que recibirán la misma instancia del servicio.
            - Jerarquía inyector de dependencias:
                1. AppModule: Si proveemos el servicio en el AppModule, la misma instancia del servicio estará disponible en toda la aplicación.
                2. AppComponent: La misma instancia del servicio estará disponible en AppComponent y en todos sus hijos.
                3. Cualquier otro componente(sin hijos): El componente tendrá su propia instancia del servicio que sólo estará disponible para
                    este componente, y sobreescribirá cualquier instancia del servicio que esté a mayor nivel en este componente.
            - Para inyectar un servicio dentro de otro necesitamos poner el decorador @Injectable(), además de agregar el constructor
   */ 

    logStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status);
    }

}