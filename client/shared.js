function loadNavbar() {
    const accountType = getAccountType();
    const toolbar = `
        <h3>${accountType}</h3>
        <a href='login.html'>${accountType ? "logout" : "login"}</a>
    `;

    const body = document.querySelector("body");
    body.innerHTML = toolbar + body.innerHTML;
}