
// in this file define functions and constants only

export function ymdToDmy(date: string) {
    if (date) {
        const y = date.substring(0, 4);
        const m = date.substring(5, 7);
        const d = date.substring(8, 10);
        const sp = date.substring(4, 5);
        return d + sp + m + sp + y + date.substring(10);
    }
    return null;
}

export function dmyToYmd(date: string) {
    if (date) {
        const y = date.substring(6, 10);
        const m = date.substring(3, 5);
        const d = date.substring(0, 2);
        const sp = date.substring(2, 3);
        return y + sp + m + sp + d + date.substring(10);
    }
    return null;
}

function assertTrue(b: boolean): void {
    if (!b) {
        throw new Error();
    }
}


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

/*
 * This code is long and stupid, I know. But it allows for mistakes like 2018-01/02 to be valid
 */
export function strToDateTime(s: string) {
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


export function dateStrToDmy(s: string) {
    // assume it is a correct date of the format dmy or ymd
    if (s == null) {
        return null;
    }
    try {
        parse4Digits(s, [0]);
        return ymdToDmy(s);
    } catch (e) {
        return s;
    }
}

export function dateStrToYmd(s: string) {
    // assume it is a correct date of the format dmy or ymd
    if (s == null) {
        return null;
    }
    try {
        parse4Digits(s, [0]);
        return s;
    } catch (e) {
        return dmyToYmd(s);
    }
}

export function dateToDmyStr(date: Date) {
    return pad2(date.getDate())
        + '-'
        + pad2(date.getMonth() + 1)
        + '-'
        + pad4(date.getFullYear());
}

export function dateToYmdStr(date: Date | string): string {
    if (typeof date === 'string' || date instanceof String) {
        return <string>date;
    } else {
        return pad4(date.getFullYear())
            + '-'
            + pad2(date.getMonth() + 1)
            + '-'
            + pad2(date.getDate());
    }
}

export function dateTimeToYmdStr(date: Date | string): string {
    if (typeof date === 'string' || date instanceof String) {
        return <string>date;
    } else {
        return pad4(date.getFullYear())
            + '/'
            + pad2(date.getMonth() + 1)
            + '/'
            + pad2(date.getDate())
            + ' '
            + pad2(date.getHours())
            + ':'
            + pad2(date.getMinutes())
            + ':'
            + pad2(date.getSeconds());
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

// removes time from a date string ex: yyyy-MM-dd HH:mm:ss becomes yyyy-MM-dd
export function removeTimeForDateStr(s: string) {
    if (s == null) {
        return null;
    }
    const r = s.trim();
    const i = r.indexOf(' ');
    return i > 0 ? r.substring(0, i) : r;
}

export function isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
}

export function isNumber(value: any): boolean {
    return typeof value === 'number' || value instanceof Number;
}

export function isDate(value: any): boolean {
    return value instanceof Date;
}

export function isObject(value) {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}

function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
}

const ZERO_ASCII = 48;
const NINE_ASCII = 57;

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

function isDigit(c: number): boolean {
    return ZERO_ASCII <= c && c <= NINE_ASCII;
}

export function pad2(n: number): string {
    return (n < 10 ? '0' : '') + n;
}

export function pad4(n: number): string {
    return (n < 10 ? '000' : (n < 100 ? '00' : (n < 1000 ? '0' : ''))) + n;
}

export function fillObject(from: any, to: any): any {
    for (const key in from) {
        if (from.hasOwnProperty(key)) {
            if (from[key] instanceof Object) {
                if (!to.hasOwnProperty(key)) {
                    to[key] = {};
                }
                fillObject(from[key], to[key]);
            }
            else if (!to.hasOwnProperty(key)) {
                to[key] = from[key];
            }
        }
    }
}

export function strTakeUntil(txt: string, token: string) {
    if (txt == null) return null;
    const i = txt.indexOf(token);
    return i > -1 ? txt.substring(0, i) : txt;
}

export function strDropEndUntil(txt: string, token: string) {
    if (txt == null) return null;
    const i = txt.lastIndexOf(token);
    return i > -1 ? txt.substring(0, i) : txt;
}

export function strDropUntil(txt: string, token: string) {
    if (txt == null) return null;
    const i = txt.indexOf(token);
    return i > -1 ? txt.substring(i) : '';
}

export const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];


