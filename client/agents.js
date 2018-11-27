window.onload = () => {
    loadNavbar();
	get("salesAgent")
        .then(data => {
            for (let sale of data) {
                createSale(sale)
            }
        })
        .catch(e => {
            console.error(e);
            document.querySelector(".error").classList.remove("hidden");
        });
		
	get("topAgents")
        .then(data => {
            for (let agent of data) {
                createRank(agent)
            }
        })
        .catch(e => {
            console.error(e);
            document.querySelector(".error").classList.remove("hidden");
        });

};

function createSale(sale) {
    const accountType = getAccountType();
    const saleHTML = `
        <div class="sale">
            <div class="sale-info">
                <h3 class="s_agent">Price: $${sale.sell_price} Time Sold: ${sale.time_sold}</h3>
				<h3 class="title">Client Info: ${sale.first_name} ${sale.last_name} - ${sale.email}</h3>
			
            </div>
            
    
        </div>
    `;
    
    const saleContainer = document.getElementById("sales-container");
    
    saleContainer.innerHTML += saleHTML;
}


function createRank(agent) {
    const accountType = getAccountType();
    const agentsHTML = `
        <div class="rank">
                <h3 class="r_fn">${agent.first_name} ${agent.last_name}: ${agent.number_of_sales}</h3>

        </div>
    `;
    
    const agentsContainer = document.getElementById("agents-container");
    
    agentsContainer.innerHTML += agentsHTML;
}

function createAgent(agent, agent_office){
  const accountType = getAccountType();
  const office = getPrimaryOffice(agent.id, agent_office)
  const agentHTML = `
    <div class="agent">
        <div class="agent-title">
            <h3 class="name">${agent.first_name} ${agent.last_name} </h3>

            <p class="sales">${agent.number_of_sales} sales</p>
        </div>

        <div class="agent-description">
            <div class="description">
                <b class="agent-salary">Salary</b>
                <p class="agent-value">$${agent.salary}</p>
            </div>
            <div class="description">
                <b class="agent-commissions">Commissions</b>
                <p class="agent-value">${agent.commissions}</p>
            </div>
            <div class="description">
                <b class="agent-office">Office</b>
                <p class="agent-value">${office}
        </div>
    </div>
  `;

  const agentContainer = document.getElementById("agent-container");

  agentContainer.innerHTML += agentHTML;
}

function getPrimaryOffice(id, agent_office){
  //TODO: make Brian do it cause he's better at javascript than me
  //Basically, find agent_office entry that matches current agent id
  //and that is the primary office of that agent
}
