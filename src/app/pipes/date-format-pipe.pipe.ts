import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return "Invalid date";
    }
    try {
      const parseDate = parseISO(value);
      return format(parseDate, 'MMMM dd, yyyy');
    } catch (error) {
      return "Invalid date format";
    }
  }
}
