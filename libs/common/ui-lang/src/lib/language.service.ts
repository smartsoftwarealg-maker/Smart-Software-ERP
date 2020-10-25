import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {map, share, switchMap} from 'rxjs/operators';
import {Direction} from '@angular/cdk/bidi';
import {HttpClient} from '@angular/common/http';
import {
    dateToDmyStr,
    dateToYmdStr,
    dateStrToDmy,
    dateStrToYmd,
    isString,
    removeTimeForDateStr
} from "@ss/common/api-common";

function formatFullName(first: string, last: string) {
    return (first == null ? '' : first) + (last == null ? '' : (' ' + last));
}

function formatFullNameWeird(first: string, last: string) {
    return (last == null ? '' : last) + (first == null ? '' : (' ' + first));
}

function formatMediumName(first: string, last: string) {
    return (first == null || first.length < 1 ? '' : first.substring(0, 1)) + (last == null ? '' : (' ' + last));
}

export interface Language {
    code: string;
    dir: string;
    name: string;
    formatDate: (d: Date) => string;
    formatDateStr: (d: string) => string;
    formatFullName: (first: string, family: string) => string;
    formatMediumName: (first: string, family: string) => string;
    // todo: add support for datetime
}

export const SUPPORTED_LANGUAGES: Language[] = [
    {
        code: 'ar',
        dir: 'rtl',
        name: 'العربية',
        formatDate: dateToYmdStr,
        formatDateStr: dateStrToYmd,
        formatFullName: formatFullName,
        formatMediumName: formatMediumName
    },
    {
        code: 'en',
        dir: 'ltr',
        name: 'English',
        formatDate: dateToYmdStr,
        formatDateStr: dateStrToYmd,
        formatFullName: formatFullName,
        formatMediumName: formatMediumName
    },
    {
        code: 'fr',
        dir: 'ltr',
        name: 'Français',
        formatDate: dateToDmyStr,
        formatDateStr: dateStrToDmy,
        formatFullName: formatFullNameWeird,
        formatMediumName: formatMediumName
    }
];

export const DEFAULT_LANGUAGE: Language = SUPPORTED_LANGUAGES[2];

interface Source {
    uri: string;
    prefix: string;
    loaded: { [code: string]: boolean; };
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private static readonly LOCAL_STORAGE_KEY = 'localeCode';
    private static style = null;
    private readonly RTL_STYLE =
        '.locale-dir { direction: rtl; } ' +
        '.cdk-overlay-pane { direction: rtl !important; } ' +
        '.float-start { float: right; } ' +
        '.float-end { float: left; } ' +
        '.margin-start-0 { margin-right: 0 !important; } ' +
        '.margin-start-4 { margin-right: 4px !important; } ' +
        '.margin-start-8 { margin-right: 8px !important; } ' +
        '.margin-start-16 { margin-right: 16px !important; } ' +
        '.margin-start-24 { margin-right: 24px !important; } ' +
        '.margin-start-32 { margin-right: 32px !important; } ' +
        '.margin-start-40 { margin-right: 40px !important; } ' +
        '.margin-start-48 { margin-right: 48px !important; } ' +
        '.margin-end-0 { margin-left: 0 !important; } ' +
        '.margin-end-4 { margin-left: 4px !important; } ' +
        '.margin-end-8 { margin-left: 8px !important; } ' +
        '.margin-end-16 { margin-left: 16px !important; } ' +
        '.margin-end-24 { margin-left: 24px !important; } ' +
        '.margin-end-32 { margin-left: 32px !important; } ' +
        '.margin-end-40 { margin-left: 40px !important; } ' +
        '.margin-end-48 { margin-left: 48px !important; } ' +
        //
        '.padding-start-0 { padding-right: 0 !important; } ' +
        '.padding-start-4 { padding-right: 4px !important; } ' +
        '.padding-start-8 { padding-right: 8px !important; } ' +
        '.padding-start-16 { padding-right: 16px !important; } ' +
        '.padding-start-24 { padding-right: 24px !important; } ' +
        '.padding-start-32 { padding-right: 32px !important; } ' +
        '.padding-start-40 { padding-right: 40px !important; } ' +
        '.padding-start-48 { padding-right: 48px !important; } ' +
        '.padding-end-0 { padding-left: 0 !important; } ' +
        '.padding-end-4 { padding-left: 4px !important; } ' +
        '.padding-end-8 { padding-left: 8px !important; } ' +
        '.padding-end-16 { padding-left: 16px !important; } ' +
        '.padding-end-24 { padding-left: 24px !important; } ' +
        '.padding-end-32 { padding-left: 32px !important; } ' +
        '.padding-end-40 { padding-left: 40px !important; } ' +
        '.padding-end-48 { padding-left: 48px !important; } ' +
        //
        '.abs-start-0 { right: 0; }' +
        '.abs-end-0 { left: 0; }' +
        // right only, fixing mat shit
        '.mat-step-icon { margin-left: 12px !important; margin-right: 0 !important; } ' +
        '.mat-stepper-vertical-line::before { left: unset !important; right: 0 !important; } ' +
        '.mat-vertical-content-container { margin-right: 36px !important; margin-left: unset !important; } ' +
        '.mat-option { text-align: start !important; }';

    private readonly LTR_STYLE =
        '.locale-dir { direction: ltr; } ' +
        '.cdk-overlay-pane { direction: ltr !important;} ' +
        '.float-start { float: left; } ' +
        '.float-end { float: right; } ' +
        '.margin-start-0 { margin-left: 0 !important; } ' +
        '.margin-start-4 { margin-left: 4px !important; } ' +
        '.margin-start-8 { margin-left: 8px !important; } ' +
        '.margin-start-16 { margin-left: 16px !important; } ' +
        '.margin-start-24 { margin-left: 24px !important; } ' +
        '.margin-start-32 { margin-left: 32px !important; } ' +
        '.margin-start-40 { margin-left: 40px !important; } ' +
        '.margin-start-48 { margin-left: 48px !important; } ' +
        '.margin-end-0 { margin-right: 0 !important; } ' +
        '.margin-end-4 { margin-right: 4px !important; } ' +
        '.margin-end-8 { margin-right: 8px !important; } ' +
        '.margin-end-16 { margin-right: 16px !important; } ' +
        '.margin-end-24 { margin-right: 24px !important; } ' +
        '.margin-end-32 { margin-right: 32px !important; } ' +
        '.margin-end-40 { margin-right: 40px !important; } ' +
        '.margin-end-48 { margin-right: 48px !important; } ' +
        //
        '.padding-start-0 { padding-left: 0 !important; } ' +
        '.padding-start-4 { padding-left: 4px !important; } ' +
        '.padding-start-8 { padding-left: 8px !important; } ' +
        '.padding-start-16 { padding-left: 16px !important; } ' +
        '.padding-start-24 { padding-left: 24px !important; } ' +
        '.padding-start-32 { padding-left: 32px !important; } ' +
        '.padding-start-40 { padding-left: 40px !important; } ' +
        '.padding-start-48 { padding-left: 48px !important; } ' +
        '.padding-end-0 { padding-right: 0 !important; } ' +
        '.padding-end-4 { padding-right: 4px !important; } ' +
        '.padding-end-8 { padding-right: 8px !important; } ' +
        '.padding-end-16 { padding-right: 16px !important; } ' +
        '.padding-end-24 { padding-right: 24px !important; } ' +
        '.padding-end-32 { padding-right: 32px !important; } ' +
        '.padding-end-40 { padding-right: 40px !important; } ' +
        '.padding-end-48 { padding-right: 48px !important; } ' +
        //
        '.abs-start-0 { left: 0; }' +
        '.abs-end-0 { right: 0; }';

    public rtl = true;
    private currentLanguage: Language;
    private sources: Source[] = [];
    private data: { [code: string]: { [key: string]: string; }; } = {};
    private changeSubject = new Subject<string>();

    public get languageChange(): Observable<string> {
        return this.changeSubject;
    }

    public get dir(): Direction {
        return this.rtl ? 'rtl' : 'ltr';
    }

    constructor(private httpClient: HttpClient) {
    }

    public init(): Observable<void> {
        let code = localStorage.getItem(LanguageService.LOCAL_STORAGE_KEY);
        if (!code) {
            code = DEFAULT_LANGUAGE.code;
        }
        this.addStyleClass(code);
        return this.setLanguage(code);
    }

    private load(src: Source): Observable<boolean> {
        if (this.currentLanguage == null || src.loaded[this.currentLanguage.code]) {
            return of(false);
        }
        return this.httpClient.get(src.uri + this.currentLanguage.code + '.json')
            .pipe(
                share(),
                map((conf: { [key: string]: string; }) => {
                    src.loaded[this.currentLanguage.code] = true;
                    this.pushData(conf, src.prefix);
                    return true;
                })
            );
    }

    private loadMissing(): Observable<boolean[]> {
        return this.sources.length
            ? forkJoin(this.sources.map(src => this.load(src)))
            : of([]);
    }

    private pushData(segment: { [key: string]: string; }, prefix: string) {
        let lang = this.data[this.currentLanguage.code];
        if (lang == null) {
            lang = {};
            this.data[this.currentLanguage.code] = lang;
        }
        for (const key in segment) {
            if (segment.hasOwnProperty(key)) {
                lang[prefix + key] = segment[key];
            }
        }
        this.changeSubject.next(this.currentLanguage.code);
    }

    public addSource(uri: string, prefix: string): void {
        if (this.sources.filter(s => s.uri === uri).length === 0) {
            const src: Source = {uri, loaded: {}, prefix};
            this.sources.push(src);
            this.load(src).subscribe(
            );
        }
        // return this.load(src);
    }

    public setLanguage(code: string): Observable<void> {
        const L = SUPPORTED_LANGUAGES.filter(l => l.code === code)[0];
        if (!L) {
            throw new Error('Unknown language code "' + code + '"');
        }
        this.currentLanguage = L;
        localStorage.setItem(LanguageService.LOCAL_STORAGE_KEY, code);
        this.updateDirection(code);
        return this.loadMissing()
            .pipe(
                switchMap(() => {
                    this.changeSubject.next(code);
                    return of(null);
                }),
            );
    }

    public translateAll(keys: string[], param?: any) {
        return keys.map(k => this.translate(k, param));
    }

    public translate(key: string, param?: any): string {
        if (key == null || key === '') {
            return '';
        }
        const langData = this.data[this.currentLanguage.code];
        if (langData != null) {
            let val = langData[key];
            if (val != null) {
                if (param != null) {
                    for (const property in param) {
                        if (param.hasOwnProperty(property)) {
                            const propertyValue = param[property];
                            const propertyKey = '$' + property + '$';
                            val = val.replace(propertyKey, propertyValue);
                        }
                    }
                }
                return val;
            }
        }
        return key;
    }

    public formatDate(d: Date | string): string {
        if (d == null || this.currentLanguage == null) {
            return null;
        }
        if (d instanceof Date) {
            return this.currentLanguage.formatDate(d);
        }
        if (isString(d)) {
            return this.currentLanguage.formatDateStr(removeTimeForDateStr(d));
        }
        throw new Error('Can only format Date or string');
    }

    public formatFullName(first: string, last: string): string {
        return this.currentLanguage == null ? null : this.currentLanguage.formatFullName(first, last);
    }

    public formatMediumName(first: string, last: string): string {
        return this.currentLanguage == null ? null : this.currentLanguage.formatMediumName(first, last);
    }

    // privates

    private addStyleClass(code: string): void {
        if (LanguageService.style == null) {
            LanguageService.style = document.createElement('style');
            LanguageService.style.type = 'text/css';
            this.updateDirection(code);
            document.getElementsByTagName('head')[0].appendChild(LanguageService.style);
        }
    }

    private updateDirection(code: string): void {
        const a = SUPPORTED_LANGUAGES.filter(l => l.code === code);
        const dir = a.length !== 1 ? DEFAULT_LANGUAGE.dir : a[0].dir;
        if (dir === 'ltr') {
            LanguageService.style.innerHTML = this.LTR_STYLE;
            this.rtl = false;
        } else {
            LanguageService.style.innerHTML = this.RTL_STYLE;
            this.rtl = true;
        }
    }


}
