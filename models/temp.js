const request = require('request');


// Replace YOUR_API_KEY with the actual API key you obtained from FreshSales
const apiKey = 'eMx0_GaO1-17PepP03fmvA';

// Define the API endpoint URL
const url = 'https://yourdomain.freshsales.io/api/contacts';

// Define the headers including the API key
const headers = {
  'Authorization': `Token token=${apiKey}`,
  'Content-Type': 'application/json'
};

// Define the options object for the API request
const options = {
  url: url,
  headers: headers,
  method: 'GET'
};

// Send a GET request to the API endpoint
request(options, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    console.log(body);
  }
});
