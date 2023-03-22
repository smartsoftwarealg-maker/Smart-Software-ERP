import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@muaazh/datepicker/core';
import { isString, isDate, pad2, pad4, strToDateTime } from './utils';



function toDate(date: Date | string): Date {
    if (isString(date)) {
        return strToDateTime(date as string);
    }
    if (isDate(date)) {
        return date as Date;
    }
    return null; // invalid date
}

@Injectable()
export class SimpleDateAdapter extends NativeDateAdapter {

    /**
     * Gets the first day of the week.
     * @returns The first day of the week (0-indexed, 0 = Sunday).
     */
    override getFirstDayOfWeek(): number {
        return 5; // الجمعة
    }

    /**
     * Parses a date from a user-provided value.
     * @param value The value to parse.
     * @param parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @returns The parsed date.
     */
    override parse(value: any): Date | null {
        if (value == null) return null;
        return toDate(value);
    }


    /**
     * Formats a date as a string according to the given format.
     * @param date The value to format.
     * @param displayFormat The format to use to display the date as a string.
     * @returns The formatted date string.
     */
    override format(date: Date, displayFormat: any): string {
        if (date == null) {
            return null;
        }
        if (displayFormat.hour && displayFormat.minute) {
            return pad2(date.getHours()) + ':' + pad2(date.getMinutes());
        }
        if (displayFormat.month && !displayFormat.year) {
            if (displayFormat.day) {
                // todo: use langSrv
                return pad2(date.getDate()) + ' ' + this.getMonthNames('short')[date.getMonth()];
            } else {
                return super.format(date, displayFormat);
            }
        }
        if (displayFormat.year && displayFormat.month) {
            if (displayFormat.day) {
                if (displayFormat.hour) {
                    return pad2(date.getDate()) + '/' + pad2(date.getMonth() + 1) + '/' + pad4(date.getFullYear()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes());
                } else {
                    return pad2(date.getDate()) + '/' + pad2(date.getMonth() + 1) + '/' + pad4(date.getFullYear());
                }
            } else {
                if (displayFormat.month == 'short') {
                    // todo: use langSrv
                    return super.format(date, displayFormat);
                }
                return pad4(date.getFullYear()) + '/' + pad2(date.getMonth());
            }
        }
        const fmt = displayFormat as string;
        switch (fmt) {
            case 'yyyy/MM/dd':
                return pad4(date.getFullYear()) + '/' + pad2(date.getMonth() + 1) + '/' + pad2(date.getDate());
            case 'yyyy/MM/dd HH:mm':
                return pad4(date.getFullYear()) + '/' + pad2(date.getMonth() + 1) + '/' + pad2(date.getDate()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes());
            case 'LL':
            case 'yyyy/MM/dd HH:mm:ss':
                return pad4(date.getFullYear()) + '/' + pad2(date.getMonth() + 1) + '/' + pad2(date.getDate()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds());
            default:
                console.log('new format', fmt);
                return '???';
        }
    }

}
