import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {HttpService} from '../../smart-lib/common/http.service';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';

// interface IConfig {
//     baseUrl: string;
// }

@Component({
    selector: 'app-image-input',
    templateUrl: 'image-input.component.html',
    styleUrls: ['image-input.component.scss'],
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ImageInputComponent),
            multi: true,
        }
    ],
    standalone: true,
    imports: [NgIf, MatMiniFabButton]
})

export class ImageInputComponent implements OnInit, Validator {

    // tslint:disable-next-line:max-line-length
    static UNSAFE_NO_IMAGE = ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAXASURBVHhe7ZsLdqM4EEVn/0ucTmJ+trH52UkWMC9RRqkUxMYBqRz1O+dOn24QYNUVRQkx/7y8vhJDKMAYCjCGAoyhAGMowBgKMIYCjKEAYyjAGAowhgKMoQBjKMAYCjCGAoyhAGMowBgKMIYCjKEAYyjAGAowhgKMoQBjKMAYCjCGAoyhAGMowBgKMIYCjPkbBTy/vAynU9O2+IvaFZ/0BSDKp/O57br6cCjK6mmT/Xl4/PfPAxhOZ9U4PqkJQLjPz89dPxyOx2q73WT5w+OTC/eYY9Oow+Pz6wUg3P1wOjbtdrfP8gLh9gP8KjhEnS0+v0yAS9/IJ/v6LZ88Pm3mh3tMXhTq/PG5dwFI313fv+eTHfLJknDj5sAZ8J/fgg3qcvG5LwEY4P0wIDUjOWB4XkjfV3kPb1aU5W5fo+CBSHcJuJRtzAshYwGIC6Kzr+v3+mTjQ/MDEHA8A7a73eHYwOJ3kcUueRT+qRpEJp4AV5+0XV8fVsgnOBZnKKstiks8EvwAvwp+hjwPbgjVIDIBBbh8gvGIUenqE9nzm0C4kVD+zycdnsNLUgdO5c+MoaD2RiagAIxN38+bcOF2+eT4lk9OuHXUyZeQF6W/Fq6i9kYmoABkBt/Py7w/Lz/yCWoehHvJAL/Kbr/3l8aV1d7IBBSAvOz7KXnvNUbeZ30SNNxjcFH5eyJfXRH2IYxY+34i5ngeLEzfq4CU5n8VwD2nGsQkrACMc99PPELVXiswAuTIQFWmGsQkrADMp3w/kXbUXgfCgdsiMrIQKstK7VXMr3F/QFgBc6admPf6NvcJfvm6ZZgkrICu/zLtxGhSDQAF6E0rgiEve4KHsGoAKEBvWheZbSennRSgN61LUVa+J5PTTiUAReE9ICdrv1sAZlu+J5PTTiXAfJbgQLb0P+l3Czg2V6adFKA3rQsqH98TgLtbNZgUgD/zosjyPDLIPO5XpSMAoUQHfGf29UE1mBSADsujooEnlvtV6QgAmAP7zpTVVu29VQCeJOHcpCmgrD4LoU2Wq73zBeRF2Q9v7/LOzy9N28KEarCcNAUg7cjOqL0zBSD6iIE8cDidx5IWkqaA9uvKjPogcKaAydcYssZdhTQFqJWZpmnl3jkC8Hd5iKftet9mDjiP8qpIUwBiKvO1L/UcSwSota3L4CS4F3Fm+ZJckaYAsMk+CyG1MjMzBTVtJ49yoKaSbS6DC/kDv3OQrIBqu/P9USszMwU8Pm3UwoiaY19GzT9wFcRatQHJCpArM8BF2TFTAICEfV1jLo274aaxv5v6ChoXyvJctUxWAKLm+wPkB4HzBfyMaqunfh5cRb4tB8kKOJ2/BFR+EBhUAJ438m4bg+pWFgjJCkAUZD/lykw4AVleXI6+o+sHf61kBQD5iYpcmQkkAI/6+VHz5WzKAtQak98eQsC4ZLqK+5I1ZQEq0D5AqwtA+Pth4r3FVfC4TlmA+j8j2u5jYrWuABw1XvOZCS7tq4MEBaiYoqJ3228VgAEuHycSHOK9LiRBAUAW3X5l5iYBKCtd7sI0WJZVAO1xKnfO5aQpABnW98q/kJgpAOFW8UUb+YZj3W9s0xSgVmZcrOcIyIvyuxAg48Plbv+R0NYiTQFNq1Zm3mqVywLGAz8OaQpQn6hg+oONFwQgZYXr+WXSFIDgunHtcCszkwLw5+QCQDTSFADkJyrI7NgyKcCcZAVgtuk7hvxeHw6qqKeAsKiVmTEUEBa1MjOGAsKiPlEZQwHBQX9k39QbhU2W3wOyWEhNAGatKEBR/GBagPGuqqA7JDUBCgrQmyJDAXpTZFAXFWV1z5RVFa40sBfwl0MBxlCAMRRgDAUYQwHGUIAxFGAMBRhDAcZQgDEUYAwFGEMBxlCAMRRgDAUYQwHGUIAxFGAMBRhDAcZQgDEUYAwFGEMBxlCAMRRgDAUYQwHGUIAxFGAMBRhDAcZQgDEUYAwFGEMBpry+/ge6/be4hSQ52gAAAABJRU5ErkJggg==';
    static NO_IMAGE: SafeResourceUrl = null;

    public imgSrc: SafeResourceUrl;

    @Input()
        parentUrl: string;
    @Input()
        childUrl: string;
    @Input()
        editable = true;
    @Input()
        required = false;
    @Input()
        cacheMap: { [key: number]: SafeResourceUrl; };
    @Input()
        suppressLoadingErrors = false;

    @ViewChild('file', {static: false}) file: ElementRef;

    defaultImage: SafeResourceUrl;

    public imageInputUploader = null;
    id = 0;

    constructor(public httpSrv: HttpService, public sanitizer: DomSanitizer) {
        if (ImageInputComponent.NO_IMAGE == null) {
            ImageInputComponent.NO_IMAGE = this.sanitizer.bypassSecurityTrustResourceUrl(ImageInputComponent.UNSAFE_NO_IMAGE);
        }
        this.imgSrc = ImageInputComponent.NO_IMAGE;
        this.defaultImage = ImageInputComponent.NO_IMAGE;
    }

    @Input()
    set noImage(img: string) {
        if (this.imgSrc === this.defaultImage || this.imgSrc === ImageInputComponent.NO_IMAGE) {
            this.imgSrc = img;
        }
        this.defaultImage = img;
    }

    @Input()
    set parentId(id: number) {
        this.setParent(id);
    }

    public static toBase64(blob: any, callback: any) {
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            callback(dataUrl);
        };
        reader.readAsDataURL(blob);
    }

    ngOnInit(): void {
        this.imageInputUploader.onAfterAddingFile = (fileItem => {
            if (fileItem.file.name.endsWith('.jpg') || fileItem.file.name.endsWith('.jpeg') || fileItem.file.name.endsWith('.png')) {
                this.selectImage();
            } else {
                // todo: throw a proper error
                alert('File format not supported');
            }
        });
    }

    setParent(id: number) {
        if (id !== this.id || this.imgSrc === this.defaultImage) {
            this.id = id;
            this.loadImage();
            this.imageInputUploader.clearQueue();
        }
    }

    public upload(id: number, onFinish: (error: any) => void): void {
        if (this.imageInputUploader.queue[0]) {
            // this.imageInputUploader.authToken=null;
            this.imageInputUploader.queue[0].withCredentials = false;
            this.imageInputUploader.queue[0].headers = [
                // {name: 'Access-Control-Allow-Origin', value: '*'},
                {name: 'Authorization', value: localStorage.getItem('auth_token')}
            ];
            this.imageInputUploader.queue[0].url = this.httpSrv.getBaseUrl()
                + this.parentUrl + id + this.childUrl;

            this.imageInputUploader.onSuccessItem = (response: string,
                status: number) => {
                if (onFinish != null) {
                    this.id = id;
                    onFinish(null);
                }
                // this.loadImage();
                this.imageInputUploader.clearQueue();
            };
            this.imageInputUploader.onErrorItem = (
                response: string,
                status: number) => {
                // todo: translate these:
                const err = {
                    name: 'error saving photo',
                    _body: 'error saving photo',
                    status,
                    statusText: response,
                    url: this.imageInputUploader.queue[0].url
                };
                this.imageInputUploader.clearQueue();
                if (onFinish != null) {
                    onFinish(err);
                } else {
                    throw err;
                }
                // this.loadImage();
            };

            this.imageInputUploader.queue[0].upload();
            this.imageInputUploader.queue[0].file.name = null;
        } else {
            onFinish(null);
        }
    }

    private setImageBlobAndCache(b: string): void {
        this.setImageBlob(b);
        if (this.cacheMap) {
            this.cacheMap[this.id] = this.imgSrc;
        }
    }

    private setImageBlob(b: string): void {
        this.imgSrc = this.sanitizer.bypassSecurityTrustResourceUrl(b);
    }

    private selectImage() {
        const reader = new FileReader();
        // it's onload event and you forgot (parameters)
        reader.onload = (e: ProgressEvent) => {
            // the result image data
            const target = e.target as any;
            this.imgSrc = target.result;
        };
        reader.onerror = e => {
            // todo: throw a proper error
            alert('Failed to read file');
            this.clearSelection();
        };
        // you have to declare the file loading
        reader.readAsDataURL(this.file.nativeElement.files[0]);
    }

    public clearSelection() {
        this.imgSrc = null;
        this.file.nativeElement.files[0] = null;
        this.imageInputUploader.queue[0] = null;
    }

    private loadImage(): void {
        if (this.id > 0) {
            if (this.cacheMap && this.cacheMap[this.id]) {
                this.imgSrc = this.cacheMap[this.id];
            } else {
                this.httpSrv.getBlob(this.parentUrl + this.id + this.childUrl)
                    .subscribe(
                        res => {
                            const blob = new Blob([res.body], {type: 'images/jpg'});
                            if (blob.size > 10) {
                                // this.imgSrc = URL.createObjectURL(blob); // memory leak!!! did not call release!!!
                                // ImageInputComponent.toBase64(blob, this.setImageBlob.bind(this));
                                ImageInputComponent.toBase64(blob, this.setImageBlobAndCache.bind(this));
                            } else {
                                this.imgSrc = this.defaultImage;
                                if (this.cacheMap) {
                                    this.cacheMap[this.id] = this.defaultImage;
                                }
                            }
                            this.imageInputUploader.clearQueue();
                        },
                        err => {
                            if (!this.suppressLoadingErrors) {
                                throw err;
                            }
                        }
                    );
            }
        } else {
            this.imgSrc = this.defaultImage;
        }
        // this._service.getPersonPhoto(this.id)
        //   .subscribe(res => {
        //     this.imgSrc = res.size <= 2 ? this.defaultImage : URL.createObjectURL(res);
        //   });
    }

    registerOnValidatorChange(fn: () => void): void {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.imgSrc == null && this.required) {
            return {
                required: {
                    valid: false,
                },
            };
        }
        control.setErrors(null);
        return undefined;
    }
}
