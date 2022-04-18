const initialState = {
  calendar: {
    base_date: '',
    today_date: '',
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
