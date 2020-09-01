const axios = require('axios');

let apiInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  timeout: 60*1000,
});

module.exports = {
    apiInstance,
};
