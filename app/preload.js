const { clipboard } = require('electron');

/**
 * 复制文本到剪切板中
 * @param {string} text
 * @returns
 */
copyText = text => {
  return clipboard.writeText(text);
};
