import React from 'react';
import classnames from 'classnames';

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Field: React.FC<FieldProps> = props => {
  const getFieldClass = () => {
    const { className } = props;
    return classnames(className, 'field');
  };
  return <div className={getFieldClass()}>{props.children}</div>;
};

export default Field;
