import { HttpService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

enum Operation {
    none,
    upload,
    remove
}

export class ImageModel {
    public imageUrl: string;
    //
    private blob: Blob;
    private operation: Operation;
    //
    public  enabled: boolean;
    public  readOnly: boolean;
    private loading = false;

    onUpdate: () => void;

    constructor(protected httpSrv: HttpService) {
        this.enabled = true;
        this.readOnly = false;
    }

    public get isLoading() {
        return this.loading;
    }

    public getBlob(): Blob {
        return this.blob;
    }

    public setImageBlob(blob: Blob, uploadOnSave: boolean = false): void {
        this.clear();
        if (blob && blob.size > 0) {
            this.blob = blob;
            // this.url = URL.createObjectURL(blob);
            // this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.url);
            this.operation = uploadOnSave ? Operation.upload : Operation.none;
        } else {
            // Redundant just in case
            this.operation = Operation.none;
        }
        this.updateView();
    }

    /**
     * Used to load the image for the first time, or to change its source, or when a new file is selected
     * @param backendUrl the source of the image, or the destination to which the image will be uploaded
     * @param uploadOnSave should this image be uploaded when the submit method is called?
     */
    public setImageUrl(backendUrl: string, uploadOnSave: boolean = false): void {
        this.clear();
        this.imageUrl = backendUrl;
        if (backendUrl) {
            this.loading = true;
            this.httpSrv.getBlob(backendUrl)
                .subscribe(
                    blob => {
                        this.setImageBlob(blob, uploadOnSave);
                        this.loading = false;
                    },
                    err => {
                        // todo: show an indication to the user that an error occurred
                        this.loading = false;
                        if (err.status != 404) {
                            throw err;
                        }
                    }
                );
        } else {
            this.updateView();
        }
    }

    /**
     * used to update the url without changing anything else in the model
     */
    public setBackendUrl(backendUrl: string): void {
        this.imageUrl = backendUrl;
    }

    public deleteImage(): void {
        this.clear();
        this.operation = Operation.remove;
    }

    public submit(formName: string): Observable<boolean> {
        switch (this.operation) {
            case Operation.remove:
                if (this.imageUrl) {
                    return this.httpSrv.remove(this.imageUrl)
                        .pipe(
                            map(() => true)
                        );
                }
                break;
            case Operation.upload:
                if (this.imageUrl && this.blob && this.blob.size > 0) {
                    return this.httpSrv.uploadBlob(this.imageUrl, formName, this.blob)
                        .pipe(
                            switchMap(() => {
                                this.operation = Operation.none;
                                return of(true);
                            })
                        );
                }
                break;
        }
        return of(false);
    }

    public clear(): void {
        this.blob = null;
        this.operation = Operation.none;
    }

    public updateView(): void {
        if (this.onUpdate) {
            this.onUpdate();
        }
    }

}
