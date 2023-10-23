import { recomendation } from "./logic/function";
import { parseFile } from "./logic/input/parse/file";
import { newForm } from "./ui/component/form";
import { switchView } from "./ui/component/main";
import { loadViewOutput } from "./ui/component/view_output";

async function main() {
  const vars = await newForm();

  let scores;
  try {
    scores = parseFile(vars.file);
  } catch (e) {
    if (typeof e === "object" && e !== null && "message" in e) {
      e = e.message;
    }
    alert(`file format error: ${e}`);
    location.reload();
    return;
  }

    const out = recomendation({
        metric: vars.metric as "pearson"|"cosine"|"euclidean",
        neighbours: vars.neighbors,
        prediction: vars.prediction as "simple"|"mean",
        scores: scores.normValues,
    });

    switchView();
    loadViewOutput(scores, out);
}

main();
