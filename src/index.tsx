import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import TextArea from './components/TextArea';
import { getValueFromEvent } from './utils/event';

const App = () => {
  const [text, setText] = useState('');
  const handleTextChange = e => {
    setText(getValueFromEvent(e));
  };

  return (
    <div>
      <TextArea onChange={handleTextChange} value={text} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
