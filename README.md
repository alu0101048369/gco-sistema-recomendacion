# Sistema recomendador 

## Índice

1.[Instalación de dependecias y Despliegue](#instalación-de-dependecias-y-despliegue)
2.[Descripción del código](#descripción-del-código)
3.[Ejemplos de uso](#ejemplos-de-uso)


## Instalación de dependecias y Despliegue

  Esta parte del informe detalla las instrucciones para instalar las dependecias del proyecto y el proceso de despligue del proyecto.

  Para facilitar este proceso se personalizó un script en package.json. Este script se llama `build:cicd` y está diseñado para automatizar el proceso de instalación de dependecias y la compilación del proyecto antes del despliegue.

  ```package.json
  "scripts": {
    "build:cicd": "npm install && npm run build"
  }
  ```
  `npm install`: Efectua la busqueda de dependencias en el `package.json` del directorio proyecto y luego las descarga e instala en las versiones específicas.
  `npm run build`: Genera los archivos que se pueden cargar en el servidor web para la implemetación del despliegue.

  Para iniciar el despligue, utilice su navegador y añada lo siguiente: `https://gco-sistema-recomendacion.pages.dev/`
  El despliege es efectuado por un servicio de alojamineto web llamado Cloudflare Pages y este se encarga de simplificar esta implementación.

  <!-- Las fotos serían añadidas aquí-->


## Descripción del código
  Este proyecto posee el siguiente código:
  - Un directorio `src` que contiene el código fuente del proyecto
      Dentro de este se encuentran lo siguiente:
      - El directorio `logic`
      - El directorio `ui`
      - El archivo `main.ts`
      - El archivo `vite-env.d.ts`

## Ejemplos de uso

