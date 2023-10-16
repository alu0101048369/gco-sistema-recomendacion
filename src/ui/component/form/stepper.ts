const stepBodies = document.getElementById("form-body")!.children;
const stepIndexes = document.getElementById("stepper")!.children;
let currentStep = 0;

export function nextStep() {
    stepBodies[currentStep].classList.add("d-none");
    currentStep++;
    stepBodies[currentStep].classList.remove("d-none");
    stepIndexes[currentStep].classList.replace("bg-secondary", "bg-primary");
}
