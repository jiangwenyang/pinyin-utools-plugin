import React from 'react';
import classnames from 'classnames';

interface ControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Control = (props: ControlProps) => {
  const getControlClass = () => {
    const { className } = props;
    return classnames(className, 'control');
  };

  return <div className={getControlClass()}>{props.children}</div>;
};

export default Control;
