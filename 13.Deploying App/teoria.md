# Deploying Angular App

## Pasos para desplegar

- Usar y comprobar las variables de entorno
- Pulir y probar el código (tests)
- `ng build --prod`
- Desplegar aplicación en un servidor estático (sólo son capaces de leer HTML, CSS y JS)

## Variables de entorno

Las variables de entorno se encuentran en los ficheros de la carpeta environments.
Dentro de estos ficheros está la constante `environment`  a la que se le pueden añadir parámetros (`key: value`).
Por ejemplo se podrían añadir las API_KEYS que usa la aplicación.

Para poder usar la variable de entorno hay que importarla en los servicios en los que se vaya a usar.
