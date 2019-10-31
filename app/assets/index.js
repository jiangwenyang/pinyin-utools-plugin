let options = {
  style: pinyin.STYLE_TONE,
  segment: false,
  heteronym: false
};

let pinyinResult;

const $pinyin = $('#pinyin');
const $hanziTextArea = $('#hanziTextArea');
const $segmentField = $('#segment');
const $heteronymField = $('#heteronym');
const $styleField = $('#style');
const $copyPinyin = $('#copyPinyin');
const $copyHanziAndPinyin = $('#copyHanziAndPinyin');

/**
 * 汉字拼音转换
 * @param {string} word 汉字
 * @param {Object} options 配置选项
 * @param {function} formate 格式化结果函数，接收pinyin库的转换结果作为参数
 * @returns
 */
function baseTranslate(word, options, formate = defaultFormate) {
  const result = pinyin(word, options);
  pinyinResult = result;
  return formate(result);
}

// 执行翻译并更新结果
function translate() {
  const word = $hanziTextArea.val();
  const result = baseTranslate(word, options);
  $pinyin.text(result);
}

/**
 * 默认的格式化函数
 * @param {Array} result
 * @returns {string} 格式化后的拼音字符串
 */
function defaultFormate(result) {
  return result.join(' ');
}

utools.onPluginEnter(({ code, type, payload }) => {
  $hanziTextArea.focus();
  $hanziTextArea.val(payload);
  translate(payload, options);
});

// 处理文本输入
$hanziTextArea.on('input', e => {
  translate();
});

// 处理分词改变
$segmentField.on('change', 'input', e => {
  const segment = !!Number(e.target.value);
  options.segment = segment;
  translate();
});

// 处理多音字选项开启
$heteronymField.on('change', 'input', e => {
  const heteronym = !!Number(e.target.value);
  options.heteronym = heteronym;
  translate();
});

// 处理输出风格改变
$styleField.on('change', 'input', e => {
  const styleMap = {
    1: pinyin.STYLE_TONE,
    2: pinyin.STYLE_NORMAL,
    3: pinyin.STYLE_TONE2,
    4: pinyin.STYLE_TO3NE,
    5: pinyin.STYLE_INITIALS,
    6: pinyin.STYLE_FIRST_LETTER
  };
  options.style = styleMap[Number(e.target.value)];
  translate();
});

// 处理复制拼音
function copyPinyin() {
  copyText($pinyin.text());
  utools.outPlugin();
}

// 处理复制汉字和拼音
function copyHanziAndPinyin() {
  const word = $hanziTextArea.val();

  if (!word.length) return;

  const copyString = word
    .split('')
    .map((hanzi, idx) => `${hanzi}(${pinyinResult[idx].join(',')})`)
    .join(' ');
  copyText(copyString);
  utools.outPlugin();
}

// 监听CTRL+C，在页面没有选中文本时执行默认复制
document.onkeyup = e => {
  const isC = e.keyCode === 67;
  const isWithCtrl = e.ctrlKey;
  const isWithShift = e.shiftKey;
  const isCtrlWithC = isWithCtrl && !isWithShift && isC;
  const isCtrlWithShiftWithC = isWithCtrl && isWithShift && isC;
  const hasSelection = !!window.getSelection().toString();
  if (!hasSelection) {
    isCtrlWithC && copyPinyin();
    isCtrlWithShiftWithC && copyHanziAndPinyin();
  }
};

// 监听点击复制拼音按钮
$copyPinyin.on('click', copyPinyin);

// 监听点击复制汉字和拼音按钮
$copyHanziAndPinyin.on('click', copyHanziAndPinyin);
