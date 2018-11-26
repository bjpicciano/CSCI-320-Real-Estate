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
        FROM users
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
    const queries = req.query;
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
        ${queries.order && queries.sort ? `ORDER BY ${queries.order} ${queries.sort}` : ""}
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

app.get("/salesAgent", async (req, res) => {
	const query = `
		SELECT
               sell_price,
			   time_sold,
			   first_name,
			   last_name,
			   email
        FROM sale
		INNER JOIN property ON property.id = sale.property_id
		INNER JOIN client ON client.id = sale.seller_id
		WHERE agent_id = `+agent
		;
    

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

app.get("/topAgents", async (req, res) => {
	const query = `
		SELECT
               first_name,
			   last_name,
			   number_of_sales
        FROM agent
		WHERE agent.id = client.agent_id
		ORDER BY number_of_sales DESC`
		;
    

	
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

app.get("/offices", async(req, res) => {
    const query = `
    SELECT manager, street_num, street_name, apt_num, city, state, zip,  region
    FROM office
    INNER JOIN address on office.address_id = address.id
    INNER JOIN region on office.region_id = region.id`;

    try{
        const db = await client.query(query);
        const data = db.rows;
        res.send(JSON.stringify(data));
    }
    catch (e){
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
