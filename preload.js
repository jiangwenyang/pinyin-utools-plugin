const { clipboard } = require('electron');

pinyin = require('pinyin');

copy = text => {
  clipboard.writeText(text);
};
