import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isString, strToDateTime } from '@ss/common/api-common';

export function maxDate(max: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;

        if (!value || !max) {
            return null;
        }
        if (isString(value)) {
            value = strToDateTime(value);
            if (!value) {
                return;
            }
        }

        return value.getTime() > max.getTime() ? { dateRange: true } : null;
    }
}

export function minDate(min: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;

        if (!value || !min) {
            return null;
        }
        if (isString(value)) {
            value = strToDateTime(value);
            if (!value) {
                return;
            }
        }

        return value.getTime() < min.getTime() ? { dateRange: true } : null;
    }
}
