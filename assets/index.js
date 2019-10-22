let wordText = '';
let pinyinText = '';
const options = {
  style: pinyin.STYLE_TONE,
  segment: false,
  heteronym: false
};

const $pinyin = $('#pinyin');
const $hanziTextArea = $('#hanziTextArea');

const $styleRadio = $('input[name="style"]');

console.log($styleRadio)

utools.onPluginEnter(({ code, type, payload }) => {
  translate(payload);
});

$hanziTextArea.on('input', e => {
  translate(e.target.value);
});

function translate(word, options) {
  const result = pinyin(word);
  pinyinText = formate(result);
  $pinyin.text(pinyinText);
}

function formate(result) {
  return result.join(' ');
}
