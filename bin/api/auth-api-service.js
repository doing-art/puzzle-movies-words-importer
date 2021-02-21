const axios = require('axios');

class AuthApiService {
  authUrl;

  constructor(authUrl) {
    this.authUrl = authUrl;
  }

  auth(credentials) {
    return axios.post(this.authUrl, credentials);
  }
}

module.exports = AuthApiService;
