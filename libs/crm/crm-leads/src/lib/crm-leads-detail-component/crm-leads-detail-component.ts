import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CRMLeadsService } from '../crm-lead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-crm-leads-component',
    imports: [CommonModule, MaterialModule, TranslatePipe],
    templateUrl: './crm-leads-detail-component.html',
    styleUrl: './crm-leads-detail-component.scss',
})
export class CrmLeadsDetailComponent implements OnInit {
    #entitySrv = inject(CRMLeadsService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);


    formBuilder = inject(FormBuilder);

    form = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phone: [''],
        status: [''],
        createdAt: [new Date()]
    });

    ngOnInit(): void {

    }

    list() {
        this.#router.navigate(['..'], {relativeTo: this.#route}).then();
    }

    save() {
    }

    cancel() {
        if (this.canDeactivate()) {
            this.#router.navigate(['..'], {relativeTo: this.#route}).then();
        }
    }

    canDeactivate(): Observable<boolean> {
        if (this.form.touched && this.form.dirty) {
            return this.#confirmationSrv.confirmDontSave();
        }
        return of(true);
    }
}
