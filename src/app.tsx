import React, { useState, useEffect, useRef } from 'react';

import Config from './components/Config';
import Result from './components/Result';

import { getValueFromEvent } from './utils/event';
import { translateAndFormate, OptionType } from './utils/translate';
import Button from './UI/Button';
import TextArea from './UI/TextArea';

const App = () => {
  const [hanzi, setHanzi] = useState('');
  const [pinyinResult, setPinyinResult] = useState(null);
  const [option, setOption] = useState({
    segment: false,
    heteronym: false,
    style: pinyin.STYLE_TONE,
  });
  const hanziTextAreaRef = useRef(null);

  // 初始化
  useEffect(() => {
    utools.onPluginEnter(({ code, type, payload }) => {
      setHanzi(payload);
      hanziTextAreaRef.current && hanziTextAreaRef.current.focus();
    });
  });

  // 监听ctrl+c复制
  useEffect(() => {
    document.addEventListener('keyup', ctrlAndCListener);
    return () => document.removeEventListener('keyup', ctrlAndCListener);
  }, [pinyinResult]);

  useEffect(() => {
    translateHanziToPinyin(hanzi, option);
  }, [hanzi, option]);

  /**
   * 处理翻译汉字到拼音
   * @param {string} hanzi 汉字
   * @param {OptionType} option 配置对象
   */
  const translateHanziToPinyin = (hanzi: string, option: OptionType) => {
    const pinyinResult = translateAndFormate(hanzi, option);
    setPinyinResult(pinyinResult);
  };

  // 处理ctrl+c复制
  const ctrlAndCListener = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.keyCode === 67) {
      e.preventDefault();
      handleCopy();
    }
  };

  // 处理汉字改变
  const handleHanziChange = e => {
    setHanzi(getValueFromEvent(e));
  };

  const handleCopy = (type = 'plainText') => {
    switch (type) {
      case 'plainText':
        const pinyinText = pinyinResult
          ? pinyinResult.reduce((str, item) => {
              if (item.length > 1) {
                return `${str} (${item.join(',')})`;
              } else {
                return `${str} ${item[0]}`;
              }
            }, '')
          : '';
        copyText(pinyinText);
        break;
      case 'HTML':
        const htmlString = hanzi
          .split('')
          .reduce(
            (htmlString, hanziItem, hanziIndex) =>
              `${htmlString}${
                pinyinResult[hanziIndex] ? pinyinResult[hanziIndex].join(' ') : ''
              }<br />${hanziItem}<br /><br />`,
            '',
          );
        copyHTML(htmlString);
        break;
      default:
        break;
    }
    utools.outPlugin();
    utools.hideMainWindow();
  };

  return (
    <div className="container" style={{ padding: '0 20px' }}>
      <div className="columns is-desktop is-centered">
        <div className="column is-full">
          <TextArea
            ref={hanziTextAreaRef}
            value={hanzi}
            onChange={handleHanziChange}
            placeholder="请输入需要转换的中文"
          />
        </div>
        {pinyinResult && !!pinyinResult.length && (
          <>
            <div className="column is-full">
              <Config option={option} onOptionChange={setOption} />
            </div>

            <div className="column is-full">
              <div className="box">
                <div className="content">
                  <Result hanzi={hanzi} pinyin={pinyinResult} />
                </div>
              </div>
            </div>
            <div className="column is-full">
              <div className="columns">
                <div className="column is-3 is-offset-3">
                  <Button className="is-primary is-rounded" onClick={() => handleCopy('plainText')}>
                    <span className="icon is-small">
                      <i className="fas fa-copy"></i>
                    </span>
                    <span>复制拼音(CTRL+C)</span>
                  </Button>
                </div>
                <div className="column is-3">
                  <Button className="is-primary is-rounded" onClick={() => handleCopy('HTML')}>
                    <span className="icon is-small">
                      <i className="fas fa-copy"></i>
                    </span>
                    <span>复制中文和拼音</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
