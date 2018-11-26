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