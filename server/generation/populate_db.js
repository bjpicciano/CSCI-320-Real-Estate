const Agent = require("./agent");

class PopulateDB {
    static async InsertAgent (client, number_of_agents) {
        for (let i = 0; i < number_of_agents; i++) {
            const agent = Agent.CreateRandom();

            const query = `
                INSERT INTO agent
                (
                  "id",
                  "first_name",
                  "last_name",
                  "salary",
                  "commissions",
                  "number_of_sales"
                )
                VALUES
                (
                  DEFAULT,
                  '${agent.first_name}',
                  '${agent.last_name}',
                  ${agent.salary},
                  ${agent.commissions},
                  ${agent.number_of_sales}
                )
            `;

            let data = await client.query(query);
            console.log(data);
        }
    }
}

module.exports = PopulateDB;