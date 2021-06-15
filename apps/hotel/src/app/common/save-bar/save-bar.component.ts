import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
    selector: 'app-save-bar',
    templateUrl: './save-bar.component.html',
    styleUrls: ['./save-bar.component.scss']
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
