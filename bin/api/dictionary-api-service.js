const axios = require('axios');

class DictionaryApiService {
  getDictionaryUrl;

  constructor(getDictionaryUrl) {
    this.getDictionaryUrl = getDictionaryUrl;
  }

  async getDictionaryPage(page) {
    return axios.post(this.getDictionaryUrl, {}, {
      params: { page },
      headers: {
        'x-requested-with': 'XMLHttpRequest'
      }
    }).then(res => res.data);
  }
}

module.exports = DictionaryApiService;
