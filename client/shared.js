function loadNavbar() {
    const toolbar = `
        <h3>${getAccountType()}</h3>
    `;

    const body = document.querySelector("body");
    body.innerHTML = toolbar + body.innerHTML;
}