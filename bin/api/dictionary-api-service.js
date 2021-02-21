const axios = require('axios');

class DictionaryApiService {
  getDictionaryUrl;

  constructor(getDictionaryUrl) {
    this.getDictionaryUrl = getDictionaryUrl;
  }

  getDictionaryPage(page) {
    return axios.post(this.config.getDictionaryUrl, {}, {
      params: { page }
    });
  }
}

module.exports = DictionaryApiService;
