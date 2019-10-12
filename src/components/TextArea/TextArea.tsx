import React from 'react';
import classnames from 'classnames';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = (props: TextAreaProps) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  const getTextAreaClass = () => {
    const { className } = props;
    return classnames(className, 'textarea');
  };

  const { value } = props;
  return (
    <textarea
      value={value}
      onChange={handleTextareaChange}
      className={getTextAreaClass()}
      placeholder="请输入"
    />
  );
};

export default TextArea;
