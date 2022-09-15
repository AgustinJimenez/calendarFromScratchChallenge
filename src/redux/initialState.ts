import {AppInitialStateType} from '../types';

const initialState: AppInitialStateType = {
  calendar: {
    base_date: '',
    today_date: {
      day: '',
      value: '',
      week: 0,
      day_number: '00',
    },
    dates: {},
    weeks_rows: [],
    reminders: {},
    dialog: {
      is_open: false,
      selected_date: undefined,
    },
    cities: {},
    search_city: {
      options: [],
      is_loading: false,
    },
  },
};

export default initialState;
