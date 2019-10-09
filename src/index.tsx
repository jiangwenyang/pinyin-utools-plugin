import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import TextArea from './components/TextArea';
import { getValueFromEvent } from './utils/event';

const App = () => {
  const [text, setText] = useState('');
  const [pinyinText, setPinyinText] = useState('');
  const handleTextChange = e => {
    const value = getValueFromEvent(e);
    const pinyinValue = window.pinyin(value).join(' ')
    setText(value);
    setPinyinText(pinyinValue);
    window.copy(pinyinValue)
  };

  return (
    <div>
      <TextArea onChange={handleTextChange} value={text} />
      {pinyinText}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
