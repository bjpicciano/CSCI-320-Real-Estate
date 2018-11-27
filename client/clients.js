window.onload = () => {
    loadNavbar();

    get("clients")
      .then(data => {
          console.table(data[0]);
          hideElement("loader");
          for(let client of data) {
              createClient(client);
          }
      })
      .catch(e => {
          console.error(e);
          showElement("error-connection");
          hideElement("loader");
      });
};

function createClient(client){
    const accountType = getAccountType();
    const clientHTML = `
        <div class="client">
            <div class="client-title">
                <h3>${client.first_name} ${client.last_name}</h3>
                <p class="street-address-1">${client.street_num} ${client.street_name} ${client.apt_num ? "Apt " + client.apt_num : ""}</p>
                <p class="street-address-2">${client.city}, ${client.state} ${client.zip}</p>
                <button onclick="location.href='mailto:${client.email}'">Contact</button>
            </div>

            <div class="client-description">
                <!-- forgive me; nested templates ahead -->
                ${client.time_listed ? `
                    <h3>Properties</h3>
                    <p class="price">$${client.price}</p>
                    <p class="listed-date">Listed on ${new Date(client.time_listed).toISOString().slice(0,10)}</p>
                    ${client.time_sold ? `
                        <p class="listed-date">Sold on ${new Date(client.time_sold).toISOString().slice(0,10)}</p>
                    ` : ""}
                ` : ""}
                <h3>Agent</h3>
                <p>${client.agent_first_name} ${client.agent_last_name}</p>
            </div>
        </div>
    `;
    const clientContainer = document.getElementById("client-container");
    clientContainer.innerHTML += clientHTML;
}
