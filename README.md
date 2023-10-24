# Sistema recomendador 
- Laura Dorta Marrero <alu0101400624@ull.edu.es>
- Miguel Dorta Rodríguez <alu0101048369@ull.edu.es>
- Saúl García Martín <alu0101405810@ull.edu.es>

## Índice

1. [Descripción del concepto](#descripción-del-concepto)

2. [Instalación  y despliegue](#instalación-y-despliegue)

3. [Ejemplo de uso](#ejemplo-de-uso)

4. [Descripción del código](#descripción-del-código)

6. [Referencias](#referencias)

## Descripción del concepto
El objetivo de este proyecto es ofrecer una aplicación web para computar predicciones en base a datos proporcionados, usando diferentes sistemas predictivos.

## Instalación y despliegue

Esta aplicación se despliega automáticamente cada vez que hay cambios en la rama `main` gracias a la integración de CI/CD de GitHub Actions y Cloudflare Pages. La URL en la que se despliega es https://gco-sistema-recomendacion.pages.dev/

Si se desease instalar el proyecto de forma local en un dispositivo, se requerirá de NodeJS, NPM, y opcionalmente un servidor web para poder visualizarlo. Para ello importe el repositorio y ejecute el siguiente comando para instalar las dependencias:

```sh
npm install
```

Si se dispone de servidor web y se quiere obtener el resultado del empaquetado de la web, ejecute este comando:

```sh
npm run build
```

Y encontrará la web en el directorio `dist/`

Si por el contrario, no dispone de servidor web y simplemente quiere visualizar la web (no ponerla en producción), ejecute el siguiente comando:

```sh
npm run dev
```

Y esto le permitirá visualizar la web accediendo a http://localhost:5173/


## Ejemplo de uso
Para poder hacer uso de nuestro Sistema de Recomendación debe acceder al navegador y acceder a la web. Nosotros accederemos a https://gco-sistema-recomendacion.pages.dev/ pero usted puede acceder a su copia local. Lo primero que veremos es esto:

![Página principal del recomendador](/docs/Inicio.png)

Ahora eligiremos un archivo a utilizar. Para ello pulsará sobre "Seleccionar archivo" y eligirá uno de su biblioteca. Como se observa en la siguiente imagen, se seleccionó el archivo `utility-matrix-10-25-4.txt` que es una de las matrices ejemplo del repositorio añadido a las [Referencias](#referencias). Puede encontrar varias de estas matrices de ejemplo en el directorio `testdata/`

![Aparece ventana para añadir archivo al recomendador](/docs/Seleccionar_archivo.png)

Una vez elegido el archivo, pasaremos a seleccionar la métrica que deseemos utilizar. En este caso, se eligió la opción "Distancia Coseno". 

![Selección de métrica para el recomendador](/docs/Seleccionar_metrica.png)

Seguidamente, se debe elegir el número de vecinos que se desea para el sistema. En esta imagen se observa como se escogen 4 vecinos.

![Selección de número de vecinos para el recomendador](/docs/N_vecinos.png)

El último paso es escoger la manera de predecir los números requeridos y para este ejemplo se elige "Predicción simple".

![Selección de predicción para el recomendador](/docs/Seleccionar_prediccion.png)

Este sería el resultado, como se puede observar nos da la opción de hacer click en cualquier predicción para obtener más información y los detalles de esta se muestra como nos enseña la segunda imagen.

![Resultado del recomendador](/docs/Resultado_p1.png)

![Resultado del recomendador](/docs/Resultado_p2.png)


## Descripción del código
Este proyecto posee el siguiente código:
- Un directorio `src` que contiene el código fuente del proyecto. Dentro de este se encuentran lo siguiente:

    - El directorio `logic` que contiene las funciones y parámetros necesarios para los cálculos matemáticos del código. Dentro de este se encuentra lo siguiente:
      - Un directorio `common` el cual contiene código que va a ser compartido entre la interfaz de usuario y la lógica de la aplicación. Dentro de este se encuentra:
        - Un fichero `parameters.ts`, que contiene el tipo de dato `Parameters`
        - Un directorio `out_types`. Dentro de este se encuentra:
          - Un fichero `correlation_log.ts`.
          - Un fichero `element_predicition_data.ts`.
          - Un fichero `operation_log.ts`
          - Un fichero `recomendation_output_result.ts`.

      - Un directorio `input`. Dentro de este se encuentra un directorio con un único fichero llamado `file.ts`. Este es el que se encarga de extraer la información de los inputs.
      
      - Un directorio `metric` que contiene las funciones mátematicas requeridas. En esta se encuentran los ficheros `cosine_dist.ts`, `euclidean.ts` y `pearson.ts`.
      - Un fichero `function.ts` que llama e utiliza las funciones desarrolladas.

    - El directorio `ui/component` que contiene los componentes de código que van a manejar la interfaz de usuario. A su ves, contiene lo siguiente:
      - Un directorio `form`, que se encarga de la interfaz del formulario de entrada de los datos.
      - Un directorio `main`, que se encarga de administrar las vistas principales de la página.
      - Un directorio `view_output`, que contiene el código que va a manejar los componentes de la vista que muestra las predicciones hechas.

    - El fichero `main.ts` que contiene la función main.

    - El fichero `vite-env.d.ts` con los parámetros de configuración del empaquetador Vite.

- Un directorio `testdata` que contiene los datos a probar.

## Referencias

[Sistema de Recomendación](https://gco-sistema-recomendacion.pages.dev/).

[Repositorio de matrices ejemplo](https://github.com/ull-cs/gestion-conocimiento/blob/main/recommeder-systems/examples-utility-matrices/utility-matrix-10-25-4.txt).


