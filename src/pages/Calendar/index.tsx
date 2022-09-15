import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadCalendarPageAction} from '../../actions';
import Grid from '@mui/material/Grid';
import {datasetSelector} from '../../redux/selectors';
import dayjs from 'dayjs';
import {Container, Typography} from '@mui/material';
import CalendarInput from './components/CalendarInput';
import {AppCalendarType} from '../../types';

function Calendar() {
  const dispatch = useDispatch();
  const calendar: AppCalendarType = useSelector(state =>
    datasetSelector(state, 'calendar'),
  );
  const date_in_month = calendar?.weeks_rows?.[3]?.[3];
  const init = () => {
    dispatch(loadCalendarPageAction());
  };
  React.useEffect(() => {
    init();
  }, []);

  const monthYear = React.useMemo(
    () =>
      Boolean(date_in_month) ? dayjs(date_in_month).format('YYYY - MMMM') : '',
    [date_in_month],
  );

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h3">Calendar</Typography>
        </Grid>
        <Grid item xs={6} alignSelf="flex-end">
          <Typography align="center" variant="h5">
            {monthYear}
          </Typography>
        </Grid>
      </Grid>
      <CalendarInput />
    </Container>
  );
}

export default Calendar;
