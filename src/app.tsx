import React, { useState, useEffect } from 'react';

import { translateAndFormate, ConfigType } from './utils/translate';
import Button from './components/Button';

const App = () => {
  const [chineseText, setChineseText] = useState('请输入需要转换的中文');
  const [pinyinText, setPinyinText] = useState('');
  const [config, setConfig] = useState({});

  const translateChineseToPinyin = (chineseText: string, config: ConfigType) => {
    const pinyinText = translateAndFormate(chineseText, config);
    setPinyinText(pinyinText);
  };

  useEffect(() => {
    translateChineseToPinyin(chineseText, config);
  }, [chineseText, config]);

  useEffect(() => {
    utools.setSubInput(
      ({ text }) => {
        setChineseText(text);
      },
      '请输入需要转换的中文',
      true,
    );
    utools.onPluginOut(() => {
      setChineseText('');
      setPinyinText('');
    });
  }, []);

  const handleCopy = () => {
    copy(pinyinText);
    utools.hideMainWindow();
  };

  return (
    <div className="container" style={{ padding: '0 20px' }}>
      <h1 className="title is-3">{chineseText || '请输入需要转换的中文'}</h1>

      <div className="box">
        <p className="content">{pinyinText}</p>
      </div>

      <div className="level" style={{ marginTop: 20 }}>
        <div className="level-item">
          <Button className="is-primary is-rounded" onClick={handleCopy}>
            复制(CTRL+C)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
