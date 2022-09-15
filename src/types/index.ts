export enum TypeChangeMonth {
  Prev = 'previous_month',
  Next = 'next_month',
}

export type AppReminderType = {
  id?: string;
  city_id: number;
  date: string;
  text: string;
  time: string;
  weather?: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
};

export type AppTodayDateType = {
  value: string;
  day: string;
  week: number;
  day_number: string;
};

export type AppDatesObjectListType = {
  [date: string]: AppTodayDateType;
};
export type AppCityType = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};
export type AppCalendarType = {
  base_date: string;
  today_date: AppTodayDateType;
  dates: AppDatesObjectListType;
  weeks_rows: string[][];
  reminders: {
    [id: string]: AppReminderType;
  };
  dialog: {
    is_open: boolean;
    selected_date?: string;
  };
  cities: {
    [id: string]: AppCityType;
  };
  search_city: {
    options: {
      id: number;
      label: string;
    }[];
    is_loading: boolean;
  };
};

export type AppInitialStateType = {
  calendar: AppCalendarType;
};
