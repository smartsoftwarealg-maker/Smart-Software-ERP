export class PayrollUtil {
    static range(from: number, to: number): number[] {
        const result:  number[] = [];
        while (from <= to && result.length < 120) {
            result.push(from);
            from += 1;
            if (from % 100 > 12) {
                from = +(from / 100).toFixed(0) * 100 + 101;
            }
        }
        return result;
    }

    static isValidOrZero(paymonth: number) {
        const month = paymonth % 100;
        const year  = +(paymonth / 100).toFixed(0);
        return paymonth == 0 ||
            (month >= 1 && month <= 12 && year >= 1900 && year < 3000);
    }
}
