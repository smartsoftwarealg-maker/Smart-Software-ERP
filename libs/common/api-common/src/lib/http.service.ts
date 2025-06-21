import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpHeaders,
    HttpParams,
    HttpProgressEvent
} from '@angular/common/http';
import {filter, last, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoginInfo} from './models';
import {AppConfigService} from './app-config.service';

const AUTH_TOKEN = 'auth_token';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    public baseUrl: string;

    constructor(public appConfigSrv: AppConfigService, public httpClient: HttpClient) {
    }

     static getHeaders() {
        return new HttpHeaders({})
            .set('Authorization', this.getAuthToken() || '');
    }

    static getAuthToken(): string {
        return localStorage.getItem(AUTH_TOKEN);
    }

    static setAuthToken(token: string) {
        return localStorage.setItem(AUTH_TOKEN, token);
    }

    public init(company?: string): Observable<boolean> {
        if (this.baseUrl) {
            return of(false);
        }
        // return this.httpClient.get('./config/config.json')
        if (company) {
            this.selectCompany(company);
            return of(true);
        }
        return this.appConfigSrv.getConfig()
            .pipe(
                // removed share(), as it was a resource leak.
                map(conf => {
                    this.load(conf);
                    return true;
                })
            );
    }

    // noinspection JSUnusedGlobalSymbols
    public isReady(): boolean {
        return this.baseUrl != null;
    }

    // noinspection JSUnusedGlobalSymbols
    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public getData<T>(url: string, page: number, size: number, filterStr?: string, sortBy?: string, params?: HttpParams, timeout = 0): Observable<{ itemCount: number, body: T[] }> {
        if (this.baseUrl === undefined) {
            throw new Error('HTTP SERVICE NOT READY');
        }
        let httpParams = (params == null ? new HttpParams() : params)
            .set('page', `${page}-${size}`);
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL');
        }
        if (filterStr) {
            httpParams = httpParams.set('filter', filterStr);
        }
        if (sortBy) {
            httpParams = httpParams.set('sort', sortBy);
        }
        return this
            .httpClient
            .get<T[]>(this.baseUrl + url,
                {
                    headers: HttpService.getHeaders(),
                    observe: 'response', params: httpParams
                }
            ).pipe(map(ress => {
                const cr = ress.headers.get('Content-Range');
                const cnt = cr ? +cr.split('/')[1] : 0;
                return {itemCount: cnt, body: ress.body};
            }));
    }

    public getBlob(url: string, httpParams?: HttpParams, timeout = 0): Observable<Blob> {
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL');
        }
        return this
            .httpClient
            .get(this.baseUrl + url,
                {
                    headers: HttpService.getHeaders(),
                    observe: 'response',
                    responseType: 'blob',
                    params: httpParams
                }
            ).pipe(map(res => res.body));
    }

    public get<T>(url: string, httpParams?: HttpParams, timeout = 0): Observable<T> {
        if (this.baseUrl === undefined) {
            //    this.baseUrl = '';
            throw new Error('HTTP SERVICE NOT READY');
        }
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL: ' + this.baseUrl + url);
        }
        const fullURL = this.baseUrl + url;
        if (fullURL.endsWith('NaN')) {
            throw new Error('Invalid URI: ' + url);
        }
        return this
            .httpClient
            .get<T>(fullURL,
                {
                    headers: HttpService.getHeaders(),
                    observe: 'response',
                    params: httpParams
                }
            ).pipe(map(ress => ress.body));
    }

    public post(url: string, data?: any | null, timeout = 300_000): Observable<any> {
        if (this.baseUrl === undefined) {
            throw new Error('HTTP SERVICE NOT READY');
        }
        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                {headers: HttpService.getHeaders()});
    }

    public upload(url: string, data?: any | null): Observable<any> {
        if (this.baseUrl === undefined) {
            throw new Error('HTTP SERVICE NOT READY');
        }
        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                {
                    headers: HttpService.getHeaders(),
                    reportProgress: true,
                    observe: 'events'
                });
    }

    public postHTML(url: string, data?: any | null, timeout = 0): Observable<any> {
        if (this.baseUrl === undefined) {
            throw new Error('HTTP SERVICE NOT READY');
        }
        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                {responseType: 'text', headers: HttpService.getHeaders()});
    }
    public putHTML(url: string, data?: any | null, timeout = 0): Observable<any> {
        if (this.baseUrl === undefined) {
            throw new Error('HTTP SERVICE NOT READY');
        }
        return this
            .httpClient
            .put(this.baseUrl + url,
                data,
                {responseType: 'text', headers: HttpService.getHeaders()});
    }

    public put(url: string, data?: any | null): Observable<any> {
        if (this.baseUrl === undefined) {
            throw new Error('HTTP SERVICE NOT READY');
        }
        return this
            .httpClient
            .put(this.baseUrl + url,
                data,
                {headers: HttpService.getHeaders()});
    }

    // noinspection JSUnusedGlobalSymbols
    public removeById(url: string, id: number) {
        const slash = url.endsWith('/') ? '' : '/';
        return this.remove(url + slash + id);
    }


    public removePrams(url: string, params: HttpParams): Observable<any> {
        return this
            .httpClient
            .delete(this.baseUrl + url, {headers: HttpService.getHeaders(), params: params});
    }

    public remove(url: string, data?: any|null): Observable<any> {
        return this
            .httpClient
            .delete(this.baseUrl + url,
                {headers: HttpService.getHeaders(), body: data});
    }

    public doLogin(url: string, data: any | null): Observable<LoginInfo> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        });
        return this.httpClient.post<LoginInfo>(this.baseUrl + url, data, {headers: httpHeaders});
    }

    public anonymous(): Observable<LoginInfo> {
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<LoginInfo>(this.baseUrl + '/anonymous', {headers: httpHeaders});
    }


    // public doLogin2(url, data): Observable<{ jwt: string }> {
    //     const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     return this.httpClient.post<{ jwt: string }>(this.baseUrl + url, data, { headers: httpHeaders });
    // }

    // noinspection JSUnusedGlobalSymbols
    public postBlob(url: string, data?: any | null, timeout = 600000): Observable<ArrayBuffer> {
        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                {responseType: 'arraybuffer', headers: HttpService.getHeaders()}
            );
    }

    public putBlob(url: string, data?: any | null, timeout = 600000): Observable<ArrayBuffer> {
        return this
            .httpClient
            .put(this.baseUrl + url,
                data,
                {responseType: 'arraybuffer', headers: HttpService.getHeaders()}
            );
    }


    public uploadBlob(url: string, formName: string, blob: Blob): Observable<any> {
        const fd: FormData = new FormData();
        fd.append(formName, blob);
        return this
            .httpClient
            .post(this.baseUrl + url, fd, {
                reportProgress: true,
                headers: HttpService.getHeaders(),
                observe: 'events'
            })
            .pipe(
                filter((e: any) => (e as HttpProgressEvent) && (e as HttpProgressEvent).type === HttpEventType.UploadProgress),
                tap((e: HttpProgressEvent) => {
                    // todo: show some ui bullshit instead of this
                    console.log('upload ' + (e.loaded * 100 / e.total) + '%');
                }),
                last()
            );
    }

    // noinspection JSMethodCanBeStatic
    private replaceQMark(str: string, replacement: string): string {
        const l = str ? str.length : 0;
        for (let i = 0; i < l; i++) {
            if (str[i] === '?') {
                return str.substring(0, i) + replacement + str.substring(i + 1, l);
            }
        }
        return str;
    }

    private load(conf: any): void {
        const host = window.location.hostname;
        const port = window.location.port ? window.location.port : 80;
        const hostUrl = host + ':' + port;
        let ruleFound = false;
        const rules = conf.urlRules;
        if (rules) {
            const ruleCount = rules.length;
            for (let i = 0; i < ruleCount; i++) {
                rules[i].frontend = this.replaceQMark(rules[i].frontend, host);
                if (rules[i].frontend === hostUrl || rules[i].frontend === host) {
                    rules[i].backend = this.replaceQMark(rules[i].backend, host);
                    this.baseUrl = rules[i].backend;
                    ruleFound = true;
                    break;
                }
            }
        }
        // if no rule is set
        if (!ruleFound) {
            if (conf.defaultUrl != null) {
                this.baseUrl = conf.defaultUrl;
            } else {
                // old file format is still valid && supported
                this.baseUrl = conf.baseUrl; // backward compatibility shit (microsoft is shit)
            }
        }

        if (conf.protocol != null && !this.baseUrl.toLowerCase().startsWith('http')) {
            this.baseUrl = conf.protocol + this.baseUrl;
        }
    }

    // noinspection JSUnusedGlobalSymbols
    // noinspection JSMethodCanBeStatic
    public updateAuthToken(token: string): void {
        localStorage.setItem(AUTH_TOKEN, token);
    }

    public removeAuthToken(token: string): void {
        localStorage.setItem(AUTH_TOKEN, token);
    }

    // noinspection JSUnusedGlobalSymbols
    // noinspection JSMethodCanBeStatic
    public getAuthToken(): string {
        return HttpService.getAuthToken();
    }

    selectCompany(company: string) {
        if (company === 'SCH_SCHS') {
            this.baseUrl = 'https://client2.schs.dz';
        } else if (company === 'SCH_ECDE') {
            this.baseUrl = 'https://clientecde2.gica.dz';
        } else if (company === 'SCH_SG') {
            this.baseUrl = 'https://client2.sg.dz';
        } else if (company === 'SCH_SCAKE') {
            this.baseUrl = 'https://client2.scake.dz';
        } else {
            this.baseUrl = 'https://demo.smartsoftware-dz.com:4430';
            // this.baseUrl = 'http://localhost:8080'; // default to local development
        }
    }
}

