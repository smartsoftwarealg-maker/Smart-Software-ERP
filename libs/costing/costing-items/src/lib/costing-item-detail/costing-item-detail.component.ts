import { Component, HostBinding, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { slideToRight } from "@ss/costing/costing-utils";
import { CItem } from '@ss/costing/costing-utils';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";

import { DatePickerComponent } from "@ss/common/ui-datepicker";
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from "@ss/common/ui-base-entity";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { CostingItemService } from "../costing-item.service";
import { AccountAutocompleteModel, AccountService } from "@ss/accounting/api-accounts";
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
  selector: "ss-costing-item-detail",
  templateUrl: "./costing-item-detail.component.html",
  styleUrls: ["./costing-item-detail.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,


   

  ],
  animations: [slideToRight]
})
export class CostingItemDetailComponent extends BaseEntityDetailComponent<CItem> implements OnInit {
  private accountSrv = inject(AccountService);
  accountLookup = new AccountAutocompleteModel(this.accountSrv);

  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(
    public override entitySrv: CostingItemService,
    public override shellSrv: ShellService,
    public override snackBarSrv: SnackBarService,
    public override route: ActivatedRoute,
    public override formBuilder: UntypedFormBuilder,
    public override confirmationSrv: ConfirmationDialogService) {
    super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COST_ITEMS');
  }

  public override setupForm(b: CItem): UntypedFormGroup {
    return this.formBuilder.group({
      id:          [b.id],
      code:        [b.code, Validators.maxLength(4)],
      description: [b.description, Validators.required],
      accountId:   [b.accountId, Validators.required],
    });
  }
}
