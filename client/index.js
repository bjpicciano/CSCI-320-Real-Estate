window.onload = () => {
    //test call
    createProperty({
        "address": "132 Address St",
        "price": "230,000",
        "list_date": "10/24/2018",
        "number_beds": "3",
        "number_baths": "2",
        "square_feet": "3250",
        "year_built": "2010"
    })
}

function createProperty(property) {    
    const propertyHTML = `
        <div class="property">
            <div class="property-title">
                <h3 class="address">${property.address}</h3>
                <p class="price">$${property.price}</p>
                <p class="listed-date">Listed on ${property.list_date}</p>
                <button>Contact Agent</button>
            </div>
            
            <div class="property-description">
                <div class="description">
                    <b class="property-name">Number of Beds</b>
                    <p class="property-value">${property.number_beds}</p>
                </div>
                <div class="description">
                    <b class="property-name">Number of Baths</b>
                    <p class="property-value">${property.number_baths}</p>
                </div>
                <div class="description">
                    <b class="property-name">Square Feet</b>
                    <p class="property-value">${property.square_feet}</p>
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