/**
 * JavaScript file for index.html.
 * Bound to the HTML page by a script import within index.html's head tag.
 * Utilizes other function calls from external files such as: api.js, auth.js, & shared.js.
 * Each external file is imported through the html also as script tags. Loading order does matter.
 */

/**
 * Called when the HTML page finishes loading.
 * Think of it as the main function, the entry point to the program.
 */
window.onload = () => {
    //load navbar from shared.js, based on the type of user logged in
    loadNavbar();

    //fetch data from our server endpoint using get helper function.
    //uses promises to handle callbacks and errors.
    get("availableProperties")
        .then(data => {
            hideElement("loader");
            for (let property of data) {
                createProperty(property);
            }
        })
        .catch(e => {
            console.error(e);
            showElement("error-connection");
            hideElement("loader");
        });
};

/**
 * Uses a template string, propertyHTML, to build a property html entry from the database record.
 * @param property - a property entry from the property table
 */
function createProperty(property) {
    const accountType = getAccountType();
    const propertyHTML = `
        <div class="property">
            <div class="property-title">
                <h3 class="street-address-1">${property.street_num} ${property.street_name} ${property.apt_num ? "Apt " + property.apt_num : ""}</h3>
                <h3 class="street-address-2">${property.city}, ${property.state} ${property.zip}</h3>

                <p class="price">$${property.price}</p>
                <p class="listed-date">Listed on ${new Date(property.time_listed).toISOString().slice(0,10)}</p>
                ${accountType === "client" ? "<button onclick='location.href=`mailto:harrypots@realestate.com`'>Contact Agent</button>" : ""}
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
    
    const propertyContainer = document.getElementById("property-container");
    
    propertyContainer.innerHTML += propertyHTML;
}