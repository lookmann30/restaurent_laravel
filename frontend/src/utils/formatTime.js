import { format, getTime, formatDistanceToNow } from 'date-fns';
import dayjs from 'dayjs'
// ----------------------------------------------------------------------

export function fDate(date) {
  if(!date) return ""
   return dayjs(date).format('MMMM D, YYYY');
}

export function fDateShort(date) {
  if(!date) return ""
   return dayjs(date).format('MMM D, YY');
}

export function fDateLong(date) {
  if(!date) return ""
  return dayjs(date).format('dddd, MMMM D, YYYY');
}

export function fDateTime(date) {
  if(!date) return ""
  return dayjs(date).format('MMM D, YYYY hh:mm A');
}

export function fDateTimeLong(date) {
  if(!date) return ""
  return dayjs(date).format('dddd, MMMM D, YYYY hh:mm A');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function customDate(date, textFormat, locale) {
  if(locale === "th")
  {
      const getDate = new Date(date).toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      
    })
      return getDate
  }
  else {
    return dayjs(date).format(textFormat);
  }
}

export function getFirstDateOfWeek() {
  return dayjs().day(0).format('YYYY-MM-DD');
}

export function getEndDateOfWeek() {
  return dayjs().day(6).format('YYYY-MM-DD');
}

export function getFirstDateOfMonth() {
  return dayjs().date(1).format('YYYY-MM-DD');
}

export function getFirstDateOfMonthBefore(date,monthCount) {
  return dayjs(date).date(1).subtract(monthCount, 'month').format('YYYY-MM-DD')
}

export function getFirstDateOfMonthNext(date,monthCount) {
  return dayjs(date).date(1).add(monthCount, 'month').format('YYYY-MM-DD')
}

export function getEndDateOfMonth() {
  const dayOfMonth = dayjs().daysInMonth()
  // console.log(dayOfMonth)
  return dayjs().date(dayOfMonth).format('YYYY-MM-DD');
}

export function getEndDateOfMonthBefore(date,monthCount) {
  const lastMonth = dayjs(date).subtract(monthCount, 'month');
  const dayOfMonth = dayjs(lastMonth).daysInMonth()
  return dayjs(lastMonth).date(dayOfMonth).format('YYYY-MM-DD')
}

export function getEndDateOfMonthNext(date,monthCount) {
  // return dayjs(date).date(31).add(monthCount, 'month').format('YYYY-MM-DD')
  const nextMonth = dayjs(date).add(monthCount, 'month');
  const dayOfMonth = dayjs(nextMonth).daysInMonth()
  return dayjs(nextMonth).date(dayOfMonth).format('YYYY-MM-DD')
}

export function getDateNext(date,dayCount,formatText) {
  return dayjs(date).add(dayCount, 'day').format(formatText)
}
