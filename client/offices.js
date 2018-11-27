

window.onload = () => {
    loadNavbar();

    populateOffices();
};

function populateOffices(query = "") {
    emptyOffices();
    
    get("offices" + query).then(data => {
        hideElement("loader");
        for (let office of data) {
            createOffice(office);
        }
    }).catch(e => {
        console.error(e);
        showElement("error-connection");
        hideElement("loader");
    });
}


function createOffice(office){
    const officeHTML = `
        <div class="office">
            <div class="office-title">
                <h2 class="Manager">${"Manager: " + office.manager}</h2>
                <h3 class="street-address-1">${office.street_num} ${office.street_name} ${office.apt_num != null ? "Apt " + office.apt_num : ""}</h3>
                <h3 class="street-address-2">${office.city}, ${office.state} ${office.zip}</h3>

                <p class="region">${office.region != null ? " Region: " + office.region : ""}</p>
                <p class="pending">${"Pending sales: " + office.pending}</p>
                <p class="completed">${"Completed sales: " + office.completed}</p>
            </div>
        </div>
        <hr>
    `;

    const officeContainer = document.getElementById("office-container");
    officeContainer.innerHTML += officeHTML;
}

function emptyOffices() {
    const officeContainer = document.getElementById("office-container");

    officeContainer.innerHTML = "";
    showElement("loader");
    hideElement("error-connection");
}