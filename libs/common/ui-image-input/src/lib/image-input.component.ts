import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ImageModel} from './image-model';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'ss-image-input',
    templateUrl: 'image-input.component.html',
    styleUrls: ['image-input.component.scss']
})
export class ImageInputComponent implements OnInit, OnDestroy {

    public model: ImageModel;

    public url: string;
    public safeUrl: SafeUrl;

    constructor(private sanitizer: DomSanitizer) {
    }

    @Input()
    alt = '';

    @Input()
    width: string;

    @Input()
    height: string;

    @Input()
    set ImageModelRef(model: ImageModel) {
        if (this.model) {
            this.model.onUpdate = null;
        }
        this.model = model;
        if (model) {
            model.onUpdate = this.updateView;
        }
        this.updateView();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.model) {
            this.model.onUpdate = null;
        }
        this.releaseResources();
    }

    public releaseResources(): void {
        if (this.url) {
            URL.revokeObjectURL(this.url);
        }
        this.url = null;
        this.safeUrl = null;
    }

    updateView = () => {
        this.releaseResources();
        if (!this.model) {
            return;
        }
        const blob = this.model.getBlob();
        if (blob && blob.size > 0) {
            this.url = URL.createObjectURL(blob);
            this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.url);
        }
    }

}
