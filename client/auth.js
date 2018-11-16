//terrible authentication imitation

function login(data) {
    try {
        const type = data[0].type;
        setAccountType(type);
        return type;
    } catch {
        return false;
    }
}

function logout() {
    sessionStorage.removeItem("accountType");
}

function redirectLogin(data) {
    login(data);

    if (getAccountType()) {
        window.location = "index.html";
    } else {
        document.querySelector("#login > .error").classList.remove("hidden");
    }
}

function redirect_logout() {
    logout();
    window.location = "login.html";
}

function getAccountType() {
    return sessionStorage.getItem("accountType") || "";
}

function setAccountType(value) {
    if (value) {
        sessionStorage.setItem("accountType", value);
    }
}