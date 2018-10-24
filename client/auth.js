//terrible authentication imitation

function login(data) {
    try {
        const type = data[0].type;
        set_account_type(type);
        return type;
    } catch {
        return false;
    }
}

function logout() {
    sessionStorage.removeItem("account_type");
}

function redirect_login(data) {
    login(data);

    if (get_account_type()) {
        window.location = "index.html";
    } else {
        document.querySelector("#login > .error").classList.remove("hidden");
    }
}

function redirect_logout() {
    logout();
    window.location = "login.html";
}

function get_account_type() {
    return sessionStorage.getItem("account_type");
}

function set_account_type(value) {
    if (value) {
        sessionStorage.setItem("account_type", value);
    }
}