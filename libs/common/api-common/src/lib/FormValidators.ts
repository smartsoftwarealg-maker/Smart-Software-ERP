import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FormValidators {


    static integerValidator(control: AbstractControl): ValidationErrors | null {
        return control.value && !Number.isInteger(control.value) ? {'integerInvalid': true} : null;
    }

    static autoCompleteValidator(list: []): ValidatorFn {
        return (control: AbstractControl) => {
            // @ts-ignore
            return control.value != null && !list.includes(control.value) ? {'validOption': true} : null;
        }
    }

}
