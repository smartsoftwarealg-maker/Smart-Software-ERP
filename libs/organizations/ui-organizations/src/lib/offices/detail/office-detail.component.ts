import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { OfficeService, Office } from '@ss/common/api-lookup';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { AssetsBuildingService } from '@ss/assets-component';
import { MatCard } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-office-detail',
    templateUrl: './office-detail.component.html',
    styleUrls: ['./office-detail.component.scss'],
    standalone: true,
    imports: [MatCard, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, UiAutoCompleteComponent, MatInput, MatError]
})
export class OfficeDetailComponent extends BaseEntityDetailComponent<Office> implements OnInit, OnDestroy {
  private buildingSrv = inject(AssetsBuildingService);
  private router = inject(Router);

  buildingLookup = new DefaultAutoCompleteModel(this.buildingSrv);

  public saving = false;
  public isCMMS = false;

  constructor(
    public officeSrv: OfficeService,
    public override shellSrv: ShellService,
    public override snackBarSrv: SnackBarService,
    public override route: ActivatedRoute,
    public override formBuilder: UntypedFormBuilder,
    public httpSrv: HttpService,
    public override confirmationSrv: ConfirmationDialogService) {
    super(officeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_OFFICE');
    this.title = this.route.snapshot?.data['title'] || this.title;
    this.isCMMS = this.route.snapshot?.data['title'] != null;
  }


  override setupForm(a: Office): UntypedFormGroup {
    this.form = this.formBuilder.group({
      description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      code: [a.code, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
      buildingId: [{ value: a.buildingId || this.entitySrv.getParentId(), disabled: true }, Validators.required],
      floorNo: [a.floorNo || 0, [Validators.min(0), Validators.max(20)]],
      id: [a.id]
    });

    return this.form;
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.buildingSrv.getParentId()) {
      this.router.navigate(['../'], { relativeTo: this.route }).then();
    }
  }
}
