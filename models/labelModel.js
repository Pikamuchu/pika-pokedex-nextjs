const labelsDefault = require('./data/labels_en.json');

const AVAILABLE_LANGUAGES = ['en', 'es'];

export const getLabels = (lang) => {
  return AVAILABLE_LANGUAGES.includes(lang) ? require(`./data/labels_${lang}.json`) : labelsDefault;
};
