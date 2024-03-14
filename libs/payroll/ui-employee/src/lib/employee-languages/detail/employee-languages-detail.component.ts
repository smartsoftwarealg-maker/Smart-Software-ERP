import { Component, inject } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Language } from '@ss/common/api-lookup';
import { PersonLanguage, EmployeeLanguagesService } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-emp-languages-detail',
    templateUrl: './employee-languages-detail.component.html',
    styleUrls: ['./employee-languages-detail.component.scss']
})
export class EmployeeLanguagesDetailComponent extends BaseChildEntityDetailComponent<PersonLanguage> {
    private formBuilder = inject(FormBuilder);

    languages: Language[] = [];
    languageLevels: Language[] = [];

    parentId = 0;

    constructor(public employeeLanguagesSrv: EmployeeLanguagesService) {
        super(employeeLanguagesSrv, 'PAYROLL_LANGUAGES');
    }


    override setupForm(a: PersonLanguage): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:         [a.id],
            employee:   [a.parentId],
            languageId: [a.languageId, Validators.required],
            readLevel:  [a.readLevel, Validators.required],
            writeLevel: [a.writeLevel, Validators.required],
        });
    }

    public override readForm(): PersonLanguage {
        const formVal = this.form.value as PersonLanguage;
        formVal.parentId = this.parentId;
        return formVal;
    }
}
