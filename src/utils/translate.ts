import pinyin from 'pinyin';

interface OptionType {
  segment?: boolean;
  heteronym?: boolean;
  style?: number;
}

const baseTranslate = (hanzi: string, option: OptionType) => {
  return pinyin(hanzi, option);
};

const defaultFormater = (baseTranslateResult: string[][], hanzi: string) =>
  baseTranslateResult.join(' ');

const translateAndFormate = (
  hanzi: string,
  option: OptionType = {},
  formater?: typeof defaultFormater,
) => {
  const pinyinArr = baseTranslate(hanzi, option);
  return formater ? formater(pinyinArr, hanzi) : pinyinArr;
};

export { OptionType, baseTranslate, translateAndFormate, defaultFormater };
