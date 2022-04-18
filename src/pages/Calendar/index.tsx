import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadCalendarPageAction,
  onAcceptCalendarPageDialogAction,
  onCloseCalendarPageDialogAction,
  onOpenCalendarPageDialogAction,
  onSearchCityAction,
} from '../../actions';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from 'react-i18next';
import {
  StyledCalendarInputDatesRowsContainer,
  StyledCalendarInputDaysRowText,
  StyledCalendarDateContainer,
  StyledCalendarWeekRowContainer,
  StyledCloseIcon,
  StyledDayRemindNumContainers,
} from './styles';
import {datasetSelector} from '../../redux/selectors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import {Container, Typography} from '@mui/material';
import {YMD_FORMAT} from '../../constants';

const CalendarInputDaysRow = () => {
  const {t}: any = useTranslation();
  return (
    <StyledCalendarInputDatesRowsContainer>
      {[
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ].map(day => {
        return (
          <StyledCalendarInputDaysRowText key={day}>
            {t(day)}
          </StyledCalendarInputDaysRowText>
        );
      })}
    </StyledCalendarInputDatesRowsContainer>
  );
};

const CalendarWeekRows = () => {
  const dispatch = useDispatch();
  const calendar = useSelector(state => datasetSelector(state, 'calendar'));
  const onOpenDialog = (date_str: any) =>
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
let timer: any = null;

const CalendarReminderDialogContent = () => {
  const dispatch = useDispatch();
  const reminderTextInputRef = useRef();
  const [remiderToEditId, setReminderToEditId] = useState<string | undefined>();
  const [reminderText, setReminderText] = useState('');
  const [reminderCity, setReminderCity] = useState('');
  const [reminderCityId, setReminderCityId] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  useEffect(() => {
    const shouldSearchCity = reminderCity?.trim?.()?.length > 3;
    if (shouldSearchCity) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(
          onSearchCityAction({
            text: reminderCity,
          }),
        );
      }, 500);
    }
  }, [reminderCity]);

  const [reminderDate, setReminderDate] = useState('');
  const calendar = useSelector(state => datasetSelector(state, 'calendar'));
  const selectedDateReminders: any[] = Object.keys(
    calendar.reminders || {},
  ).filter(
    id => calendar.reminders[id].date === calendar?.dialog?.selected_date,
  );

  const onAddReminder = () => {
    const id = remiderToEditId;
    let close_dialog = false;
    if (Boolean(id))
      close_dialog = reminderDate !== calendar?.dialog?.selected_date;
    dispatch(
      onAcceptCalendarPageDialogAction({
        close_dialog,
        data: {
          date: Boolean(remiderToEditId)
            ? reminderDate
            : calendar?.dialog?.selected_date,
          text: reminderText,
          city_id: reminderCityId,
          time: reminderTime,
          id,
        },
      }),
    );
    setReminderText('');
    setReminderTime('');
    setReminderCity('');
    setReminderDate('');
    setReminderCityId('');
  };
  const timeIsValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
    reminderTime,
  );
  const reminderTextIsValid = Boolean(reminderText?.trim()?.length);
  const reminderCityIsValid = Boolean(reminderCityId);
  const submitButtonIsDisabled =
    !reminderCityIsValid || !reminderTextIsValid || !timeIsValid;
  const setReminderToEdit = (reminder: any) => {
    setReminderText(reminder.text);
    setReminderTime(reminder.time || '');
    setReminderToEditId(reminder.id);
    setReminderDate(reminder.date);
    setReminderCityId(reminder.city_id);
    const city = calendar.cities?.[reminder?.city_id];
    setReminderCity(city?.name);
    (reminderTextInputRef?.current as any)?.focus?.();
  };
  const onEditReminder = () => {
    onAddReminder();
    setReminderToEditId(undefined);
  };
  return (
    <Grid container>
      <Grid container item direction="row" alignSelf="center" spacing={4}>
        <Grid item xs={12}>
          <TextField
            inputRef={reminderTextInputRef}
            id="reminder-text"
            label="Reminder"
            type="text"
            fullWidth
            value={reminderText}
            inputProps={{
              maxLength: 30,
            }}
            onChange={(event: any) => setReminderText(event?.target?.value)}
          />
        </Grid>
        <Grid item xs={12} alignSelf="center">
          <Autocomplete
            disablePortal
            id="city"
            options={calendar.search_city.options}
            sx={{width: '100%'}}
            loading={Boolean(calendar?.search_city?.is_loading)}
            loadingText={<CircularProgress size={30} />}
            value={reminderCity}
            onChange={(_: any, newValue: any) => {
              setReminderCityId(newValue?.id || '');
              setReminderCity(newValue?.label);
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="City"
                type="text"
                onChange={(event: any) => setReminderCity(event.target.value)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} alignSelf="center">
          <TextField
            id="time"
            label="Time"
            type="time"
            defaultValue="08:00"
            value={reminderTime}
            onChange={(event: any) => {
              setReminderTime(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 3000,
            }}
            sx={{width: '100%'}}
          />
        </Grid>
        <Grid item xs={12} alignSelf="center">
          {Boolean(reminderDate) && (
            <TextField
              id="date"
              label="Date"
              type="date"
              value={reminderDate}
              onChange={(event: any) => {
                let newDate = event.target.value;
                if (!Boolean(newDate.trim())) {
                  event.preventDefault();
                  return false;
                }
                setReminderDate(newDate);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date(),
              }}
              sx={{width: '100%'}}
            />
          )}
        </Grid>
        <Grid item xs={12} height="100%" sx={{textAlign: 'end'}}>
          {Boolean(remiderToEditId) ? (
            <Button
              variant="contained"
              onClick={onEditReminder}
              disabled={submitButtonIsDisabled}>
              Update Reminder
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={onAddReminder}
              disabled={submitButtonIsDisabled}>
              Add Reminder
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid container alignSelf="center">
        {Boolean(selectedDateReminders?.length) && (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Reminder</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">City</TableCell>
                  <TableCell align="center">Weather</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDateReminders.map((id, key) => {
                  const reminder = calendar.reminders[id];
                  return (
                    <TableRow
                      key={key}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                      <TableCell align="left">{reminder.text}</TableCell>
                      <TableCell align="center">{reminder.time}</TableCell>
                      <TableCell align="left">
                        {calendar?.cities?.[reminder?.city_id]?.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        {Boolean(reminder?.weather?.condition) && (
                          <>
                            <img
                              alt="weather"
                              src={reminder?.weather?.condition?.icon}
                              width={40}
                            />
                            {reminder?.weather?.condition?.text}
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          edge="end"
                          aria-label="close"
                          size="large"
                          onClick={() => setReminderToEdit({...reminder, id})}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

const CalendarRemindersDialog = () => {
  const dispatch = useDispatch();
  const calendar = useSelector(state => datasetSelector(state, 'calendar'));
  const handleClose = () => dispatch(onCloseCalendarPageDialogAction());
  const date = calendar?.dates?.[calendar?.dialog?.selected_date]?.value;
  const date_formated = useMemo(
    () => (Boolean(date) ? dayjs(date).format('MMMM D, YYYY') : ''),
    [date],
  );
  return (
    <Dialog open={calendar?.dialog?.is_open} onClose={handleClose}>
      <DialogTitle>
        {date_formated}
        <StyledCloseIcon
          edge="end"
          aria-label="close"
          size="large"
          onClick={handleClose}>
          <CloseIcon />
        </StyledCloseIcon>
      </DialogTitle>
      <DialogContent>
        <CalendarReminderDialogContent />
      </DialogContent>
    </Dialog>
  );
};

enum TypeChangeMonth {
  Prev = 'previous_month',
  Next = 'next_month',
}

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
    console.log('changeMonth ===> ', date);
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

function Calendar(props: any) {
  const dispatch = useDispatch();
  const calendar = useSelector(state => datasetSelector(state, 'calendar'));
  const date_in_month = calendar?.weeks_rows?.[3]?.[3];
  const init = () => {
    dispatch(loadCalendarPageAction());
  };
  React.useEffect(() => {
    init();
  }, []);

  const monthYear = useMemo(
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
