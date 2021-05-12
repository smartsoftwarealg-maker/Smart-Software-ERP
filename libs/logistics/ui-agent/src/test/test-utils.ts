import {FormGroup} from "@angular/forms";
import {ComponentFixture} from "@angular/core/testing";
import {MiniAgentDetailComponent} from "@ss/logistics/ui-agent";
import {expect} from '@jest/globals'

export class TestUtils {

    static shouldBeInvalidWhenEmpty(fixture: ComponentFixture<MiniAgentDetailComponent>,
                                    form: FormGroup,
                                    name: string): void {
        const field = form.controls[name];

        expect(field.valid).toBeTruthy();

        field.setValue(null)

        expect(field.valid).toBeFalsy();

        TestUtils.shouldCheckViewChangesWhenInvalid(fixture, form, name)
    }

    static shouldBeInvalidWhenPassMaxLength(fixture: ComponentFixture<MiniAgentDetailComponent>,
                                            form: FormGroup,
                                            name: string,
                                            maxLength: number): void {
        const field = form.controls[name];


        field.setValue(Array(maxLength + 1).fill("e").reduce((t, c) => t + c, ""))
        expect(field.valid).toBeFalsy();
        TestUtils.shouldCheckViewChangesWhenInvalid(fixture, form, name)
    }


    static shouldCheckInvalidValues(fixture, form, name, invalidValues: any, validValues: any) {
        const field = form.controls[name];

        if (invalidValues instanceof Array) {

            invalidValues.forEach(x => {
                field.setValue(x);
                expect(field.valid).toBeFalsy();
                TestUtils.shouldCheckViewChangesWhenInvalid(fixture, form, name)
            })

        } else {
            field.setValue(invalidValues);
            expect(field.valid).toBeFalsy();
            TestUtils.shouldCheckViewChangesWhenInvalid(fixture, form, name)
        }

        if (validValues instanceof Array) {
            validValues.forEach(x => {
                field.setValue(x)
                expect(field.valid).toBeTruthy();
            })
        } else {
            field.setValue(validValues)
            expect(field.valid).toBeTruthy();
        }
    }


    static shouldCheckViewChangesWhenInvalid(fixture: ComponentFixture<MiniAgentDetailComponent>, form: FormGroup, name: string) {
        form.markAllAsTouched()
        fixture.detectChanges()
        TestUtils.shouldDisplayErrorMessage(fixture.nativeElement, name)
        TestUtils.shouldHighlightParentPanel(fixture.nativeElement, name)
    }

    static shouldDisplayErrorMessage(template, name) {
        const formField = template.querySelector(`#${name}`);
        expect(formField.querySelector("mat-error")).not.toBeNull()
    }

    static shouldHighlightParentPanel(template, name) {
        const formField = template.querySelector(`#${name}`);
        const hasHeaderWarnClass = formField.closest("mat-expansion-panel")
            .classList.contains("b-warn-expansion-panel");
        expect(hasHeaderWarnClass).toBeTruthy();
    }


}
