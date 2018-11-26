/**
 * Shared global functions to aid in development
 */

/**
 * Prepends a navigation bar to the top of the HTML page.
 * Changes based on sessions storage's accountType variable.
 * Creates HTML out of HTML node objects.
 */
function loadNavbar() {
    const accountType = getAccountType();

    const toolbarDiv = document.createElement("div");
    toolbarDiv.classList.add("toolbar");

    const accountTypeHeader = document.createElement("h3");
    accountTypeHeader.innerHTML = "Logged in as " + accountType;

    toolbarDiv.appendChild(accountTypeHeader);

    const homeAnchor = createAnchor("home", "index");
    appendAnchor(toolbarDiv, homeAnchor);

    if (accountType === "agent" || accountType === "manager") {
        const agentsAnchor = createAnchor("agents");
        appendAnchor(toolbarDiv, agentsAnchor);

        const clientsAnchor = createAnchor("clients");
        appendAnchor(toolbarDiv, clientsAnchor);
    }

    if (accountType === "manager") {
        const officesAnchor = createAnchor("offices");
        appendAnchor(toolbarDiv, officesAnchor);

        const salesAnchor = createAnchor("sales");
        appendAnchor(toolbarDiv, salesAnchor);
    }

    const loginAnchor = createAnchor("login");
    if (accountType) {
        loginAnchor.innerHTML = "logout";
    }
    appendAnchor(toolbarDiv, loginAnchor);

    const divider = document.createElement("hr");
    toolbarDiv.appendChild(divider);

    const body = document.querySelector("body");
    prependElement(body, toolbarDiv, body.children[0]);
}

function createAnchor(name, link = name) {
    // if (link === undefined) link = name;
    const anchor = document.createElement("a");
    anchor.href = link + ".html";
    anchor.innerHTML = name;

    return anchor;
}

function appendAnchor(parent, anchor) {
    const pageName = window.location.href;
    const href = anchor.href;

    //display current page different than others
    if (pageName === href) {
        anchor.classList.add("active");
        anchor.href = "#";
    }

    parent.appendChild(anchor);
}

function hideElement(elementId) {
    document.getElementById(elementId).classList.add("hidden");
}

function showElement(elementId) {
    document.getElementById(elementId).classList.remove("hidden");
}

function toggleEleVisibility(element) {
    const classList = element.classList;

    if (classList.contains("hidden")) {
        classList.remove("hidden");
    } else {
        classList.add("hidden");
    }
}

function prependElement(parentEle, newEle, referenceEle) {
    parentEle.insertBefore(newEle, referenceEle);
}

function toggleDropDown(parent) {
    const dropDownEle = parent.querySelector(".drop-down");
    toggleEleVisibility(dropDownEle);
}

/**
 * Helper function to mimic logging in for when the database is down
 * @param type - client, agent, or manager
 */
function spoofLoginAs(type) {
    setAccountType(type);
}