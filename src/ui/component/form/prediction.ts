import { setPrediction } from "./vars";

Array.from(document.getElementById("formPrediction")!.children).forEach(elem => {
    const child = elem.firstChild as HTMLElement;
    child.addEventListener("click", () => {
        setPrediction(child.getAttribute("value")!);
        //nextStep();
    });
});
