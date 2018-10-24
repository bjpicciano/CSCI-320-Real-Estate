const express = require('express');
const { Client } = require("pg");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

// serve our index.html file
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("client"));

const credentials = {
    user: "p32004c",
    host: "reddwarf.cs.rit.edu",
    database: "p32004c",
    password: "Ahr4shohnungu9haedah",
    port: 5432
};

const client = new Client(credentials);
client.connect();

// Endpoints
// refer to https://expressjs.com/en/guide/routing.html
app.get("/endpoint", (req, res) => {
    res.send("this is an endpoint");
});

app.get("/testsql", async (req, res) => {
    const data = await client.query('SELECT hello FROM test');
    res.send(data.rows);
});

app.post("/login", async (req, res) => {
   console.log(req.body);
   res.send(req.body);
});

// Start server
app.listen(port, () => console.log("Listening at on port", port));