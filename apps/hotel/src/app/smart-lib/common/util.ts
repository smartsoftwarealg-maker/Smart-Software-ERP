

/**
 * Returns a deep copy of the object
 */
export function deepCopy(oldObj: any) {
    if (oldObj && typeof oldObj === 'object') {
        if (oldObj instanceof Date) {
            return new Date(oldObj.getTime());
        }
        let obj;
        if (typeof Array.isArray === 'undefined') {
            obj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
        } else {
            obj = Array.isArray(oldObj) ? [] : {};
        }
        // tslint:disable-next-line:forin
        for (const i in oldObj) {
            obj[i] = deepCopy(oldObj[i]);
        }
        return obj;
    }
    return oldObj;
}
