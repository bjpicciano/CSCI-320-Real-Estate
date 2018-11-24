window.onload = () => {
    loadNavbar();

    get("");
};

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
