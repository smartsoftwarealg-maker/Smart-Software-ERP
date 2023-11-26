export class DateUtil {

  public static DATE_SEPARATOR_1 = '-';
  public static DATE_SEPARATOR_2 = '/';
  public static DATE_TIME_SEPARATOR = ' ';
  private static ZERO_ASCII = 48;
  private static NINE_ASCII = 57;
  private static TIME_SEPARATOR = ':';

  public static dateTimeToStr(date: Date) {
    const d = DateUtil.dateToStr(date);
    if (d != null) {
      try {
        return d
          + DateUtil.DATE_TIME_SEPARATOR
          + DateUtil.pad2(date.getHours())
          + DateUtil.TIME_SEPARATOR
          + DateUtil.pad2(date.getMinutes())
          + DateUtil.TIME_SEPARATOR
          + DateUtil.pad2(date.getSeconds());
      } catch (e) {
      }
    }
    return null;
  }

  public static dateToStr(date: Date) {
    try {
      return DateUtil.pad4(date.getFullYear())
        + DateUtil.DATE_SEPARATOR_1
        + DateUtil.pad2(date.getMonth() + 1)
        + DateUtil.DATE_SEPARATOR_1
        + DateUtil.pad2(date.getDate());
    } catch (e) {
      return null;
    }
  }

  public static dateToInvertedStr(date: Date) {
    return DateUtil.pad2(date.getDate())
      + DateUtil.DATE_SEPARATOR_1
      + DateUtil.pad2(date.getMonth() + 1)
      + DateUtil.DATE_SEPARATOR_1
      + DateUtil.pad4(date.getFullYear());
  }

  /*
   * This code is long and stupid, I know. But it allows for mistakes like 2018-01/02 to be valid
   */
  public static strToDateTime(s: string) {
    if (s == null) {
      return null;
    } else {
      const str = s.trim();
      try {
        // smallest format example 0000/01/01 <-- 8 chars
        DateUtil.assert(str.length >= 8);
        const pos = [0];
        let code: number;
        // yyyy
        let year = 0;
        for (let i = 0; i < 4; i++) {
          code = str.charCodeAt(i);
          DateUtil.assert(DateUtil.isDigit(code));
          code -= DateUtil.ZERO_ASCII;
          year = year * 10 + code;
          pos[0]++;
        }
        let separator = str.charAt(pos[0]);
        DateUtil.assert(separator === DateUtil.DATE_SEPARATOR_1 || separator === DateUtil.DATE_SEPARATOR_2);
        pos[0]++;
        // mm
        const month = DateUtil.parse2Digits(str, pos);
        separator = str.charAt(pos[0]);
        DateUtil.assert(separator === DateUtil.DATE_SEPARATOR_1 || separator === DateUtil.DATE_SEPARATOR_2);
        pos[0]++;
        // dd
        const day = DateUtil.parse2Digits(str, pos);
        if (pos[0] === str.length) {
          return new Date(year, month - 1, day, 0, 0, 0);
        }
        separator = str.charAt(pos[0]);
        DateUtil.assert(separator === DateUtil.DATE_TIME_SEPARATOR);
        pos[0]++;
        // hour
        const hour = DateUtil.parse2Digits(str, pos);
        // minute
        separator = str.charAt(pos[0]);
        DateUtil.assert(separator === DateUtil.TIME_SEPARATOR);
        pos[0]++;
        const minute = DateUtil.parse2Digits(str, pos);
        if (pos[0] === str.length) {
          return new Date(year, month - 1, day, hour, minute, 0);
        }
        // second
        separator = str.charAt(pos[0]);
        DateUtil.assert(separator === DateUtil.TIME_SEPARATOR);
        pos[0]++;
        const second = DateUtil.parse2Digits(str, pos);
        DateUtil.assert(pos[0] === str.length);
        return new Date(year, month - 1, day, hour, minute, second);
      } catch (ex) {
        return null;
      }
    }
  }

  public static strToDate(str: string) {
    const date = DateUtil.strToDateTime(str);
    if (date != null) {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    }
    return date;
  }

  public static ymdToDmy(date: string) {
    if (date) {
      const y = date.substring(0, 4);
      const m = date.substring(5, 7);
      const d = date.substring(8, 10);
      return d + DateUtil.DATE_SEPARATOR_1 + m + DateUtil.DATE_SEPARATOR_1 + y + date.substring(10);
    }
    return null;
  }

  public static compareDate(x: Date, y: Date): number {
    let c = this.compareInt(x.getFullYear(), y.getFullYear());
    if (c === 0) {
      c = this.compareInt(x.getMonth(), y.getMonth());
      if (c === 0) {
        c = this.compareInt(x.getDate(), y.getDate());
      }
    }
    return c;
  }

  private static compareInt(x: number, y: number): number {
    return x < y ? -1 : (x > y ? 1 : 0);
  }

  private static parse2Digits(str: string, posHolder: number[]): number {
    let code = str.charCodeAt(posHolder[0]);
    DateUtil.assert(DateUtil.isDigit(code));
    let N = code - DateUtil.ZERO_ASCII;
    posHolder[0]++;
    code = str.charCodeAt(posHolder[0]);
    if (DateUtil.isDigit(code)) {
      code -= DateUtil.ZERO_ASCII;
      N = N * 10 + code;
      posHolder[0]++;
    }
    return N;
  }

  private static assert(b: boolean): void {
    if (!b) {
      throw new Error();
    }
  }

  private static isDigit(c: number): boolean {
    return DateUtil.ZERO_ASCII <= c && c <= DateUtil.NINE_ASCII;
  }

  private static pad2(n: number): string {
    return (n < 10 ? '0' : '') + n;
  }

  private static pad4(n: number): string {
    return (n < 10 ? '000' : (n < 100 ? '00' : (n < 1000 ? '0' : ''))) + n;
  }

}

