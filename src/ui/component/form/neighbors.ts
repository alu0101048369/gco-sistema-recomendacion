import { nextStep } from "./stepper";
import { setNeighbors } from "./vars";

const input = document.getElementById("formNeighbors") as HTMLInputElement

document.getElementById("formNeighborsButton")?.addEventListener("click", () => {
    const val = Number(input.value)
    if (isNaN(val) || Math.trunc(val) !== val || val < 1) {
        alert("Número inválido de vecinos. Tiene que ser un número entero mayor o igual a 1");
        return;
    }
    setNeighbors(val);
    nextStep();
})
