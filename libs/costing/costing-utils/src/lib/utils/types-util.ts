export class TypesUtil {

    static isNumber(value: string|number) {
        if (typeof value === 'string') {
            const n = +value;
            if (n != null) {
                return true;
            }
        }
        return typeof value === 'number';
    }

    static isString(value: any) {
        return typeof value === 'string' || value instanceof String;
    }

}
