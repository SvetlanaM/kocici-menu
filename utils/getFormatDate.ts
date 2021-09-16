import moment from 'moment';
import 'moment/locale/sk';

const DateFormatObject = (_date?: Date) => {
  moment.locale('cs');
  return {
    _date,
    formatDate() {
      return moment(_date).format('LLLL');
    },
    formatDateToText() {
      return moment(_date).startOf('minute').fromNow();
    },
    formatWithReplace() {
      return this.formatDateToText().replace('pred', '');
    },
    lastWeek() {
      return moment().subtract(7, 'days').format('YYYY-MM-DD');
    },
    formatDateTime() {
      return moment(_date).format('DD. MM. YYYY HH:MM');
    },
  };
};

export default DateFormatObject;
