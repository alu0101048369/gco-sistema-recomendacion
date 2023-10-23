const main = document.getElementsByTagName("main")[0];

export function switchView() {
    main.classList.remove("mw-500");
    const children = main.children;
    children[0].classList.add("d-none");
    children[1].classList.remove("d-none");
}
