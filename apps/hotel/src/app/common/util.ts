import { isString } from '@ss/common/api-common';

export enum LoadingState {
    LOADING = 'L',
    ERROR = 'E',
    COMPLETE = 'C',
}

const DATE_SEPARATOR_1 = '/';
const DATE_SEPARATOR_2 = '-';
const DATE_TIME_SEPARATOR = ' ';
const ZERO_ASCII = 48;
const NINE_ASCII = 57;
const TIME_SEPARATOR = ':';

export function dateTimeToStr(dDate: Date) {
    const date = toDate(dDate);
    const d = dateToStr(date);
    if (d != null) {
        try {
            return d
                + DATE_TIME_SEPARATOR
                + pad2(date.getHours())
                + TIME_SEPARATOR
                + pad2(date.getMinutes())
                + TIME_SEPARATOR
                + pad2(date.getSeconds());
        } catch (e) {
        }
    }
    return null;
}

export function toDate(str: Date|string): Date {
    return typeof str === 'string'? new Date(str.replace('/', DATE_SEPARATOR_2)) : str;
}

export function dateToStr(date: Date) {
    const dDate = toDate(date);
    try {
        return pad4(date.getFullYear())
            + DATE_SEPARATOR_2
            + pad2(dDate.getMonth() + 1)
            + DATE_SEPARATOR_2
            + pad2(dDate.getDate());
    } catch (e) {
        return null;
    }
}

export function timeToStr(date: Date) {
    try {
        return pad2(date.getHours())
            + TIME_SEPARATOR
            + pad2(date.getMinutes())
            + TIME_SEPARATOR
            + pad2(date.getSeconds());
    } catch (e) {
        console.log('_____________________________error', e);
        return null;
    }
}

export function dateToDmyStr(date: Date) {
    return pad2(date.getDate())
        + DATE_SEPARATOR_2
        + pad2(date.getMonth() + 1)
        + DATE_SEPARATOR_2
        + pad4(date.getFullYear());
}

/*
 * This code is long and stupid, I know. But it allows for mistakes like 2018-01/02 to be valid
 */
export function strToDateTime(s: string) {
    if (s == null || !isString(s)) {
        return null;
    } else {
        const str = s.trim();
        try {
            // smallest format example 0001/1/1 <-- 8 chars
            assertTrue(str.length >= 8);
            const pos = [0];
            // yyyy
            let ymd = true;
            let year = 0;
            let day = 0;
            try {
                year = parse4Digits(str, [0]);
                pos[0] = 4;
            } catch (e) {
                day = parse2Digits(str, pos);
                ymd = false;
            }
            let separator = str.charAt(pos[0]);
            assertTrue(separator === DATE_SEPARATOR_1 || separator === DATE_SEPARATOR_2);
            pos[0]++;
            // mm
            const month = parse2Digits(str, pos);
            separator = str.charAt(pos[0]);
            assertTrue(separator === DATE_SEPARATOR_1 || separator === DATE_SEPARATOR_2);
            pos[0]++;
            // dd
            if (ymd) {
                day = parse2Digits(str, pos);
            } else {
                year = parse4Digits(str, pos);
            }
            if (pos[0] === str.length) {
                return new Date(year, month - 1, day, 0, 0, 0);
            }
            separator = str.charAt(pos[0]);
            assertTrue(separator === DATE_TIME_SEPARATOR);
            pos[0]++;
            // hour
            const hour = parse2Digits(str, pos);
            // minute
            separator = str.charAt(pos[0]);
            assertTrue(separator === TIME_SEPARATOR);
            pos[0]++;
            const minute = parse2Digits(str, pos);
            if (pos[0] === str.length) {
                return new Date(year, month - 1, day, hour, minute, 0);
            }
            // second
            separator = str.charAt(pos[0]);
            assertTrue(separator === TIME_SEPARATOR);
            pos[0]++;
            const second = parse2Digits(str, pos);
            assertTrue(pos[0] === str.length);
            return new Date(year, month - 1, day, hour, minute, second);
        } catch (ex) {
            return null;
        }
    }
}

export function strToDate(str: string) {
    const date = strToDateTime(str);
    if (date != null) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
    }
    return date;
}

export function ymdToDmy(date: string) {
    if (date) {
        const y = date.substring(0, 4);
        const m = date.substring(5, 7);
        const d = date.substring(8, 10);
        return d + DATE_SEPARATOR_2 + m + DATE_SEPARATOR_2 + y + date.substring(10);
    }
    return null;
}

export function compareDate(x: Date, y: Date): number {
    let c = compareInt(x.getFullYear(), y.getFullYear());
    if (c === 0) {
        c = compareInt(x.getMonth(), y.getMonth());
        if (c === 0) {
            c = compareInt(x.getDate(), y.getDate());
        }
    }
    return c;
}

function compareInt(x: number, y: number): number {
    return x < y ? -1 : (x > y ? 1 : 0);
}

function parse2Digits(str: string, posHolder: number[]): number {
    let code = str.charCodeAt(posHolder[0]);
    assertTrue(isDigit(code));
    let N = code - ZERO_ASCII;
    posHolder[0]++;
    code = str.charCodeAt(posHolder[0]);
    if (isDigit(code)) {
        code -= ZERO_ASCII;
        N = N * 10 + code;
        posHolder[0]++;
    }
    return N;
}

function parse4Digits(str: string, posHolder: number[]): number {
    let N = 0;
    for (let i = 0; i < 4; i++) {
        let code = str.charCodeAt(posHolder[0]);
        assertTrue(isDigit(code));
        code -= ZERO_ASCII;
        N = N * 10 + code;
        posHolder[0]++;
    }
    return N;
}

function assertTrue(b: boolean): void {
    if (!b) {
        throw new Error();
    }
}

function isDigit(c: number): boolean {
    return ZERO_ASCII <= c && c <= NINE_ASCII;
}

function pad2(n: number): string {
    return (n < 10 ? '0' : '') + n;
}

function pad4(n: number): string {
    return (n < 10 ? '000' : (n < 100 ? '00' : (n < 1000 ? '0' : ''))) + n;
}
