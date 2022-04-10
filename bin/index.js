#!/usr/bin/env node
const config = require('./config');
const Init = require('./init');
const AuthApiService = require('./api/auth-api-service');
const DictionaryApiService = require('./api/dictionary-api-service');
const DictionaryService = require('./services/dictionary-service');
const AuthService = require('./services/auth-service');
const ParserService = require('./services/parser-service');

class Application {
  constructor() {
    this.init();
  }

  async init() {
    const argv = Init.initYargs({
      all: config.TYPE_ALL,
      page: config.TYPE_PAGE,
      word: config.TYPE_WORD
    });
    Init.initAxios(config.PUZZLE_MOVIES_ORIGIN);

    const authApiService = new AuthApiService(config.PUZZLE_MOVIES_AUTH_URL);
    const dictionaryApiService = new DictionaryApiService(config.PUZZLE_MOVIES_GET_DICTIONARY_URL);

    const authService = new AuthService(authApiService);
    await authService.init(argv.email, argv.password);

    const parserService = new ParserService();
    const dictionaryService = new DictionaryService(config.WORDS_ON_PAGE_NUMBER, dictionaryApiService, parserService);

    // const allWords = await dictionaryService.getAllWords();
    // const firstTwoPagesWords = await dictionaryService.getAllWordsOnPages(1, 2);
    // const firstNWords = await dictionaryService.getSeveralWords(78);
    console.log('allWords');
  }

  getAllWordsWrapper(dictionaryService) {
    return dictionaryService.getAllWords();
  }

  getAllWordsOnPagesWrapper(dictionaryService, {  }) {

  }

  getSeveralWordsWrapper(dictionaryService, { words }) {

  }

  exportWords(dictionaryService, argv) {


    const typesToImplementationMap = new Map([
      ['all', 'one'],
      ['page', 'two'],
      ['word', 'three'],
    ]);
  }
}

new Application();

// TODO Implementation
// 1. Add map for import types.
// 2. File generation

// TODO Refactoring
// 1. Rename and move auth.init
// 2. Move axios init to a separate module
// 3. Rename yargs init
// 4. Add yargs options to the config file

// TODO Implementation Optional
// 1. Add map for import types.
// 2. Importer script for anki

// TODO Refactoring Optional
// 1. Introduce TS
// 2. Introduce IoC
// 3. Try to implement different strategies
