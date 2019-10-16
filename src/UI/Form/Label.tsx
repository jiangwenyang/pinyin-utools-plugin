import React from 'react';
import classnames from 'classnames';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

const Label = (props: LabelProps) => {
  const getLabelClass = () => {
    const { className } = props;
    return classnames(className, 'label');
  };
  return <label className={getLabelClass()}>{props.children}</label>;
};

export default Label;
