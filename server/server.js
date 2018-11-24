const express = require('express');
const {Client} = require("pg");
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
client.connect()
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch(e => {
        console.error(e.stack);
        client.end();
    });

// Endpoints
app.post("/login", async (req, res) => {
    const body = req.body;

    const query = `
        SELECT type
        FROM account_type
        INNER JOIN users ON account_type.id = users.account_type_id
        WHERE username = '${body.username}' AND password = '${body.password}'
    `;
    try {
        const db = await client.query(query);
        const data = db.rows;

        res.send(JSON.stringify(data));
    } catch (e) {
        const msg = {
            message: "Unable to query database",
            error: e.message
        };
        console.error(e.stack);
        res.status(500).send(msg);
    }
});

app.get("/availableProperties", async (req, res) => {
    const query = `
        SELECT
               street_num,
               street_name,
               city,
               state,
               zip,
               apt_num,
               price,
               time_listed,
               number_of_beds,
               number_of_baths,
               square_ft,
               year_built
        FROM property
        INNER JOIN address ON property.address_id = address.id
        WHERE time_sold IS NULL
    `;

    try {
        const db = await client.query(query);
        const data = db.rows;
        res.send(JSON.stringify(data));
    } catch (e) {
        const msg = {
            message: "Unable to query database",
            error: e.message
        };
        console.error(e.stack);
        res.status(500).send(msg);
    }
});

// Start server
app.listen(port, () => console.log("Listening on port", port));