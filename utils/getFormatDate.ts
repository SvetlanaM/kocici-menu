import { CURRENT_YEAR } from './constants';
import moment from 'moment';
import 'moment/locale/cs';

const DateFormatObject = (_date?: Date): Record<string, unknown> => {
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
      return this.formatDateToText().replace('před', '');
    },
    lastWeek() {
      return moment().subtract(7, 'days').format('YYYY-MM-DD');
    },
    formatDateTime() {
      return moment(_date).format('DD. MM. YYYY HH:MM');
    },
    getCatBornYear(_number) {
      return Number(CURRENT_YEAR) - _number;
    },
    getCatAge(_number) {
      return Number(CURRENT_YEAR) - _number;
    },
  };
};

export default DateFormatObject;
