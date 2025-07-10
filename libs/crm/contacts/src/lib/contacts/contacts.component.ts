import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ActivatedRoute, Router } from '@angular/router';
import { ShellService } from '@ss/common/ui-shell';
import { PaginationModel } from '@ss/common/api-common';
import { ContactService } from '../services/contact.service';
import { MatTooltip } from '@angular/material/tooltip';
import { Contact } from '../services/api';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/input';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';


@Component({
    selector: 'ss-contacts',
    imports: [CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatButton,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIconButton,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatTooltip,
        PaginationComponent,
        TranslateDirective,
        TranslatePipe,
        MatHeaderCellDef,
        ReactiveFormsModule,
    ],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss',
    standalone: true
})
export class ContactsComponent implements OnInit, OnDestroy {
    #entitySrv = inject(ContactService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);
    public confirmationSrv = inject(ConfirmationDialogService);

    pagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 15,
        elementCount: 0
    });
    selectedRow: Contact | null = null;
    displayedColumns = [
        'btn',
        'lastName',
        'firstName',
        'primaryEmail',
        'addressLine1',
        'companyName',
        'createdAt'
    ];
    data: Contact[] = [];
    loading = false;

    constructor() {
        this.pagination.onChange = () => this.refresh();
    }

    ngOnInit(): void {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.refresh();
    }

    sort(event: Sort) {
        this.#entitySrv.sortColumn = event;
        this.refresh();
    }

    selectRow(row: Contact): void {
        this.selectedRow = row;
    }

    private refresh(): void {
        this.loading = true;
        this.#entitySrv.getPage(this.pagination).subscribe((res) => {
            this.data = res;
            this.loading = false;
        });
    }

    edit(contact: Contact): void {
        this.showDetail(contact.id);
    }

    public goBack(): void {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    add() {
        this.showDetail(0);
    }

    search() {
        console.log('Search contacts');
    }

    public showDetail(id: number): void {
        this.#router.navigate([id], { relativeTo: this.#route }).then();
    }

    ngOnDestroy() {
        this.#shellSrv.reset();
    }

    delete(contact: Contact) {
        this.confirmationSrv.confirmDelete().subscribe((confirmed) => {
            if (confirmed) {
                this.#entitySrv.remove(contact.id).subscribe(() => {
                    this.data = this.data.filter(x => x.id !== contact.id);
                });
            }
        });
    }

}

