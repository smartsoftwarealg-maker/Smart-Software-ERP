import { Component, inject } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { JournalUser, JournalUserService } from '@ss/treasury/api-journal';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { UiAutoCompleteComponent, UserLookup } from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { MaterialModule } from '@ss/common/api-common';



import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { RouterModule } from "@angular/router";
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-journal-user-detail',
  standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    RouterModule,
    UiAutoCompleteComponent
],
  templateUrl: './journal-user-detail.component.html',
  styleUrls: ['./journal-user-detail.component.css']
})
export class JournalUserDetailComponent extends BaseChildEntityDetailComponent<JournalUser> {
    private usersSrv =  inject(UserListService);
    userLookup = new UserLookup(this.usersSrv);
    private fb = inject(FormBuilder);


    constructor(protected override entitySrv: JournalUserService) {
        super(entitySrv, 'JournalUser');
    }

    setupForm(e: JournalUser): UntypedFormGroup {
        return this.fb.group( {
            id:       [e.id],
            parentId: [e.parentId],
            userId:   [e.userId, Validators.required],
        });
    }
}
