/**
 * Terrible authentication imitation.
 * Uses session storage to store account type
 * Account types are: client, agent, manager
 */

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
        return false;
    }
}

function redirect_logout() {
    logout();
    window.location = "login.html";
}

function setAccountType(value) {
    if (value) {
        sessionStorage.setItem("accountType", value);
    }
}

/**
 * Get the logged in user's account type.
 * @returns {string | null | string} - client, agent, manager, or empty string
 */
function getAccountType() {
    return sessionStorage.getItem("accountType") || "";
}