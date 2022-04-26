import {AbstractControl, ValidationErrors, Validator} from '@angular/forms';

export class TransaclineValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return { customerRequired: true };
    }
}
