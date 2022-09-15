import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {Grid} from '@mui/material';

export const StyledCalendarInputDateContainer = styled(Box)(({theme}) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  };
});
//Button
export const StyledCalendarDateContainer = styled(Button)(props => {
  const isToday = (props as any)?.istoday === 'true';
  const isweekend = (props as any).isweekend === 'true';
  return {
    display: 'flex',
    flexDirection: 'row',
    color: isweekend
      ? props.theme.palette.primary.main
      : props.theme.palette.common.black,
    borderRadius: 0,
    borderColor: isToday
      ? props.theme.palette.primary.main
      : props.theme.palette.grey[400],
    borderWidth: props.theme.spacing(isToday ? 0.15 : 0.1),
    paddingLeft: props.theme.spacing(0.7),
    borderStyle: 'solid',
    flexGrow: 1,
    margin: 0,
    height: props.theme.spacing(10),
    justifyContent: 'initial',
    alignItems: 'initial',
    backgroundColor: isweekend ? props.theme.palette.grey[200] : undefined,
  };
});

export const StyledCalendarWeekRowContainer = styled(Box)(() => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
  };
});

export const StyledCalendarInputDatesRowsContainer = styled(Box)(({theme}) => {
  return {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };
});

export const StyledCalendarInputDaysRowText = styled(Typography)(({theme}) => {
  return {
    color: theme.palette.common.white,
    textAlign: 'center',
    flexGrow: 1,
    margin: 0,
    fontSize: 14,
  };
});

export const StyledCalendarInputDaysRowsContainer = styled(Box)(({theme}) => {
  return {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };
});

export const StyledCalendarInputReminderTextField = styled(TextField)(() => {
  return {
    paddingRight: 10,
    paddingLeft: 10,
  };
});

export const StyledCloseIcon = styled(IconButton)(() => {
  return {
    position: 'absolute',
    right: 10,
    top: 0,
  };
});

export const StyledDayRemindNumContainers = styled(Badge)(() => {
  return {
    position: 'absolute',
    right: 15,
    bottom: 15,
  };
});

export const StyledCalendarReminderDialogContentContainer = styled(Grid)(() => {
  return {
    paddingTop: 10,
  };
});
