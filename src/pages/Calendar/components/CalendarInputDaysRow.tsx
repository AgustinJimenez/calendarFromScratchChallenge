import {useTranslation} from 'react-i18next';
import {
  StyledCalendarInputDatesRowsContainer,
  StyledCalendarInputDaysRowText,
} from '../styles';

const CalendarInputDaysRow = () => {
  const {t} = useTranslation();
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

export default CalendarInputDaysRow;
