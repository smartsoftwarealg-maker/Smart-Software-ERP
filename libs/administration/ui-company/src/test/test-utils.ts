import {FormGroup} from "@angular/forms";
import {ComponentFixture} from "@angular/core/testing";
import {CompanyDetailComponent} from "@ss/administration/ui-company";
import {expect} from '@jest/globals'

export class TestUtils {

    static shouldBeInvalidWhenEmpty(fixture: ComponentFixture<CompanyDetailComponent>,
                                    form: FormGroup,
                                    name: string): void {
        const field = form.controls[name];

        expect(field.valid).toBeTruthy();

        field.setValue(null)

        expect(field.valid).toBeFalsy();

        TestUtils.shouldCheckViewChangesWhenInvalid(fixture, form, name);
    }


    static shouldCheckViewChangesWhenInvalid(fixture: ComponentFixture<CompanyDetailComponent>, form: FormGroup, name: string) {
        form.markAllAsTouched()
        fixture.detectChanges()
        TestUtils.shouldDisplayErrorMessage(fixture.nativeElement, name)
        TestUtils.shouldHighlightParentPanel(fixture.nativeElement, name);
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
