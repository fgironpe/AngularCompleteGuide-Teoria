# Autenticación y protección de rutas

## Autenticación

### Cómo funciona la autenticación

Cuando el usuario escribe sus credenciales, los datos de autenticación son enviados al servidor, donde son validados.

Si todos los datos son válidos, el servidor envía al cliente un Token que es una cadena de texto codificada que contiene meta datos. Est token puede ser decodificado por el cliente.

El token se genera en el cliente con un cierto algoritmo y una clave secreta que sólo conoce el servidor.

El cliente guarda ese token en algún almacenamiento (ya puede ser el localStorage del navegador) y agrega el token en todas las peticiones al servidor que necesitan ser autenticadas.