import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { JournalUser, JournalUserService } from '@ss/treasury/api-journal';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CommonUiAutoCompleteModule, UserLookup } from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { MaterialModule } from '@ss/common/api-common';



import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'ss-journal-user-detail',
  standalone: true,
  imports: [
      CommonModule,
      MaterialModule,



      CommonUiDatepickerModule,
      RouterModule,
      CommonUiAutoCompleteModule,
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
