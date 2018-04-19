import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDate {
  transform(value, args) {
    return moment.utc(value).format('YYYY-MM-DD');
  }
}
