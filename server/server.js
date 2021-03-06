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

app.get("/clients", async (req, res) => {
    const queries = req.query;
    const query = `
        SELECT
               client.first_name,
               client.last_name,
               client.phone_number,
               client.email,
               address.street_num,
               address.street_name,
               address.apt_num,
               address.city,
               address.state,
               address.zip,
               agent.first_name as agent_first_name,
               agent.last_name as agent_last_name,
               property.time_listed,
               property.time_sold,
               property.price
        FROM client
        INNER JOIN address ON home_address = address.id
        INNER JOIN agent ON agent_id = agent.id
        LEFT JOIN property ON client.id = property.client_id
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
	//need to return for specific agent?
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
		`
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
    const queries = req.query;
    const query = `
        SELECT manager, street_num, street_name, apt_num, city, state, zip,  region,
            count(*) filter (where completed = true ) as completed, count(*) filter (where completed = false ) as pending
        FROM office
        INNER JOIN address on office.address_id = address.id
        INNER JOIN region on office.region_id = region.id
        LEFT JOIN sale on office.id = sale.office_id
        GROUP BY office.id, address.id, region.id, sale.id
        ${queries.order && queries.sort ? `ORDER BY ${queries.order} ${queries.sort}` : ""}
    `;
    console.log(queries.order);
    console.log(queries.sort);

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
