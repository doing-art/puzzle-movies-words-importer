const axios = require("axios");
const yargs = require("yargs");

class Init {
  static initAxios(baseURL) {
    axios.defaults.baseURL = baseURL;
  }

  static initYargs(exportTypes) {
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
        default: exportTypes.ALL,
        choices: [exportTypes.ALL, exportTypes.PAGE, exportTypes.WORD],
        describe: `Export type: ${exportTypes.ALL} - all words (default), ${exportTypes.PAGE} - all words on the pages from n to m, ${exportTypes.WORD} - first n words`,
        type: 'string'
      })
      .option('words', {
        alias: 'w',
        demandOption: false,
        number: true,
        describe: 'Number of words that should to be exported',
        type: 'number'
      })
      .option('startpage', {
        alias: 's',
        demandOption: false,
        number: true,
        describe: 'Start page number',
        type: 'number'
      })
      .option('finishpage', {
        alias: 'f',
        demandOption: false,
        number: true,
        describe: 'End page number',
        type: 'number'
      })
      .usage('Usage: importer import <email> <password> [options]')
      .example('importer import -e test@test.com -p qwerty123', 'Imports all the words from your dictionary')
      .help('h')
      .alias('h', 'help')
      .argv;
  }
}

module.exports = Init;
