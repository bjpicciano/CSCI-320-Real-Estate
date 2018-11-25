# CSCI-320-Real-Estate
Database project for CSCI 320, Principles of Data Management.  

This project explores the use of a relational database to create a coherent real estate management system.  

# The Project
The project is broken into two parts: the frontend and the backend:
- The frontend is what each user interacts with and is developed in vanilla JavaScript, HTML, and CSS
- The backend acts as an interface to the database from the frontend and runs on Node.js version 10.13.0

### Features
This system is intended to be used as a real estate system, both from the client and management side.  
There are three types of users:
##### Client
A client is someone buying and/or selling properties.  
Clients are able to view a list of available properties for purchase and contact their agents.
##### Agent
An Agent is a employee of the company that makes transactions with clients.  
Agents can view all properties, agents, and sales associated with agents.
##### Manager
A manager is an office's owner or administrator in the system.
Managers can see all properties, agents, offices, and sales related to agents and offices.

*Each user type has access to various pages within the application that enables their work roles.*

### Installing and Running
1. Download and install [Node.js](https://nodejs.org/en/download/)

2. With Node.js comes the node project manager (npm)  
Use it to install the required packages by running this command your command prompt:
    - ```npm install```

3. Within the package.json file, various scripts are defined to run the project  
Start the Node.js server with this command:
    - ```npm start```

4. After the server is started connect to [http://localhost:8080/](http:localhost:8080/).  
Node.js will serve your client the HTML and Javascript files

5. Log in to a user account  
Accounts:  

    Client
    ```
    marrybean
    123
    ```
    Agent
    ```
    janeurez
    123
    ```
    Manager
    ```
    admin
    123
    ```