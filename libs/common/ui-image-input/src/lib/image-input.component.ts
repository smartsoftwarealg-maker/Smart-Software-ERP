import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ImageModel } from './image-model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-image-input',
    templateUrl: 'image-input.component.html',
    styleUrls: ['image-input.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule, TranslateDirective]
})
export class ImageInputComponent implements OnInit, OnDestroy, AfterContentInit {

    // @ViewChild('container', {static: true}) container: ElementRef;
    @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

    private cachedWidth: string;
    private cachedHeight: string;

    public model: ImageModel;

    public url: string;
    public safeUrl: SafeUrl;

    constructor(private ref: ElementRef,
                public langSrv: LanguageService,
                private sanitizer: DomSanitizer,
                private renderer: Renderer2) {
    }

    @Input()
        alt = '';

    @Input()
    set width(w: string) {
        this.cachedWidth = w;
        this.updateSize();
    }

    @Input()
    set height(h: string) {
        this.cachedHeight = h;
        this.updateSize();
    }

    @Input()
    set enabled(e: boolean) {
        if (this.model) {
            this.model.enabled = e;
        }
    }

    ngAfterContentInit(): void {
        //this.renderer.addClass(this.ref.nativeElement, 'mat-elevation-z10');
        this.updateSize();
    }

    @Input()
    set imageModel(model: ImageModel|null) {
        if (this.model) {
            this.model.onUpdate = null;
        }
        this.model = model;
        if (model) {
            model.onUpdate = this.updateView;
        }
        this.updateView();
    }

    get disabled() {
        return this.model && !this.model.enabled;
    }

    get readOnly() {
        return this.model && this.model.readOnly;
    }

    ngOnInit(): void {
        this.fileInput.nativeElement.onchange = () => {
            const list: FileList = this.fileInput.nativeElement.files;
            if (list && list.length > 0) {
                const f = list.item(0);
                if (f) {
                    this.onFileSelect(f);
                }
            }
            this.fileInput.nativeElement.files = null;
        };
    }

    ngOnDestroy(): void {
        if (this.model) {
            this.model.onUpdate = null;
        }
        this.releaseResources();
        this.fileInput.nativeElement.onchange = null;
    }

    public releaseResources(): void {
        if (this.url) {
            URL.revokeObjectURL(this.url);
        }
        this.url = null;
        this.safeUrl = null;
    }

    public updateSize(): void {
        const e = this.ref.nativeElement;
        if (this.cachedWidth) {
            this.renderer.setStyle(e, 'width', this.cachedWidth);
        }
        if (this.cachedHeight) {
            this.renderer.setStyle(e, 'height', this.cachedHeight);
        }
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
    };

    deleteImage(): void {
        if (this.model) {
            this.model.deleteImage();
        }
        this.url = null;
        this.safeUrl = null;
    }

    onFileSelect(e: File): void {
        if (e.size > 1048576) {
            throw new Error(this.langSrv.translate('COMMON_MAX_FILE_SIZE_1MB'));
        }
        if (!e.name) {
            throw new Error('Invalid file name');
        }
        const lowName = e.name.toLowerCase();
        if (lowName.endsWith('.png') || lowName.endsWith('.jpg') || lowName.endsWith('.jpeg') || lowName.endsWith('.bmp')) {
            if (this.model) {
                this.model.setImageBlob(e, true);
            }
        } else {
            throw new Error(this.langSrv.translate('COMMON_NOT_AN_IMAGE'));
        }
    }

}
