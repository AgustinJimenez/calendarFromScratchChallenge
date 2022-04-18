import {put, takeLatest, select} from 'redux-saga/effects';
import {
  CLEAR_CITY_OPTION_SAGA,
  LOAD_CALENDAR_PAGE_SAGA,
  ON_ACCEPT_CALENDAR_PAGE_DIALOG_SAGA,
  ON_CLOSE_CALENDAR_PAGE_DIALOG_SAGA,
  ON_OPEN_CALENDAR_PAGE_DIALOG_SAGA,
  ON_SEARCH_CITY_SAGA,
} from '../../actions/types';
import {setDatasetToReducerAction} from '../../redux/actions';
import dayjs from 'dayjs';
import {YMD_FORMAT} from '../../constants';
import {datasetSelector} from '../../redux/selectors';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {v4 as uuidv4} from 'uuid';
import request from '../../sagas/request';
import {
  apiSearchCityByQueryUri,
  apiSearchPastWeatherByCityUri,
} from '../../api';
import ListToObjectList from '../../helpers/ListToObjectList';
// import {apiSearchWeatherByQueryUri} from '../../api';
dayjs.extend(weekOfYear);

function* loadCalendarPage({date}: any) {
  //@ts-ignore
  let calendar: any = yield select(state => datasetSelector(state, 'calendar'));

  const todayNow = dayjs();

  if (!!date) calendar['base_date'] = date;
  else if (!calendar['base_date'])
    calendar['base_date'] = todayNow.format(YMD_FORMAT);
  calendar['today_date'] = {
    value: todayNow.format(YMD_FORMAT),
    day: todayNow.format('dddd').toLowerCase(),
    week: todayNow.week(),
  };
  const dateMonth = dayjs(calendar['base_date']);
  const startOfMonth = dateMonth.startOf('month');
  const monthFirstWeekNumber = startOfMonth.week();
  const dates: any = {};
  const startOfFirstMonth = startOfMonth.subtract(1, 'month').startOf('month');
  const endOfThirdMonth = startOfMonth.add(1, 'month').endOf('month');
  let d = startOfFirstMonth.clone();
  while (!d.isAfter(endOfThirdMonth, 'date')) {
    let value = d.format(YMD_FORMAT);
    dates[value] = {
      value,
      day: d.format('dddd').toLowerCase(),
      week: d.week(),
      day_number: d.format('DD'),
    };
    d = d.add(1, 'day');
  }
  calendar['dates'] = dates;
  calendar['weeks_rows'] = [];
  const datesArray = Object.keys(calendar['dates']).map(
    (d: string) => calendar['dates'][d],
  );
  let w = monthFirstWeekNumber;
  while (!Boolean(calendar['weeks_rows'][5])) {
    const weekDates = datesArray
      .filter((d: any) => d['week'] === w)
      .map((d: any) => d.value);
    calendar['weeks_rows'].push(weekDates);
    w++;
    if (w > 52) w = 1;
  }
  calendar['dialog'] = {
    ...calendar.dialog,
    is_open: false,
  };
  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
}

export function* loadCalendarPageSaga() {
  yield takeLatest(LOAD_CALENDAR_PAGE_SAGA, loadCalendarPage);
}

function* onAcceptCalendarPageDialog({data, close_dialog}: any) {
  //@ts-ignore
  let calendar: any = yield select(state => datasetSelector(state, 'calendar'));
  const {text, date, time, city_id} = data;
  const id = data.id ? data.id : uuidv4();
  if (Boolean(close_dialog)) calendar['dialog']['is_open'] = false;

  const reminder = {
    text,
    date,
    time,
    city_id,
  };

  const reminder_city = calendar.cities[reminder.city_id];
  calendar.reminders = {
    ...calendar.reminders,
    [id]: reminder,
  };
  //@ts-ignore
  const response = yield request(
    apiSearchPastWeatherByCityUri({
      //@ts-ignore
      text: `${reminder_city?.lat},${reminder_city?.lon}`,
      //@ts-ignore
      date: reminder.date,
    }),
  );
  //@ts-ignore
  calendar.reminders[id].weather = response.data.current;

  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
}
export function* onAcceptCalendarPageDialogSaga() {
  yield takeLatest(
    ON_ACCEPT_CALENDAR_PAGE_DIALOG_SAGA,
    onAcceptCalendarPageDialog,
  );
}

function* onCloseCalendarPageDialog() {
  //@ts-ignore
  let calendar: any = yield select(state => datasetSelector(state, 'calendar'));
  calendar.dialog = {
    ...calendar.dialog,
    is_open: false,
  };
  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
}
export function* onCloseCalendarPageDialogSaga() {
  yield takeLatest(
    ON_CLOSE_CALENDAR_PAGE_DIALOG_SAGA,
    onCloseCalendarPageDialog,
  );
}

function* onOpenCalendarPageDialog({date}: any) {
  //@ts-ignore
  let calendar: any = yield select(state => datasetSelector(state, 'calendar'));
  calendar.dialog = {
    ...calendar.dialog,
    selected_date: date,
    is_open: true,
  };
  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
  const date_reminders: any[] = Object.keys(calendar.reminders || {})
    .filter((id: any) => calendar?.reminders?.[id]?.date === date)
    .map((id: any) => ({...calendar?.reminders?.[id], id}));

  // const today = dayjs();
  for (let reminder of date_reminders) {
    // const reminder_date = dayjs(reminder?.date)
    // if(toreminder_dateday.isafter(today))
    //@ts-ignore
    const reminder_city = calendar.cities[reminder.city_id];
    let {data} = yield request(
      apiSearchPastWeatherByCityUri({
        //@ts-ignore
        text: `${reminder_city?.lat},${reminder_city?.lon}`,
        //@ts-ignore
        date: reminder.date,
      }),
    );
    //@ts-ignore
    calendar.reminders[reminder.id].weather = data.current;
  }
  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
}
export function* onOpenCalendarPageDialogSaga() {
  yield takeLatest(ON_OPEN_CALENDAR_PAGE_DIALOG_SAGA, onOpenCalendarPageDialog);
}

function* onSearchCity({text}: any) {
  //@ts-ignore
  let calendar: any = yield select(state => datasetSelector(state, 'calendar'));
  calendar.search_city.is_loading = true;
  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
  //@ts-ignore
  const {data} = yield request(
    apiSearchCityByQueryUri({
      text,
    }),
  );
  calendar.cities = {
    ...calendar.cities,
    ...ListToObjectList(data),
  };
  calendar.search_city.options = data?.map?.(({id, name}: any) => ({
    id,
    label: name,
  }));
  calendar.search_city.is_loading = false;
  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
}
export function* onSearchCitySaga() {
  yield takeLatest(ON_SEARCH_CITY_SAGA, onSearchCity);
}

function* clearCityOptions({text}: any) {
  //@ts-ignore
  let calendar: any = yield select(state => datasetSelector(state, 'calendar'));
  calendar.search_city.options = [];
  yield put(setDatasetToReducerAction({...calendar}, 'calendar'));
}
export function* clearCityOptionsSaga() {
  yield takeLatest(CLEAR_CITY_OPTION_SAGA, clearCityOptions);
}
