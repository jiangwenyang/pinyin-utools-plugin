const { clipboard } = require('electron');

pinyin = require('pinyin');

copyText = text => {
  return clipboard.writeText(text);
};

copyHTML = htmlString => {
  return clipboard.writeHTML(htmlString);
};
