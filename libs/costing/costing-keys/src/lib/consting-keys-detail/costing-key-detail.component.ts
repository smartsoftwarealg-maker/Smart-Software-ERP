import {Component, HostBinding} from '@angular/core';
import {
    FormGroup,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CostingKeyService } from '../costing-key.service';
import { CKey, slideToRight } from '@ss/costing/costing-utils';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-costing-key-detail',
    templateUrl: './costing-key-detail.component.html',
    styleUrls: ['./costing-key-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,

        DatePickerComponent,

    ],
    animations: [slideToRight]
})
export class CostingKeyDetailComponent extends BaseEntityDetailComponent<CKey> {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(
    public override entitySrv: CostingKeyService,
    public override shellSrv: ShellService,
    public override snackBarSrv: SnackBarService,
    public override route: ActivatedRoute,
    public override formBuilder: UntypedFormBuilder,
    public override confirmationSrv: ConfirmationDialogService) {
      super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COST_ALLOCATION_KEYS');
  }

  public override setupForm(b: CKey): FormGroup {
      return this.formBuilder.group({
          id:          [b.id],
          code:        [b.code, Validators.maxLength(4)],
          description: [b.description, Validators.required],
      });
  }
}
