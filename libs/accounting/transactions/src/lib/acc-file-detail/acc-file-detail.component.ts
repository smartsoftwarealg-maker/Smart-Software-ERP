import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ACCFile, AccFileService} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LookupsService} from '@ss/common/api-lookup';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { LoginService, MaterialModule } from "@ss/common/api-common";




import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-acc-file-detail',
    templateUrl: './acc-file-detail.component.html',
    styleUrls: ['./acc-file-detail.component.scss'],
    standalone: true,
    imports: [
    RouterModule,
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule
],
})
export class AccFileDetailComponent extends BaseEntityDetailComponent<ACCFile> implements OnInit {
    private centerName = '';

    constructor(
        public override entitySrv: AccFileService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ACC_FILES');
    }

    public override setupForm(e: ACCFile): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            center: [e.center || this.loginSrv.appCtx.center],
            fileYear: [e.fileYear, Validators.compose(
                [
                    Validators.required,
                    Validators.min(2000),
                    Validators.max(2900)
                ])],
            description: [e.description, Validators.required],
        });
    }

    override finishLoading(e: ACCFile) {
        super.finishLoading(e);
        this.form
            .controls['fileYear']
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(value => {
                this.form.controls['description'].setValue(`${this.centerName} ${value}`);
            });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.entitySrv
            .getCurrentCenterName()
            .subscribe(str => this.centerName = str);
    }
}
