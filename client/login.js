window.onload = () => {
    const accountType = getAccountType();
    if (accountType) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("logout").classList.remove("hidden");
    }

    document.getElementById("login").addEventListener("submit", e => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        let data = {
            "username": username,
            "password": password
        };

        post("login", data)
            .then(data => {
                const success = redirectLogin(data);
                if (!success) {
                    showElement("error-login");
                }
            })
            .catch(e => {
                console.error(e);
                showElement("error-connection");
            });
    });
};