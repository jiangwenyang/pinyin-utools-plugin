import React from 'react';
import Group from './RadioGroup';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: any;
  value?: any;
  checked?: boolean;
  children?: React.ReactNode;
}

interface RadioType {
  (props: RadioProps): React.ReactNode;
  Group?: typeof Group;
}

const Radio: RadioType = (props: RadioProps) => {
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
