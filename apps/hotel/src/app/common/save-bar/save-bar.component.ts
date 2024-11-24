import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '../../../../../../libs/common/ui-lang/src/lib/translate.pipe';


@Component({
    selector: 'app-save-bar',
    templateUrl: './save-bar.component.html',
    styleUrls: ['./save-bar.component.scss'],
    standalone: true,
    imports: [NgIf, MatMiniFabButton, MatTooltip, TranslatePipe]
})
export class SaveBarComponent {

    @Input()
    saveVisible = true;
    @Input()
    saveDisabled = false;

    @Input()
    cancelVisible = true;
    @Input()
    cancelDisabled = false;

    @Output()
    save = new EventEmitter<void>();

    @Output()
    cancel = new EventEmitter<void>();

    onSave() {
        this.save.emit();
    }

    onCancel() {
        this.cancel.emit();
    }
}
