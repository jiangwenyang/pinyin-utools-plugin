import React from 'react';
import { OptionType } from '../../utils/translate';

import Form from '../../UI/Form';
import Radio from '../../UI/Radio';

const { Field, Label, Control } = Form;

interface ConfigType {
  option?: OptionType;
  onOptionChange?: (option: OptionType) => void;
}

const Config = (props: ConfigType) => {
  const { segment, heteronym, style } = props.option;

  const handleOptionChange = option => {
    const { onOptionChange } = props;
    if (onOptionChange) {
      onOptionChange({
        ...props.option,
        ...option,
      });
    }
  };

  return (
    <div className="colunms">
      {/* <div className="column is-3">
        <Field>
          <Label>开启分词</Label>
          <Control>
            <Radio.Group
              name="segment"
              value={segment ? '1' : '2'}
              onChange={value =>
                handleOptionChange({
                  segment: value === '1',
                })
              }
            >
              <Radio value="1">开启</Radio>
              <Radio value="2">关闭</Radio>
            </Radio.Group>
          </Control>
        </Field>
      </div> */}
      <div className="column is-3">
        <Field>
          <Label>开启多音字</Label>
          <Control>
            <Radio.Group
              name="heteronym"
              value={heteronym ? '1' : '2'}
              onChange={value =>
                handleOptionChange({
                  heteronym: value === '1',
                })
              }
            >
              <Radio value="1">开启</Radio>
              <Radio value="2">关闭</Radio>
            </Radio.Group>
          </Control>
        </Field>
      </div>
      <div className="column is-full">
        <Field>
          <Label>拼音风格</Label>
          <Control>
            <Radio.Group
              name="heteronym"
              value={style}
              onChange={value =>
                handleOptionChange({
                  style: Number(value),
                })
              }
            >
              <Radio value={pinyin.STYLE_NORMAL}>不带声调(zhong xing)</Radio>
              <Radio value={pinyin.STYLE_TONE}>风格1(zhōng xīn)</Radio>
              <Radio value={pinyin.STYLE_TONE2}>风格2(zhong1 xin1)</Radio>
              <Radio value={pinyin.STYLE_TO3NE}>风格3(zho1ng xi1n)</Radio>
              <Radio value={pinyin.STYLE_INITIALS}>声母(zh x)</Radio>
              <Radio value={pinyin.STYLE_FIRST_LETTER}>首字母(z x)</Radio>
            </Radio.Group>
          </Control>
        </Field>
      </div>
    </div>
  );
};

export default Config;
