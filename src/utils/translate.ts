interface OptionType {
  segment?: boolean;
  heteronym?: boolean;
  style?: number;
}

const baseTranslate = (hanzi: string, option: OptionType) => {
  return window.pinyin(hanzi, option);
};

const defaultFormater = (baseTranslateResult: string[][]) => baseTranslateResult.join(' ');

const translateAndFormate = (
  hanzi: string,
  option: OptionType = {},
  formater = defaultFormater,
) => {
  return formater(baseTranslate(hanzi, option));
};

export { OptionType, baseTranslate, translateAndFormate };
