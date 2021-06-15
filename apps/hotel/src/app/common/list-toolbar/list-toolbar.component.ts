import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Right} from 'smart-shared';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subscription} from 'rxjs/internal/Subscription';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';

@Component({
    selector: 'app-list-toolbar',
    templateUrl: './list-toolbar.component.html',
    styleUrls: ['./list-toolbar.component.scss']
})
export class ListToolbarComponent implements OnInit, OnDestroy {

    searchControl: FormControl = new FormControl();

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
    right: Right = {read: true, edit: true, del: true, create: true};

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
