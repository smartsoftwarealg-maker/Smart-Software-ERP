import { Component, DestroyRef, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { MutualRequest, MutualRequestLineService, MutualRequestService } from '@social/social-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ss-mutual-requests',
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MaterialModule,
    ReactiveFormsModule,
    DatePickerComponent,
    RouterOutlet
],
    templateUrl: './mutual-requests-detail.component.html',
    styleUrl: './mutual-requests-detail.component.scss'
})
export class MutualRequestsDetailComponent extends BaseEntityDetailComponent<MutualRequest> {
    #detailSrv = inject(MutualRequestLineService);
    #loginSrv = inject(LoginService);
    #destroyRef = inject(DestroyRef);
    #router = inject(Router);

    constructor(
        public override entitySrv: MutualRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_MUTUAL_REQUESTS');
    }

    public override setupForm(e: MutualRequest): UntypedFormGroup {
        this.#detailSrv.setParentId(e.id || 0);
        return this.formBuilder.group({
            id:           [e.id],
            serialNumber: [{ value: e.serialNumber||0, disabled: true }],
            description:  [e.description],
            date:         [e.date || new Date(), Validators.required],
            centerId:     [e.centerId||this.#loginSrv.appCtx.center, Validators.required]
        })
    }

    override ngOnInit() {
        super.ngOnInit();
        this.#router
            .events
            .pipe(
                takeUntilDestroyed(this.#destroyRef),
            filter((e: any): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((e: RouterEvent) => {
            if (e instanceof NavigationEnd) {
                this.disableControls(e.url);
            }
        });

    }

    private disableControls(url: string) {
        const enabled = url.indexOf('/detail/') < 0;
        this.saveButton.visible = enabled;
        this.shellSrv.setGoBackEnabled(enabled);
    }
}
