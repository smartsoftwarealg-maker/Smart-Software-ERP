import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@muaazh/datepicker/core';
import { isString, isDate, pad2, pad4 } from './utils';


/** 
      @param month is not 1-based
*/
function getNumDaysInMonth(year: number, month: number): number {
    // The month is zero based, but the day is not
    // day ZERO = takes us back to the last month
    return new Date(year, month, 0).getDate();
}

/** 
      @param m: month is not 1-based
*/
function isValidDate(y: number, m: number, d: number): boolean {
    return 1 <= m && m <= 12
        &&
        1 <= d && d <= getNumDaysInMonth(y, m);
}

function isTimeValid(h: number, m: number, s: number) {
    return 0 <= s && s <= 59
        && 0 <= m && m <= 59
        && 0 <= h && h <= 23;
}

function stringToDate(s: string): Date {
    console.log('stringToDate');
    if (s.match(/^\d+[-\/\.]\d+[-\/\.]\d+$/g)) {
        const args = s.match(/\d+/g);
        if (args[0].length == 4) {
            const ymd = args.map(k => +k);
            if (isValidDate(ymd[0], ymd[1], ymd[2])) {
                return new Date(ymd[0], ymd[1] - 1, ymd[2]);
            }
        } else if (args[2].length == 4) {
            const dmy = args.map(k => +k);
            if (isValidDate(dmy[2], dmy[1], dmy[0])) {
                return new Date(dmy[2], dmy[1] - 1, dmy[0]);
            }
        }
    } else if (s.match(/^\d+[-\/\.]\d+[-\/\.]\d+ \d+\:\d+$/g) || s.match(/^\d+[-\/\.]\d+[-\/\.]\d+ \d+\:\d+\:\d+$/g)) {
        const args = s.match(/\d+/g);
        if (args.length == 5) {
            args.push('0');
        }
        if (isTimeValid(+args[3], +args[4], +args[5])) {
            if (args[0].length == 4) {
                const ymd = args.map(k => +k);
                if (isValidDate(ymd[0], ymd[1], ymd[2])) {
                    return new Date(ymd[0], ymd[1] - 1, ymd[2], ymd[3], ymd[4], ymd[5]);
                }
            } else if (args[2].length == 4) {
                const dmy = args.map(k => +k);
                if (isValidDate(dmy[2], dmy[1], dmy[0])) {
                    return new Date(dmy[2], dmy[1] - 1, dmy[0], dmy[3], dmy[4], dmy[5]);
                }
            }
        }
    }
    return null; // invalid date
}

function toDate(date: Date | string): Date {
    if (isString(date)) {
        return stringToDate(date as string);
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
    getFirstDayOfWeek(): number {
        return 5; // الجمعة
    }

    /**
     * Parses a date from a user-provided value.
     * @param value The value to parse.
     * @param parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @returns The parsed date.
     */
    parse(value: any): Date | null {
        if (value == null) return null;
        return toDate(value);
    }


    /**
     * Formats a date as a string according to the given format.
     * @param date The value to format.
     * @param displayFormat The format to use to display the date as a string.
     * @returns The formatted date string.
     */
    format(date: Date, displayFormat: any): string {
        if (date == null) {
            return null;
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
                console.log('new format', displayFormat);
                return '???';
        }
    }

}
