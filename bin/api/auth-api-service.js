const axios = require('axios');
const FormData = require('form-data');

class AuthApiService {
  authUrl;

  constructor(authUrl) {
    this.authUrl = authUrl;
  }

  auth(email, password) {
    const credentialsForm = new FormData();

    credentialsForm.append('email', email);
    credentialsForm.append('password', password);

    return axios({
      method: 'post',
      url: this.authUrl,
      data: credentialsForm,
      headers: { 'Content-Type': credentialsForm.getHeaders()['content-type'] }
    }).then(res => res.data);
  }
}

module.exports = AuthApiService;
