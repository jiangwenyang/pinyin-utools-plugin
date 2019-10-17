import React from 'react';
import Group from './RadioGroup';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: any;
  value?: any;
  checked?: boolean;
  children?: React.ReactNode;
}

export interface RadioType extends React.FC<RadioProps> {
  Group?: typeof Group;
}

const Radio: RadioType = props => {
  const { children, value, checked } = props;

  const handleChange = e => {
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className="radio">
      <input type="radio" name={name} value={value} onChange={handleChange} checked={checked} />
      {children}
    </label>
  );
};

export default Radio;
