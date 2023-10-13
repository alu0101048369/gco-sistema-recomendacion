const steps = document.getElementById("stepper")!.children;
let currentStep = 1;

export function nextStep() {
    steps[currentStep].classList.replace("bg-secondary", "bg-primary");
    currentStep++;
}
