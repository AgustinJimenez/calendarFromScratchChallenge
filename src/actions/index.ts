import {
  CLEAR_CITY_OPTION_SAGA,
  LOAD_CALENDAR_PAGE_SAGA,
  ON_ACCEPT_CALENDAR_PAGE_DIALOG_SAGA,
  ON_CLOSE_CALENDAR_PAGE_DIALOG_SAGA,
  ON_OPEN_CALENDAR_PAGE_DIALOG_SAGA,
  ON_SEARCH_CITY_SAGA,
} from './types';

export const loadCalendarPageAction = ({date = ''}: {date?: string} = {}) => ({
  type: LOAD_CALENDAR_PAGE_SAGA,
  date,
});

export const onCloseCalendarPageDialogAction = () => ({
  type: ON_CLOSE_CALENDAR_PAGE_DIALOG_SAGA,
});

export const onOpenCalendarPageDialogAction = ({date}: any) => ({
  type: ON_OPEN_CALENDAR_PAGE_DIALOG_SAGA,
  date,
});

export const onAcceptCalendarPageDialogAction = ({
  data,
  close_dialog,
}: any) => ({
  type: ON_ACCEPT_CALENDAR_PAGE_DIALOG_SAGA,
  data,
  close_dialog,
});

export const onSearchCityAction = ({text}: any) => ({
  type: ON_SEARCH_CITY_SAGA,
  text,
});

export const clearCityOptionsAction = () => ({
  type: CLEAR_CITY_OPTION_SAGA,
});
