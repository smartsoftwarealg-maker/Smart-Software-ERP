import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FormValidators {


    static integerValidator(control: AbstractControl): ValidationErrors | null {
        return control.value && !Number.isInteger(control.value) ? {'integerInvalid': true} : null;
    }

    static autoCompleteValidator(list: any[]): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value != null && !list.includes(control.value) ? {'validOption': true} : null;
        }
    }

}
