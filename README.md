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

Ejemplo de uso de `recommedation`:

```javascript
import { Parameters } from './common/parameters';

// Crear una matriz de ejemplo de puntuaciones
const M_test = [
  [5.0, 3.0, 4.0, 4.0, undefined],
  [3.0, 1.0, 2.0, 3.0, 3.0],
  [4.0, undefined, 4.0, 3.0, 5.0],
  [3.0, 3.0, 1.0, 5.0, 4.0],
  [1.0, 5.0, 5.0, 2.0, 1.0],
];

// Definir los parámetros para la recomendación
const params: Parameters = {
  metric: 'pearson',   // Tipo de métrica (pearson, cosine, euclidean)
  neighbours: 2,      // Número de vecinos a considerar
  prediction: 'mean',  // Tipo de predicción (simple, mean)
  scores: M_test,      // Matriz de puntuaciones de entrada
};

// Llamar a la función de recomendación
const resultadoRecomendacion = recomendation(params);

// Mostrar el resultado en la consola
console.log('Resultado de la recomendación:');
console.log(resultadoRecomendacion);

```

En este ejemplo, creamos una matriz de ejemplo M_test que representa las puntuaciones de los elementos. A continuación, definimos los parámetros de recomendación en el objeto params, que incluye la métrica, el número de vecinos y el tipo de predicción que deseamos utilizar.

Después, llamamos a la función recomendation con estos parámetros. El resultado se almacena en la variable resultadoRecomendacion y se muestra en la consola.

Este ejemplo de uso ilustra cómo utilizar la función recomendation en tu código para realizar recomendaciones basadas en una matriz de puntuaciones. Puedes ajustar los valores de los parámetros y la matriz de puntuaciones según tus necesidades específicas.

..................

Ejemplo de uso de `calculateCorrelation`:

```javascript
// Definir dos vectores de ejemplo
const vector1 = [5, 3, 4, undefined, 2]; // Ejemplo de puntuaciones para un elemento
const vector2 = [3, 1, 2, 3, 4]; // Ejemplo de puntuaciones para otro elemento

// Definir el tipo de métrica que deseas utilizar (pearson, cosine o euclidean)
const metric = 'pearson';

// Calcular la correlación entre los dos vectores
const correlation = calculateCorrelation(vector1, vector2, metric);

// Mostrar el resultado en la consola
console.log('Correlación:', correlation);
```

En este ejemplo, definimos dos vectores de ejemplo vector1 y vector2, que representan las puntuaciones de dos elementos distintos y especificamos el tipo de métrica que deseamos utilizar, en este caso, 'pearson'.

Finalmente, llamamos a la función calculateCorrelation con los dos vectores y la métrica especificada. El resultado se almacena en la variable correlation y se muestra en la consola.

Este ejemplo de uso ilustra cómo utilizar la función calculateCorrelation para calcular la correlación entre dos vectores de puntuaciones utilizando una métrica específica. Puedes ajustar los vectores y la métrica según tus necesidades específicas.




