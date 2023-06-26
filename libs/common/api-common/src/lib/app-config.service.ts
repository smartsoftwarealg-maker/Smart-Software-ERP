import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private subject = new Subject<any>();
    private config: object = null;

    constructor(private httpClient: HttpClient) {
        this.httpClient.get('./config/config.json')
            .subscribe({
                next: config => {
                    this.config = config;
                    this.subject.next(config);
                    this.subject.complete();
                    this.subject = null; // idk why i delayed this. :\
                },
                error: err => {
                    this.config = null;
                    throw err;
                }
            });
    }

    public getConfig(): Observable<any> {
        if (this.config == null) {
            if (this.subject == null) {
                alert(
                    'ERROR, Config is null and subject is null.\n' +
                    'This should not have happend! The developer has screwed up\n' +
                    'Please contact the main suspect at muaaz.h.is@gmail.com'
                );
            }
            return this.subject.asObservable();
        }
        return of(this.config);
    }

}
