const axios = require("axios");
const yargs = require("yargs");

class Init {
  static initAxios(baseURL) {
    axios.defaults.baseURL = baseURL;
  }

  static initYargs() {
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
      .usage('Usage: importer import <email> <password> [options]')
      .example('importer import -e test@test.com -p qwerty123', 'Imports all the words from your dictionary')
      .help('h')
      .alias('h', 'help')
      .argv;
  }
}

module.exports = Init;
