import {Component, HostBinding} from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CProduct, slideToRight } from '@ss/costing/costing-utils';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CostingProductService } from '../costing-product.service';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-costing-product-detail',
    templateUrl: './costing-product-detail.component.html',
    styleUrls: ['./costing-product-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
    ],
    animations: [slideToRight]
})
export class CostingProductDetailComponent extends BaseEntityDetailComponent<CProduct> {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(
    public override entitySrv: CostingProductService,
    public override shellSrv: ShellService,
    public override snackBarSrv: SnackBarService,
    public override route: ActivatedRoute,
    public override formBuilder: UntypedFormBuilder,
    public override confirmationSrv: ConfirmationDialogService) {
      super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COST_PRODUCTS');
  }

  public override setupForm(b: CProduct): FormGroup {
      return this.formBuilder.group({
          id:          [b.id],
          code:        [b.code, Validators.maxLength(4)],
          description: [b.description, Validators.required],
      });
  }
}
