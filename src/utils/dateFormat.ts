import dayjs from 'dayjs'

export const dateForUsersFormat = 'DD/MM/YYYY HH:mm' //'dd/MM/yyyy hh:mm'
export const dateForSystemFormat = 'YYYY-MM-DD HH:mm' //'yyyy-MM-dd hh:mm'
export const hoursMinutesFormat = 'HH:mm'
export const hoursMinutesSecondsFormat = 'HH:mm:ss'

export const convertToDate = (
  dateString: string,
  format: string = dateForSystemFormat
) => {
  //console.log('convertToDate ===> ', { dateString, format })
  return dayjs(dateString, format).toDate()
}
export const formatDate = (
  date: Date,
  finalFormat: string = dateForUsersFormat,
  originFormat: string = dateForSystemFormat
) => dayjs(date, originFormat).format(finalFormat)
