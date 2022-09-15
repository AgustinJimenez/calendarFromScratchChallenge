import {SET_ITEM_TO_DATASET_REDUCER} from './constants';

interface setDatasetOptions {
  key?: string;
  keyName?: string;
  type?: 'single' | 'list';
  replaceList?: boolean;
  debug?: boolean;
}

export const setDatasetToReducerAction = (
  data: any,
  dataset_name: string,
  options: setDatasetOptions = {},
) => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name,
  data,
  options: {...options, multiple: false, type: 'single'},
});
