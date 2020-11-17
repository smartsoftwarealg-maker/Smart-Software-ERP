import {FormGroup} from "@angular/forms";
import {ComponentFixture} from "@angular/core/testing";
import {BankDetailComponent} from "@ss/administration/ui-bank";
import {expect} from '@jest/globals'

export class TestUtils {

    static shouldBeInvalidWhenEmpty(fixture: ComponentFixture<BankDetailComponent>,
                                    form: FormGroup,
                                    name: string): void {
        let field = form.controls[name];

        expect(field.valid).toBeTruthy();

        field.setValue(null)

        expect(field.valid).toBeFalsy();

        TestUtils.shouldCheckViewChangesWhenInvalid(fixture, form, name)
    }

    static shouldBeInvalidWhenPassMaxLength(fixture: ComponentFixture<BankDetailComponent>,
                                            form: FormGroup,
                                            name: string,
                                            maxLength: number): void {
        let field = form.controls[name];


        field.setValue(Array(maxLength + 1).fill("e").reduce((t, c) => t + c, ""))
        expect(field.valid).toBeFalsy();
        TestUtils.shouldCheckViewChangesWhenInvalid(fixture, form, name)
    }

    static shouldCheckViewChangesWhenInvalid(fixture: ComponentFixture<BankDetailComponent>, form: FormGroup, name: string) {
        form.markAllAsTouched()
        fixture.detectChanges()
        TestUtils.shouldDisplayErrorMessage(fixture.nativeElement, name)
    }

    static shouldDisplayErrorMessage(template, name) {
        let formField = template.querySelector(`#${name}`);
        expect(formField.querySelector("mat-error")).not.toBeNull()
    }

}
