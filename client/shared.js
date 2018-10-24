function load_navbar() {
    const toolbar = `
        <h3>${get_account_type()}</h3>
    `;

    const body = document.querySelector("body");
    body.innerHTML = toolbar + body.innerHTML;
}