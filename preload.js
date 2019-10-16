const { clipboard } = require('electron');

pinyin = require('pinyin');

copy = text => {
  return clipboard.writeText(text);
};
