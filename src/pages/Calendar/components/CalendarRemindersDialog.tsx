import dayjs from 'dayjs';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onCloseCalendarPageDialogAction} from '../../../actions';
import {datasetSelector} from '../../../redux/selectors';
import CloseIcon from '@mui/icons-material/Close';
import {StyledCloseIcon} from '../styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CalendarReminderDialogContent from './CalendarReminderDialogContent';

const CalendarRemindersDialog = () => {
  const dispatch = useDispatch();
  const calendar = useSelector(state => datasetSelector(state, 'calendar'));
  const handleClose = () => dispatch(onCloseCalendarPageDialogAction());
  const date = calendar?.dates?.[calendar?.dialog?.selected_date]?.value;
  const date_formated = React.useMemo(
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
export default CalendarRemindersDialog;
