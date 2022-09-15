import {LanguagesDataType, LanguagesTypes} from '../types';
import data from './data.json';

const listIds = Object.keys(data as LanguagesDataType);
const getDataLang = (lang: LanguagesTypes) => {
  var dataLang: {
    [id: string]: string;
  } = {};
  listIds.forEach(
    (id: string) => (dataLang[id] = (data as LanguagesDataType)[id][lang]),
  );
  return dataLang;
};

export const en = {
  translation: getDataLang('en'),
};
export const es = {
  translation: getDataLang('es'),
};
