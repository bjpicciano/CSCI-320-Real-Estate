window.onload = () => {
    get("availableproperties")
        .then(data => {
            for (let property of data) {
                createProperty(property)
            }
        })
        .catch(e => {
            console.error(e);
        });
};

function createProperty(property) {    
    const propertyHTML = `
        <div class="property">
            <div class="property-title">
                <h3 class="street-address-1">${property.street_num} ${property.street_name} ${property.apt_num ? "Apt " + property.apt_num : ""}</h3>
                <h3 class="street-address-2">${property.city}, ${property.state} ${property.zip}</h3>

                <p class="price">$${property.price}</p>
                <p class="listed-date">Listed on ${new Date(property.time_listed).toISOString().slice(0,10)}</p>
                <button>Contact Agent</button>
            </div>
            
            <div class="property-description">
                <div class="description">
                    <b class="property-name">Number of Beds</b>
                    <p class="property-value">${property.number_of_beds}</p>
                </div>
                <div class="description">
                    <b class="property-name">Number of Baths</b>
                    <p class="property-value">${property.number_of_baths}</p>
                </div>
                <div class="description">
                    <b class="property-name">Square Feet</b>
                    <p class="property-value">${property.square_ft}</p>
                </div>
                <div class="description">
                    <b class="property-name">Year Built</b>
                    <p class="property-value">${property.year_built}</p>
                </div>
            </div>
        </div>
    `;
    
    const property_contianer = document.getElementById("property-container");
    
    property_contianer.innerHTML += propertyHTML;
}