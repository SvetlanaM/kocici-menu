import moment from 'moment';

const DateFormatObject = (_date: Date) => {
  moment.locale('sk');
  return {
    _date,
    formatDate() {
      return moment(_date).format('LLLL');
    },
    formatDateToText() {
      return moment(_date).startOf('hour').fromNow()
    },
    formatWithReplace() {
      return this.formatDateToText().replace('pred', '')
    }
  }
}

export default DateFormatObject;