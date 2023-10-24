# Sistema recomendador 

## Índice

1.[Instalación de dependecias y Despliegue](#instalación-de-dependecias-y-despliegue).

2.[Descripción del código](#descripción-del-código).

3.[Ejemplo de uso](#ejemplo-de-uso).


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

  Para iniciar el despligue, utilice su navegador y añada lo siguiente: `https://gco-sistema-recomendacion.pages.dev/`.

  El despliege es efectuado por un servicio de alojamineto web llamado Cloudflare Pages y este se encarga de simplificar esta implementación.

  <!-- Las fotos serían añadidas aquí-->


## Descripción del código
  Este proyecto posee el siguiente código:
  - Un directorio `src` que contiene el código fuente del proyecto. Dentro de este se encuentran lo siguiente:

      - El directorio `logic` que contiene las funciones y parámetros necesarios para los cálculos matemáticos del código. Dentro de este se encuentra lo siguiente:
        - Un directorio `common`. Donde dentro de este se encuentra:
          - Un fichero `parameters.ts`.
          - Un directorio `out_types`. Donde dentro de este se encuentra:
            - Un fichero `correlation_log.ts`.
            - Un fichero `element_predicition_data.ts`.
            - Un fichero `operation_log.ts`
            - Un fichero `recomendation_output_result.ts`.

        - Un directorio `input`. Donde dentro de este se encuentra un directorio con un único fichero llamado `file.ts`. Este es el que se encarga de extraer la información de los inputs.
        
        - Un directorio `metric` que contiene las funciones mátematicas requeridas. En esta se encuentran los ficheros `cosine_dist.ts`, `euclidean.ts` y `pearson.ts`.
        - Un fichero `function.ts` que llama e utiliza las funciones desarrolladas.

      - El directorio `ui` contiene un directorio que a su vez contiene lo siguiente:
        - Un directorio `form`.
        - Un directorio `main`.
        - Un directorio `table`.

      - El fichero `main.ts` que contiene la función main.

      - El fichero `vite-env.d.ts`.

  - Un directorio `testdata` que contiene los datos a probar.

## Ejemplo de uso

![Página principal del Seleccionador](/images/Inicio.png)



