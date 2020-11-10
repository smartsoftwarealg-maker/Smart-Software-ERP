import {FormGroup} from "@angular/forms";
import {ComponentFixture} from "@angular/core/testing";
import {AgentDetailComponent} from "@ss/logistics/ui-agent";

export class TestUtilsSpec {

    static shouldBeInvalidWhenEmpty(fixture: ComponentFixture<AgentDetailComponent>,
                                    form: FormGroup,
                                    name: string): void {
        let field = form.controls[name];

        expect(field.valid).toBeTruthy();

        field.setValue(null)

        expect(field.valid).toBeFalsy();

        TestUtilsSpec.shouldCheckViewChangesWhenInvalid(fixture, form, name)
    }

    static shouldBeInvalidWhenPassMaxLength(fixture: ComponentFixture<AgentDetailComponent>,
                                            form: FormGroup,
                                            name: string,
                                            maxLength: number): void {
        let field = form.controls[name];


        field.setValue(Array(maxLength + 1).fill("e").reduce((t, c) => t + c, ""))
        expect(field.valid).toBeFalsy();
        TestUtilsSpec.shouldCheckViewChangesWhenInvalid(fixture, form, name)
    }


    static shouldCheckInvalidValues(fixture, form, name, invalidValues: any, validValues: any) {
        let field = form.controls[name];

        if (invalidValues instanceof Array) {

            invalidValues.forEach(x => {
                field.setValue(x);
                expect(field.valid).toBeFalsy();
                TestUtilsSpec.shouldCheckViewChangesWhenInvalid(fixture, form, name)
            })

        } else {
            field.setValue(invalidValues);
            expect(field.valid).toBeFalsy();
            TestUtilsSpec.shouldCheckViewChangesWhenInvalid(fixture, form, name)
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


    static shouldCheckViewChangesWhenInvalid(fixture: ComponentFixture<AgentDetailComponent>, form: FormGroup, name: string) {
        form.markAllAsTouched()
        fixture.detectChanges()
        TestUtilsSpec.shouldDisplayErrorMessage(fixture.nativeElement, name)
        TestUtilsSpec.shouldHighlightParentPanel(fixture.nativeElement, name)
    }

    static shouldDisplayErrorMessage(template, name) {
        let formField = template.querySelector(`#${name}`);
        expect(formField.querySelector("mat-error")).not.toBeNull()
    }

    static shouldHighlightParentPanel(template, name) {
        let formField = template.querySelector(`#${name}`);
        let hasHeaderWarnClass = formField.closest("mat-expansion-panel")
            .classList.contains("b-warn-expansion-panel");
        expect(hasHeaderWarnClass).toBeTruthy();
    }


}
