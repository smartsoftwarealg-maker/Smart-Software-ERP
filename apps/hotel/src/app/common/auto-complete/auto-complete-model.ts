import {Observable} from 'rxjs';

/**
 * @param T: the object type
 * @param I: the id type of this object
 */
export abstract class AutoCompleteModel<T, I> {

    private id: I;
    private obj: T;

    public onSelection: (obj: T) => void = null;

    public abstract filter(filter: string): Observable<T[]>;

    public abstract filterArray(filter: string, objects: T[]): T[];

    public abstract getById(id: I): Observable<T>;

    public abstract idOf(obj: T): I;

    public abstract isId(obj: I | T): boolean;

    public abstract toString(obj: T): string;

    private isFeedback(id: I): boolean {
        return id === this.id;
    }

    public select(obj: T | I, consumer: (t: T) => void): void {
        if (obj == null) {
            if (!this.isFeedback(null)) {
                this.id = null;
                this.obj = null;
                consumer(null);
            }
        } else {
            if (this.isId(obj)) {
                const newId = obj as I;
                if (!this.isFeedback(newId)) {
                    this.id = newId;
                    this.getById(this.id)
                        .subscribe(r => {
                            this.obj = r;
                            consumer(this.obj);
                        });
                }
            } else {
                const newObj = (obj as T);
                if (!this.isFeedback(this.idOf(newObj))) {
                    this.obj = newObj;
                    this.id = this.idOf((obj as T));
                    consumer(this.obj);
                }
            }
        }
    }

    public selectAndFireEvent(obj: T): void {
        this.obj = (obj as T);
        this.id = this.idOf((obj as T));
        setTimeout(() => {
            if (this.onSelection) {
                this.onSelection(obj);
            }
        });
    }

    public getSelectedId(): I {
        return this.id;
    }

    public getSelectedObject(): T {
        return this.obj;
    }

}



