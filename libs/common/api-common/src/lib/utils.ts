
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
            assertTrue(separator === '/' || separator === '-');
            pos[0]++;
            // mm
            const month = parse2Digits(str, pos);
            separator = str.charAt(pos[0]);
            assertTrue(separator === '/' || separator === '-');
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
            assertTrue(separator === ' ');
            pos[0]++;
            // hour
            const hour = parse2Digits(str, pos);
            // minute
            separator = str.charAt(pos[0]);
            assertTrue(separator === ':');
            pos[0]++;
            const minute = parse2Digits(str, pos);
            if (pos[0] === str.length) {
                return new Date(year, month - 1, day, hour, minute, 0);
            }
            // second
            separator = str.charAt(pos[0]);
            assertTrue(separator === ':');
            pos[0]++;
            const second = parse2Digits(str, pos);
            assertTrue(pos[0] === str.length);
            return new Date(year, month - 1, day, hour, minute, second);
        } catch (ex) {
            return null;
        }
    }
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

export function dateToYmdStr(date: Date) {
    return pad4(date.getFullYear())
        + '-'
        + pad2(date.getMonth() + 1)
        + '-'
        + pad2(date.getDate());
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

export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

export function isNumber(value) {
    return typeof value === 'number' || value instanceof Number;
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

function pad2(n: number): string {
    return (n < 10 ? '0' : '') + n;
}

function pad4(n: number): string {
    return (n < 10 ? '000' : (n < 100 ? '00' : (n < 1000 ? '0' : ''))) + n;
}

export function fillObject(from, to) {
    for (const key in from) {
        if (from.hasOwnProperty(key)) {
            if (Object.prototype.toString.call(from[key]) === '[object Object]') {
                if (!to.hasOwnProperty(key)) {
                    to[key] = {};
                }
                this.fillObject(from[key], to[key]);
            }
            else if (!to.hasOwnProperty(key)) {
                to[key] = from[key];
            }
        }
    }
}
