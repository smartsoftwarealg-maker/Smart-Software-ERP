import { Component, inject } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Language } from '@ss/common/api-lookup';
import { PersonLanguage, EmployeeLanguagesService } from '@ss/payroll/api-employee';
import { NgIf, NgFor } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-emp-languages-detail',
    templateUrl: './employee-languages-detail.component.html',
    styleUrls: ['./employee-languages-detail.component.scss'],
    standalone: true,
    imports: [NgIf, MaterialModule, MatMiniFabButton, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatSelect, NgFor, MatOption]
})
export class EmployeeLanguagesDetailComponent extends BaseChildEntityDetailComponent<PersonLanguage> {
    private formBuilder = inject(FormBuilder);
    private activePersonnelSrv = inject(ActivePersonnelService);

    languages: Language[] = [];
    languageLevels: Language[] = [];

    parentId = 0;

    constructor(public employeeLanguagesSrv: EmployeeLanguagesService) {
        super(employeeLanguagesSrv, 'PAYROLL_LANGUAGES');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
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
