const express = require('express');
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 8080;

const credentials = {
    user: "p32004c",
    host: "reddwarf.cs.rit.edu",
    database: "p32004c",
    password: "Ahr4shohnungu9haedah",
    port: 5432
};

const client = new Client(credentials);
client.connect();

// serve our index.html file
app.use(express.static("."));

// Endpoints
// refer to https://expressjs.com/en/guide/routing.html
app.get("/endpoint", (req, res) => {
    res.send("this is an endpoint");
});

app.get("/testsql", async (req, res) => {
    const data = await client.query('SELECT hello FROM test');
    res.send(data.rows);
});

// Start server
app.listen(port, () => console.log("Listening at on port", port));