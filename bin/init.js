const axios = require("axios");
const yargs = require("yargs");

class Init {
  static initAxios(baseURL) {
    axios.defaults.baseURL = baseURL;
  }

  static initYargs(types) {
    return yargs(process.argv.slice(2))
      .option('email', {
        alias: 'e',
        demandOption: true,
        describe: 'An email of the puzzle-movies account',
        type: 'string'
      })
      .option('password', {
        alias: 'p',
        demandOption: true,
        describe: 'A password of the puzzle-movies account',
        type: 'string'
      })
      .option('type', {
        alias: 't',
        demandOption: false,
        default: types.all,
        choices: [types.all, types.page, types.word],
        describe: `Export type: ${types.all} - all words (default), ${types.page} - all words on the pages from n to m, ${types.word} - first n words`,
        type: 'string'
      })
      .option('words', {
        alias: 'w',
        demandOption: false,
        number: true,
        describe: 'Number of words that should to be exported',
        type: 'number'
      })
      .option('start-page', {
        alias: 'sp',
        demandOption: false,
        number: true,
        describe: 'Start page number',
        type: 'number'
      })
      .option('end-page', {
        alias: 'ep',
        demandOption: false,
        number: true,
        describe: 'End page number',
        type: 'string'
      })
      .usage('Usage: importer import <email> <password> [options]')
      .example('importer import -e test@test.com -p qwerty123', 'Imports all the words from your dictionary')
      .help('h')
      .alias('h', 'help')
      .argv;
  }
}

module.exports = Init;
