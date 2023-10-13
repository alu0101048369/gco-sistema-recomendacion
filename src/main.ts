import { nextStep } from "./ui/component/stepper/stepper";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await sleep(1000);
nextStep();
await sleep(1000);
nextStep();
await sleep(1000);
nextStep();
