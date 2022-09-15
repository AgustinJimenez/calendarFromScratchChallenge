import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  onSearchCityAction,
  onAcceptCalendarPageDialogAction,
} from '../../../actions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import {datasetSelector} from '../../../redux/selectors';
import {AppCalendarType, AppReminderType} from '../../../types';
import {StyledCalendarReminderDialogContentContainer} from '../styles';

let timer: NodeJS.Timeout;

const CalendarReminderDialogContent = () => {
  const dispatch = useDispatch();
  const reminderTextInputRef = React.useRef();
  const [remiderToEditId, setReminderToEditId] = React.useState<
    string | undefined
  >();
  const [reminderText, setReminderText] = React.useState('');
  const [reminderCity, setReminderCity] = React.useState('');
  const [reminderCityId, setReminderCityId] = React.useState(0);
  const [reminderTime, setReminderTime] = React.useState('');

  React.useEffect(() => {
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

  const [reminderDate, setReminderDate] = React.useState('');
  const calendar: AppCalendarType = useSelector(state =>
    datasetSelector(state, 'calendar'),
  );
  const selectedDateReminders: string[] = Object.keys(
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
    setReminderCityId(0);
  };
  const timeIsValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
    reminderTime,
  );
  const reminderTextIsValid = Boolean(reminderText?.trim()?.length);
  const reminderCityIsValid = Boolean(reminderCityId);
  const submitButtonIsDisabled =
    !reminderCityIsValid || !reminderTextIsValid || !timeIsValid;
  const setReminderToEdit = (reminder: AppReminderType) => {
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
      <StyledCalendarReminderDialogContentContainer
        container
        item
        direction="row"
        alignSelf="center"
        spacing={4}>
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
            value={{id: reminderCityId, label: reminderCity}}
            isOptionEqualToValue={option => reminderCityId === option.id}
            onChange={(_: any, newValue: any) => {
              setReminderCityId(newValue?.id);
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
      </StyledCalendarReminderDialogContentContainer>
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
export default CalendarReminderDialogContent;
