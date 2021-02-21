#!/usr/bin/env node
const config = require('./config');
const Init = require('./init');
const AuthApiService = require('./api/auth-api-service');
const DictionaryApiService = require('./api/dictionary-api-service');
const DictionaryService = require('./services/dictionary-service');

class Application {
  constructor() {
    const argv = Init.initYargs();
    Init.initAxios(config.PUZZLE_MOVIES_ORIGIN);

    const authApiService = new AuthApiService(config.PUZZLE_MOVIES_AUTH_URL);

    const dictionaryApiService = new DictionaryApiService(config.PUZZLE_MOVIES_GET_DICTIONARY_URL);

    authApiService.auth(argv.email, argv.password).then((res) => {
      const { logged_in_cookie_name, logged_in_cookie } = res.data
      dictionaryApiService.getDictionaryPage(2, `${logged_in_cookie_name}=${logged_in_cookie}`);
    });


    const dictionaryService = new DictionaryService(config.WORDS_ON_PAGE_NUMBER);
  }
}

new Application();
