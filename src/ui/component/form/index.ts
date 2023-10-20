import "./file";
import "./metric";
import "./neighbors";
import "./prediction";
import { FormVars, setCallback } from "./vars";

export function newForm(): Promise<FormVars> {
    return new Promise(resolve => {
        setCallback(resolve);
    });
}
