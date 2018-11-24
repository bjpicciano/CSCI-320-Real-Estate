window.onload = () => {
    spoofLoginAs("manager");
    loadNavbar();

    get("clientsAgent")
      .then(data => {
          hideElement("loader");
          for(let client of data) {
              createClient(client);
          }
      })
      .catch(e => {
          console.error(e);
      });
};

function createClient(client){
    const accountType = getAccountType();
    const clientHTML = `
        <div class="client">
            <div class="client-title">
                <h3 class="client-name">${client.first_name} ${client.last_name}</h3>
            </div>

            <div class="client-description">
                <div class="description">
                    <b class="client-name">Phone Number</b>
                    <p class="client-value">${client.phone_number}</p>
                </div>
                <div class="description">
                    <b class="client-name">Email</b>
                    <p class="client-value">${client.email}</p>
                </div>
                <div class="description">
                    <b class="client-name">Home Address</b>
                    <p class="client-value">${client.street_num} ${client.street_name} ${client.apt_num ? "Apt " + client.apt_num : ""}</p>
                    <p class="client-value">${client.city}, ${client.state} ${client.zip}</p>
                </div>
            </div>
        </div>
    `;
    const clientContainer = document.getElementById("client-container");
    clientContainer.innerHTML += clientHTML;
}
