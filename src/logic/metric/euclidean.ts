export function euclideanDistance(
  x: (number | undefined)[],
  y: (number | undefined)[]
){
  const filteredX: number[] = [];
  const filteredY: number[] = [];

  for (let i = 0; i < x.length; i++) {
    if (typeof x[i] === "number" && typeof y[i] === "number") {
      filteredX.push(x[i] as number);
      filteredY.push(y[i] as number);
    }
  }

  const n = filteredX.length;

  // If there are no common elements, it returns undefined
  if (n === 0) {
    return undefined;
  }
  console.log(`X:${filteredX}`);
  console.log(`Y:${filteredY}`);

  // Diference between x and y
  let dif: number[] = [];
  for (let i = 0; i < filteredX.length; i++) {
    dif.push(filteredY[i]-filteredX[i]);
  }
  console.log(`dif:${dif}`);
  //Summation in Second Power (r²)
  let sum : number = 0;
  for (let i = 0; i < dif.length; i++) {
    sum += Math.pow(dif[i],2);
  }
  console.log(`Y:${sum}`);
  //Square root of summation
  let result = Math.sqrt(sum);

  return result;
}

// TEST

/* const vectorX: (number | undefined)[] = [1, 2, 4 ,undefined, 3];
const vectorY: (number | undefined)[] = [0, 3, undefined, 4, 0];

let result = euclideanDistance(vectorX, vectorY);

if (result !== undefined) {
  console.log(`La distancia euclidea es: ${result}`);
} else {
  console.log("No hay suficientes elementos para calcular la distancia.");
} */