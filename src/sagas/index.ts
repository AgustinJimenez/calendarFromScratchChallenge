import {all} from 'redux-saga/effects';

import {
  clearCityOptionsSaga,
  loadCalendarPageSaga,
  onAcceptCalendarPageDialogSaga,
  onCloseCalendarPageDialogSaga,
  onOpenCalendarPageDialogSaga,
  onSearchCitySaga,
} from '../pages/Calendar/saga';

export default function* rootSaga() {
  yield all([
    loadCalendarPageSaga(),
    onAcceptCalendarPageDialogSaga(),
    onOpenCalendarPageDialogSaga(),
    onCloseCalendarPageDialogSaga(),
    onSearchCitySaga(),
    clearCityOptionsSaga(),
  ]);
}
