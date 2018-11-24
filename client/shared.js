function loadNavbar() {
    const accountType = getAccountType();
    const toolbar = `
        <h3>${accountType}</h3>
        <a href='login.html'>${accountType ? "logout" : "login"}</a>
    `;

    const body = document.querySelector("body");
    body.innerHTML = toolbar + body.innerHTML;
}

function hideElement(elementId) {
    document.getElementById(elementId).classList.add("hidden");
}

function showElement(elementId) {
    document.getElementById(elementId).classList.remove("hidden");
}