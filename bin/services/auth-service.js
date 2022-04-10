const axios = require('axios');

class AuthService {
  constructor(authApiService) {
    this.authApiService = authApiService;
  }

  async init(email, password) {
    const { logged_in_cookie_name, logged_in_cookie } = await this.authApiService.auth(email, password);
    axios.defaults.headers.common['Cookie'] = `${logged_in_cookie_name}=${logged_in_cookie}`;
  }
}

module.exports = AuthService;
