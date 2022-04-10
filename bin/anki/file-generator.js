const { promises: fs } = require("fs");
const path = require('path');

class FileGenerator {
  constructor(outcomeDirectory) {
    this.outcomePath = path.resolve(outcomeDirectory);
  }

  stringifyWordsList(wordsList) {
    return wordsList
      .map(({ original, translation }) => `${original} ; ${translation}`)
      .join('\n');
  }

  generateFilePath() {
    const now = new Date();
    const fileName = `anki-words_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.txt`;
    return path.join(this.outcomePath, fileName);
  }

  generateFile(wordsList) {
    const wordsString = this.stringifyWordsList(wordsList);
    const filePath = this.generateFilePath();

    return fs.mkdir(this.outcomePath)
      .catch(() => {})
      .finally(() => fs.writeFile(filePath, wordsString));
  }
}

module.exports = FileGenerator;
