import React from 'react';
import classnames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const getButtonClass = () => {
    const { className } = props;
    return classnames(className, 'button');
  };

  const handleClick = e => {
    const { onClick } = props;
    if (onClick) {
      onClick(e);
    }
  };

  const { children } = props;
  return (
    <button className={getButtonClass()} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
