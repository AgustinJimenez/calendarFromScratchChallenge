import {useDispatch, useSelector} from 'react-redux';
import {loadCalendarPageAction} from '../../../actions';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {datasetSelector} from '../../../redux/selectors';
import {YMD_FORMAT} from '../../../constants';
import {TypeChangeMonth} from '../../../types';
import dayjs from 'dayjs';
import CalendarInputDaysRow from './CalendarInputDaysRow';
import CalendarWeekRows from './CalendarWeekRows';
import CalendarRemindersDialog from './CalendarRemindersDialog';

const CalendarInput = () => {
  const dispatch = useDispatch();
  const calendar = useSelector(state => datasetSelector(state, 'calendar'));
  const date_in_month: string = calendar?.weeks_rows?.[3]?.[3];
  const changeMonth = (type: TypeChangeMonth) => {
    const start_of_month = dayjs(date_in_month).startOf('month');
    let date = '';
    if (type === TypeChangeMonth.Next)
      date = start_of_month.add(1, 'month').format(YMD_FORMAT);
    else date = start_of_month.subtract(1, 'month').format(YMD_FORMAT);
    dispatch(loadCalendarPageAction({date}));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <IconButton
          color="primary"
          size="large"
          onClick={() => changeMonth(TypeChangeMonth.Prev)}>
          <ArrowLeftIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <Card>
          <CardContent>
            <CalendarInputDaysRow />
            <CalendarWeekRows />
            <CalendarRemindersDialog />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          color="primary"
          size="large"
          onClick={() => changeMonth(TypeChangeMonth.Next)}>
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CalendarInput;
