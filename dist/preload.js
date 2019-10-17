const { clipboard } = require('electron');

copyText = text => {
  return clipboard.writeText(text);
};

copyHTML = htmlString => {
  return clipboard.writeHTML(htmlString);
};
