const main = document.getElementsByTagName("main")[0];

export function switchView() {
    const children = main.children;
    children[0].classList.add("d-none");
    children[1].classList.remove("d-none");
}
