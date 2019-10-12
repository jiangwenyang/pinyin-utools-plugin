export interface ConfigType {}

const baseTranslate = (chinese: string, option: ConfigType = {}) => {
  return window.pinyin(chinese, option);
};

const defaultFormater = (baseTranslateResult: string[][]) => baseTranslateResult.join(' ');

const translateAndFormate = (chinese: string, option: ConfigType = {}, formater = defaultFormater) => {
  return formater(baseTranslate(chinese, option));
};

export { baseTranslate, translateAndFormate };
