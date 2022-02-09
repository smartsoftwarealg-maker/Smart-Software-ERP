import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lookup } from '@ss/common/api-organizations';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from '@ss/common/ui-shell';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
class LookupService extends BaseEntityService<Lookup> {
    constructor(protected httpSrv: HttpService) {
        super(httpSrv, null);
    }
}

@Component({
    selector: 'ss-organizations-detail',
    templateUrl: './organizations-detail.component.html',
    styleUrls: ['./organizations-detail.component.scss'],
    providers: [
        LookupService
    ]
})
export class OrganizationsDetailComponent implements OnInit {

    public title: string;
    public url: string;
    public lookup: Lookup;
    public form: FormGroup = null;
    public saving: boolean = false;

    constructor(public dialogRef: MatDialogRef<OrganizationsDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public formBuilder: FormBuilder,
        public snackBarSrv: SnackBarService,
        public entitySrv: LookupService) {
        this.title = data.title;
        this.lookup = data.lookup;
        entitySrv.setURL(data.url);
    }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            description: [this.lookup.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
        });
    }

    public save(): void {
        if (this.saving) {
            return;
        }
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        this.saving = true;
        this.lookup.description = this.form.value.description;
        let obs: Observable<any> = this.lookup.id === 0
            ? this.entitySrv.add(this.lookup).pipe(tap((i: number) => { this.lookup.id = i; }))
            : this.entitySrv.update(this.lookup);
        obs.subscribe({
            next: () => {
                //this.saving = false;
                this.close(true);
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
            },
            error: (err: Error) => {
                this.snackBarSrv.showFailureMessage();
                this.saving = false;
                throw err;
            }
        })
    }

    close(refresh: boolean) {
        this.dialogRef.close(refresh);
    }
}
