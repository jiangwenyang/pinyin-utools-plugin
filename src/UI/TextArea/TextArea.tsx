import React from 'react';
import classnames from 'classnames';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef((props: TextAreaProps, ref: React.Ref<HTMLTextAreaElement>) => {
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

  const { value, placeholder } = props;
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={handleTextareaChange}
      className={getTextAreaClass()}
      placeholder={placeholder}
    />
  );
});

export default TextArea;
