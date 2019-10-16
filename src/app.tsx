import React, { useState, useEffect, useRef } from 'react';

import Config from './components/Config';

import { getValueFromEvent } from './utils/event';
import { translateAndFormate, OptionType } from './utils/translate';
import Button from './UI/Button';
import TextArea from './UI/TextArea';

const App = () => {
  const [hanzi, setHanzi] = useState('');
  const [pinyinText, setPinyinText] = useState('');
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
  }, [pinyinText]);

  useEffect(() => {
    translateHanziToPinyin(hanzi, option);
  }, [hanzi, option]);

  /**
   * 处理翻译汉字到拼音
   * @param {string} hanzi 汉字
   * @param {OptionType} option 配置对象
   */
  const translateHanziToPinyin = (hanzi: string, option: OptionType) => {
    const pinyinText = translateAndFormate(hanzi, option);
    setPinyinText(pinyinText);
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

  const handleCopy = () => {
    copy(pinyinText);
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
        {pinyinText && (
          <>
            <div className="column is-full">
              <Config option={option} onOptionChange={setOption} />
            </div>
            <div className="column is-full">
              <div className="box">
                <p className="content">{pinyinText}</p>
              </div>
            </div>
            <div className="column is-3 is-offset-5">
              <Button className="is-primary is-rounded" onClick={handleCopy}>
                <span className="icon is-small">
                  <i className="fas fa-copy"></i>
                </span>
                <span>复制(CTRL+C)</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
