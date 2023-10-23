import { recomendation } from "./logic/function";
import { parseFile } from "./logic/input/parse/file";
import { newForm } from "./ui/component/form";
import { switchView } from "./ui/component/main";
import { buildTable } from "./ui/component/table";

async function main() {
  /*const vars = await newForm();

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

    console.log(recomendation({
        metric: vars.metric as "pearson"|"cosine"|"euclidean",
        neighbours: vars.neighbors,
        prediction: vars.prediction as "simple"|"mean",
        scores: scores.normValues,
    }));

    switchView();*/

    const result = recomendation({
      metric: "pearson",
      neighbours: 2,
      prediction: "simple",
      scores: [
        [1.00, 0.50, 0.75, 0.75, undefined],
        [0.50, 0.00, 0.25, 0.50, 0.50],
        [0.75, undefined, 0.75, 0.50, 1.00],
        [0.50, 0.50, 0.00, 1.00, 0.75],
        [0.00, 1.00, 1.00, 0.25, 0.00],
      ],
    });
    console.log(result);
    buildTable({
      max: 5,
      min: 1,
      normValues: [
        [1.00, 0.50, 0.75, 0.75, undefined],
        [0.50, 0.00, 0.25, 0.50, 0.50],
        [0.75, undefined, 0.75, 0.50, 1.00],
        [0.50, 0.50, 0.00, 1.00, 0.75],
        [0.00, 1.00, 1.00, 0.25, 0.00],
      ]
    }, result);
}

main();
