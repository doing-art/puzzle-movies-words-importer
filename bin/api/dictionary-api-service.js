const axios = require('axios');

class DictionaryApiService {
  getDictionaryUrl;

  constructor(getDictionaryUrl) {
    this.getDictionaryUrl = getDictionaryUrl;
  }

  getDictionaryPage(page, cookie) {
    return axios.post(this.getDictionaryUrl, {}, {
      params: { page },
      headers: {
        Cookie: cookie,
        "x-requested-with": "XMLHttpRequest"
      }
    });
  }
}

module.exports = DictionaryApiService;
