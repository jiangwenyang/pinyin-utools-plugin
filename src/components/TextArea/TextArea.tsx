import React from 'react';

const TextArea = ({ onChange, value }) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <textarea
      value={value}
      onChange={handleTextareaChange}
      className="textarea is-primary"
      placeholder="请输入"
    />
  );
};

export default TextArea;
