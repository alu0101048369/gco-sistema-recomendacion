import { parseFile } from "./logic/input/parse/file";
import { newForm } from "./ui/component/form";

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
}
