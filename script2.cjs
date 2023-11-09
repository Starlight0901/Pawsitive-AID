import { config } from "dotenv"; // import the API KEY from .env file
config() 

const express = require('express');
const app = express();
const nodeFetch = require('node-fetch');

// Get the Bard API key
const apiKey = "agjzCSLcS5SBCqRWfn3OE3_MGT4Hw9Z46yMyZ3MDlONirswjSUq88Mv8cQOPvR6Idb51fg";

// Create a function to make a request to the Bard API
const getBardResponse = async (query) => {
  const url = `https://bard.google.com/v1/generate?query=${query}&model=bard`;
  const response = await nodeFetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });
  return await response.json();
};

// Create a function to respond to a user's query
const handleQuery = async (req, res) => {
  const query = req.body.query;
  const response = await getBardResponse(query);

  // If the query is about animal welfare organizations, veterinarians, or locational information, then return the results from the Bard API
  if (query.includes('animal welfare organization') ||
    query.includes('veterinarian') ||
    query.includes('location')
  ) {
    res.send(response);
  } else {
    res.send('Sorry, I can only answer questions about animal welfare organizations, veterinarians, or locational information.');
  }
};

// Create an endpoint for the chatbot
app.post('/chat', handleQuery);

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));