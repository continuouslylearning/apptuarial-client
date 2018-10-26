# Apptuarial

Apptuarial is an application that allows an insurer to:
 - insert policy and claims records into a database,
 - view and sort policy and claims records
 - compute premium and loss ratios on the last four years of policy and claims data

## Use this application on Heroku
This application is deployed [here](https://apptuarial-client.herokuapp.com).

You can use the following demo user account:
 - Username: anonymous
 - Password: password
 
The REST API is also deployed on Heroku [here](https://apptuarial-server.herokuapp.com).

## Install this application locally
To install this application locally:
  - Clone this git repository
  - Run `npm install` inside the project folder to install the dependencies
  - Clone the REST API from [this repository](https://github.com/continuouslylearning/apptuarial-server)
  - Run `npm install` inside the REST API folder to install the dependencies
  - Run `npm start` inside the client project folder to start up the React application
  - Run `npm start` inside the API project folder to start up the API server

## Tech Stack
The front end was built with:
 - React
 - Redux
 - Jest & Enzyme
 
 The REST API was built with: 
 - Node.js
 - Express
 - MongoDB
 - Mocha & Chai
 
 ## Screenshots
