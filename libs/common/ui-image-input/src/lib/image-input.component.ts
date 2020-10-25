import {AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ImageModel} from './image-model';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {LanguageService} from '@ss/common/ui-lang';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ss-image-input',
    templateUrl: 'image-input.component.html',
    styleUrls: ['image-input.component.scss']
})
export class ImageInputComponent implements OnInit, OnDestroy, AfterContentInit {

    @ViewChild('container', {static: true}) container: ElementRef;
    @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

    fileInputControl: FormControl = new FormControl();
    private fileInputControlSubscription: Subscription;

    private cachedWidth: string;
    private cachedHeight: string;

    public model: ImageModel;

    public url: string;
    public safeUrl: SafeUrl;

    constructor(public langSrv: LanguageService, private sanitizer: DomSanitizer, private renderer: Renderer2) {
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
        this.renderer.addClass(this.container.nativeElement.parentElement, 'mat-elevation-z10');
        this.updateSize();
    }

    @Input()
    set ImageModel(model: ImageModel) {
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

    ngOnInit(): void {
        this.fileInputControlSubscription = this.fileInputControl
            .valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(e => {
                const list: FileList = this.fileInput.nativeElement.files;
                if (list && list.length > 0) {
                    const f = list.item(0);
                    if (f) {
                        this.onFileSelect(f);
                    }
                }
                this.fileInput.nativeElement.files = null;
            });
    }

    ngOnDestroy(): void {
        if (this.model) {
            this.model.onUpdate = null;
        }
        this.releaseResources();
        if (this.fileInputControlSubscription) {
            this.fileInputControlSubscription.unsubscribe();
        }
    }

    public releaseResources(): void {
        if (this.url) {
            URL.revokeObjectURL(this.url);
        }
        this.url = null;
        this.safeUrl = null;
    }

    public updateSize(): void {
        if (this.container) {
            const e = this.container.nativeElement.parentElement;
            if (this.cachedWidth) {
                this.renderer.setStyle(e, 'width', this.cachedWidth);
            }
            if (this.cachedHeight) {
                this.renderer.setStyle(e, 'height', this.cachedHeight);
            }
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
    }

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
        if (e.name) {
            throw new Error("Invalid File Name");
        }
        const lowName = e.name.toLowerCase();
        if (lowName.endsWith('.png') || lowName.endsWith('.jpg') || lowName.endsWith('.jpeg') || lowName.endsWith('.bmp')) {

        }
        console.log(e.name)
    }

}
