window.onload = () => {
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
                // window.location = "index.html";
            })
            .catch(e => {
                console.error(e);
            });
    });
};