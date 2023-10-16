import { nextStep } from "./stepper";
import { setMetric } from "./vars";

Array.from(document.getElementById("formMetric")!.children).forEach(elem => {
    const child = elem.firstChild as HTMLElement;
    child.addEventListener("click", () => {
        setMetric(child.getAttribute("value")!);
        nextStep();
    });
});
