import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Right } from '../../smart-lib/common/models';
import { Subscription } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '../../../../../../libs/common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'app-list-toolbar',
    templateUrl: './list-toolbar.component.html',
    styleUrls: ['./list-toolbar.component.scss'],
    standalone: true,
    imports: [MatFormField, MatLabel, TranslateDirective, MatInput, FormsModule, ReactiveFormsModule, NgIf, MatIconButton, MatTooltip, TranslatePipe]
})
export class ListToolbarComponent implements OnInit, OnDestroy {

    searchControl: UntypedFormControl = new UntypedFormControl();

    @Output()
    filterChange = new EventEmitter<string>();
    @Output()
    refresh = new EventEmitter<void>();
    @Output()
    add = new EventEmitter<void>();
    @Output()
    edit = new EventEmitter<void>();
    @Output()
    remove = new EventEmitter<void>();

    @Input()
    refreshVisible = true;
    @Input()
    refreshDisabled = false;

    @Input()
    addVisible = true;
    @Input()
    addDisabled = false;

    @Input()
    editVisible = true;
    @Input()
    editDisabled = true;

    @Input()
    removeVisible = true;
    @Input()
    removeDisabled = true;

    @Input()
    right: Right = { read: true, edit: true, del: true, create: true };

    subscription: Subscription;

    constructor(private confirmationSrv: ConfirmationDialogService) {
    }

    ngOnInit(): void {
        this.subscription = this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(f => this.filterChange.emit(f));
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    onRefresh(): void {
        if (this.right.read) {
            this.refresh.emit();
        }
    }

    onAdd(): void {
        this.add.emit();
    }

    onEdit(): void {
        this.edit.emit();
    }

    onRemove(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(yes => {
                if (yes) {
                    this.remove.emit();
                }
            }
            );
    }

}
