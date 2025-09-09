import {Component, inject, OnDestroy, signal} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule, FormControl, FormGroup,
} from '@angular/forms';
import {LoginService, MaterialModule} from '@ss/common/api-common';
import {TranslateDirective} from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CompaignService } from '../compaign.service';
import { Campaign, CHANNELS, CTYPES, STATUS } from '../campaign.api';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import {MailingListService} from '@ss/crm/mailing-list';
import {NgxEditorComponent, NgxEditorMenuComponent, Editor, Toolbar} from 'ngx-editor'

@Component({
    selector: 'ss-campaign-detail',
    templateUrl: 'campaign-detail.html',
    styleUrl: 'campaign-detail.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        DatePickerComponent,
        UiAutoCompleteComponent,
        NgxEditorMenuComponent,
        NgxEditorComponent
    ],
})
export class CampaignDetailComponent extends BaseEntityDetailComponent<Campaign> implements OnDestroy {
    #mailingListSrv = inject(MailingListService);

    mailingListLookup = new DefaultAutoCompleteModel(this.#mailingListSrv);
    mailingList = new FormControl<number|null>(null);

    html = '';
    htmlForm = new FormGroup({
        editorContent: new FormControl(
            { value: '', disabled: false },
            Validators.required
        ),
    });

    editor: Editor|null = null;
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];


    constructor(
        public override entitySrv: CompaignService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'CRM_CAMPAIGN',
        );
    }

    private userSrv = inject(UserListService);
    private loginSrv = inject(LoginService);
    userLookup = new UserLookup(this.userSrv);
    isResponsible = signal(this.loginSrv.appCtx.responsible) ;

    public override setupForm(e: Campaign): UntypedFormGroup {
        return this.formBuilder.group({
            id:              [e.id],
            name:            [e.name, Validators.required],
            cType:           [e.cType, Validators.required],
            status:          [e.status, Validators.required],
            description:     [e.description],
            audienceQuery:   [e.audienceQuery],
            audienceSize:    [e.audienceSize],
            tag:             [e.tag],
            startDate:       [e.startDate, Validators.required],
            endDate:         [e.endDate],
            budget:          [e.budget],
            actualCost:      [e.actualCost, Validators.required],
            expectedRevenue: [e.expectedRevenue],
            channels:        [e.channels, Validators.required],
            emailTemplateId: [e.emailTemplateId],
            smsTemplateId: [e.smsTemplateId],
            landingPageUrl: [e.landingPageUrl],
            callScript: [e.callScript],
            ownerId: [{ value: e.ownerId || this.loginSrv.appCtx.id, disabled: !this.isResponsible() }],
            createdAt: [e.createdAt || new Date(), Validators.required],
            // createdAt: [{value:e.createdAt || new Date(), disabled:true}],
            createdBy: [{ value: e.createdBy || this.loginSrv.appCtx.id, disabled: true }],
            updatedAt: [e.updatedAt || new Date(), Validators.required],
            //updatedAt: [{value:e.updatedAt || new Date(), disabled:true}],
            updatedBy: [{ value: e.updatedBy || this.loginSrv.appCtx.id, disabled: true }],
        });
    }

    protected readonly CTYPES = CTYPES;
    protected readonly STATUS = STATUS;
    protected readonly CHANNELS = CHANNELS;

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.editor?.destroy();
    }

    override ngOnInit() {
        super.ngOnInit();
        this.editor = new Editor();
    }

    send() {
        console.log(this.htmlForm.value);
    }
}
