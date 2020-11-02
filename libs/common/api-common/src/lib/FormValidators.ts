import {AbstractControl, ValidationErrors} from "@angular/forms";

export class FormValidators {


    static integerValidator(control: AbstractControl): ValidationErrors | null {
        if (control.value && !Number.isInteger(control.value)) {
            return {'integerInvalid': true};
        }
        return null;
    }

}
