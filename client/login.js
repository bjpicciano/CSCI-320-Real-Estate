window.onload = () => {
    load_navbar();

    if (get_account_type()) {
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
                console.log(data);
                redirect_login(data);
            })
            .catch(e => {
                console.error(e);
            });
    });
};