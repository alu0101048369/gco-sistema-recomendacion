export function cosineDistance(
    x: (number | undefined)[],
    y: (number | undefined)[]
){

  const filteredX: number[] = [];
  const filteredY: number[] = [];

  for (let i = 0; i < x.length; i++) {
    if (Number(x[i]) && Number(y[i])) {
      filteredX.push(x[i] as number);
      filteredY.push(y[i] as number);
    }
  }

  const n = filteredX.length;

  // If there are no common elements, it returns undefined
  if (n === 0) {
    return undefined;
  }
  // Multiplication of x and y
  let multp: number = 0;
  for (let i = 0; i < filteredX.length; i++) {
    multp += (filteredX[i]* filteredY[i]);
  }
  //Square root of x
  let sqrt_x : number = 0;
  for (let i = 0; i < filteredX.length; i++) {
    const element = filteredX[i];
    sqrt_x += Math.pow(element,2);
  }
  sqrt_x = Math.sqrt(sqrt_x);

  //Square root of y
  let sqrt_y : number = 0;
  for (let i = 0; i < filteredY.length; i++) {
    const element = filteredY[i];
    sqrt_y += Math.pow(element,2);
  }
  sqrt_y = Math.sqrt(sqrt_y);

  //Multiplication of square roots
  let sqrt_xy : number = sqrt_x*sqrt_y;


  // Check division by 0
  if (multp === 0 || sqrt_xy === 0) {
    return undefined;
  }

  //Fraction (Division)
  let result : number = multp/sqrt_xy;
  return result;
}

// TEST

/* const vectorX: (number | undefined)[] = [1, 2, 3, 4, undefined, 5];
const vectorY: (number | undefined)[] = [2, 3, undefined, 4, 5, 6];

let result = cosineDistance(vectorX, vectorY);

if (result !== undefined) {
  console.log(`La distancia del coseno es: ${result}`);
} else {
  console.log("No hay suficientes elementos para calcular la distancia.");
} */