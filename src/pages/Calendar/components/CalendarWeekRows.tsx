import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {onOpenCalendarPageDialogAction} from '../../../actions';
import {
  StyledCalendarWeekRowContainer,
  StyledCalendarDateContainer,
  StyledDayRemindNumContainers,
} from '../styles';
import {datasetSelector} from '../../../redux/selectors';

const CalendarWeekRows = () => {
  const dispatch = useDispatch();
  const calendar = useSelector(state => datasetSelector(state, 'calendar'));
  const onOpenDialog = (date_str: string) =>
    dispatch(onOpenCalendarPageDialogAction({date: date_str}));

  return calendar.weeks_rows?.map?.((week_row_dates: string[], key: number) => (
    <StyledCalendarWeekRowContainer key={key}>
      {week_row_dates.map((date_str: string, key2: number) => {
        const date = calendar?.['dates']?.[date_str];
        const remindersCount = Object.keys(calendar.reminders || {}).filter(
          id => calendar.reminders[id].date === date_str,
        )?.length;

        const isDateFromAnotherMonth =
          dayjs(date_str).month() !== dayjs(calendar.base_date).month();

        const istoday = calendar.today_date.value === date.value;

        return (
          <StyledCalendarDateContainer
            key={key2}
            disabled={isDateFromAnotherMonth}
            onClick={() => onOpenDialog(date.value)}
            //@ts-ignore
            istoday={String(istoday)}
            //@ts-ignore
            isweekend={String(['sunday', 'saturday'].includes(date.day))}>
            {date?.['day_number']}
            <StyledDayRemindNumContainers
              badgeContent={remindersCount}
              color="primary"
            />
          </StyledCalendarDateContainer>
        );
      })}
    </StyledCalendarWeekRowContainer>
  ));
};

export default CalendarWeekRows;
