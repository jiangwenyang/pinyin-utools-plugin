import React from 'react';
import { getValueFromEvent } from '../../utils/event';

interface RadioGroupProps {
  name?: string;
  value?: any;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { name, value, children } = props;

  const handleChange = e => {
    const { onChange } = props;
    if (onChange) {
      onChange(getValueFromEvent(e));
    }
  };

  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      name,
      checked: String(child.props.value) === String(value),
      onChange: handleChange,
    });
  });
};

export default RadioGroup;
