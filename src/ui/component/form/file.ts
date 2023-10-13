import { nextStep } from "./stepper";
import { setFile } from "./vars";

const inputFile = document.getElementById("formFile")! as HTMLInputElement;
inputFile.addEventListener("change", async () => {
    const file = inputFile.files!.item(0);
    if (file) {
        setFile(await file.text());
        nextStep();
    }
});
