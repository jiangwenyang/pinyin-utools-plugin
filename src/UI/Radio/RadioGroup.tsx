import React from 'react';
import { getValueFromEvent } from '../../utils/event';
import { RadioProps } from './Radio';

interface RadioGroupProps {
  name?: string;
  value?: any;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = props => {
  const { name, value, children } = props;

  const handleChange = e => {
    const { onChange } = props;
    if (onChange) {
      onChange(getValueFromEvent(e));
    }
  };

  const radioGroup = React.Children.map(children, (child: React.ReactElement<RadioProps>) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      name,
      checked: String(child.props.value) === String(value),
      onChange: handleChange,
    });
  });

  return <div>{radioGroup}</div>;
};

export default RadioGroup;
