import {AbstractDataSource} from './abstract-data-source';
import {Right} from 'smart-shared';
import {SnackBarService} from '../snack-bar.service';
import {Observable} from 'rxjs';
import {LoadingState} from '../util';

export class AbstractEntityView<T, S extends AbstractDataSource<T>> {

    // loading = true;
    // error = false;
    public loadingState: LoadingState = LoadingState.LOADING;

    saveFn = (x, y) => this.save(x, y);

    constructor(public dataSrc: S, public accessRight: Right, public snackBarSrv: SnackBarService) {
    }

    public refresh(): void {
        // used in lists after saving or deleting
    }

    protected subscribeAndReport(observable: Observable<boolean>, callback: (success: boolean) => void): void {
        observable.subscribe(
            r => {
                try {
                    if (r) {
                        this.refresh();
                        if (callback != null) {
                            callback(true);
                        }
                        this.snackBarSrv.showSuccessMessage();
                    } else {
                        if (callback != null) {
                            callback(false);
                        }
                        this.snackBarSrv.showFailureMessage();
                    }
                } catch (e) {
                    this.snackBarSrv.showFailureMessage();
                    throw e;
                }
            },
            e => {
                this.snackBarSrv.showFailureMessage(e);
                if (callback != null) {
                    callback(false);
                }
                throw e;
            }
        );
    }

    public remove(objId: number, callback?: (success: boolean) => void): void {
        if (this.accessRight.del) {
            this.subscribeAndReport(this.dataSrc.remove(objId), callback);
        }
    }

    public save(obj: T, callback?: (success: boolean) => void): void {
        const id = (obj as any).id;
        if ((id && this.accessRight.edit) || (!id && this.accessRight.create)) {
            this.subscribeAndReport(this.dataSrc.save(obj), callback);
        } else {
            // todo: throw access denied error here
        }
    }

}
