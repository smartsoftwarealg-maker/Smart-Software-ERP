export class TypesUtil {

  static isNumber(value) {
    if (typeof value === 'string') {
      const n = +value;
      if (n != null) {
        return true;
      }
    }
    return typeof value === 'number' || value instanceof Number;
  }

  static isString(value) {
    return typeof value === 'string' || value instanceof String;
  }

}
