const { JSDOM } = require('jsdom');

const TRANSLATED_WORD_DATA_ATTR = 'translate';
const ORIGINAL_WORD_SELECTOR = `[data-${TRANSLATED_WORD_DATA_ATTR}]`;

class ParserService {
  extractText(originalNodes) {
    return [...originalNodes].map((originalNode) => ({
      original: this.trimContent(originalNode.textContent),
      translation: originalNode.dataset[TRANSLATED_WORD_DATA_ATTR]
    }));
  }

  trimContent(textContent) {
    return textContent.trim().replace(/\s+/g, ' ');
  }

  parsePages(htmlPages) {
    return htmlPages.map((htmlPage) => this.parseSinglePage(htmlPage)).flat();
  }

  parseSinglePage({ page_html: htmlContent }) {
    const dom = new JSDOM(htmlContent);
    const originalNodes = dom.window.document.querySelectorAll(ORIGINAL_WORD_SELECTOR);

    return this.extractText(originalNodes);
  }
}

module.exports = ParserService;
