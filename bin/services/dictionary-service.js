class DictionaryService {
  wordsOnPageNumber;

  constructor(wordsOnPageNumber, dictionaryApiService, parserService) {
    this.wordsOnPageNumber = wordsOnPageNumber;
    this.dictionaryApiService = dictionaryApiService;
    this.parserService = parserService;
  }

  async getPages(startPageNumber, endPageNumber) {
    const pagePromises = [];

    for(let i = startPageNumber; i <= endPageNumber; i++) {
      pagePromises.push(this.dictionaryApiService.getDictionaryPage(i));
    }

    return Promise.all(pagePromises);
  }

  async getAllWords() {
    const firstPage = await this.dictionaryApiService.getDictionaryPage(1);
    const totalPages = Math.ceil(firstPage.total_words / this.wordsOnPageNumber);
    const pages = [firstPage, ...await this.getPages(2, totalPages)];

    return this.parserService.parsePages(pages);
  }

  async getAllWordsOnPages(startPageNumber, endPageNumber) {
    const pages = await this.getPages(startPageNumber, endPageNumber);

    return this.parserService.parsePages(pages);
  }

  async getSeveralWords(wordsNumber) {
    const pagesToLoad = Math.ceil(wordsNumber / this.wordsOnPageNumber);
    const pages = await this.getPages(1, pagesToLoad);
    const wordsList = this.parserService.parsePages(pages);

    return wordsList.slice(0, wordsNumber);
  }
}

module.exports = DictionaryService;
