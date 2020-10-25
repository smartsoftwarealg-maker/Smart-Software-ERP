import {HttpService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {map, switchMap, takeLast, tap} from "rxjs/operators";

enum Operation {
    none,
    upload,
    remove
}

/**
 *  YOU MUST CALL releaseResources() WHEN DONE WITH ImageModel
 */
export class ImageModel {
    public imageUrl: string;
    //
    private blob: Blob;
    private operation: Operation;
    //
    public enabled: boolean;
    private loading;

    onUpdate: () => void;

    constructor(protected httpSrv: HttpService) {
        this.enabled = true;
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
            // Redundant just in case operation is not reset in the method releaseResources
            this.operation = Operation.none;
        }
        this.updateView();
    }

    public setImageUrl(backendUrl: string, uploadOnSave: boolean = false): void {
        this.clear();
        this.imageUrl = backendUrl;
        if (backendUrl) {
            this.loading = true;
            this.httpSrv.getBlob(backendUrl)
                .subscribe(b => {
                        this.setImageBlob(b, uploadOnSave);
                        this.loading = false;
                    },
                    err => {
                        // todo: show an indication to the user that an error occurred
                        this.loading = false;
                        throw err;
                    }
                );
        } else {
            this.updateView();
        }
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
                    return (
                        this.httpSrv.uploadBlob(this.imageUrl, formName, this.blob)
                            .pipe(
                                tap(e => console.log(e)), // todo: report upload progress here
                            )
                    ).pipe(
                        takeLast(1),
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
