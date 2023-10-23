const table = document.getElementById("tableCorrelations")!;

export function populateTableCorrelations(correlations: { index: number; correlation: number }[]) {
    table.innerHTML = "";

    correlations.sort((a, b) => a.index - b.index).forEach(c => {
        const tr = document.createElement("tr");

        const th = document.createElement("th");
        th.innerText = String(c.index + 1);
        tr.appendChild(th);
        
        const td = document.createElement("td");
        td.innerText = String(c.correlation);
        tr.appendChild(td);

        table.appendChild(tr);
    });
}
