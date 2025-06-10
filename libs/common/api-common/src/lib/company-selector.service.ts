import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class CompanySelectorService {
    #DEFAULT_COMPANY = 'DEFAULT_COMPANY';
    #_multiCompany = false;
    #company: string | null = null;
    #homePage: string | null = null;
    #httpSrv = inject(HttpService);
    #homePageMap: Map<string, string> = new Map<string, string>([
        ['SCH_ECDE', 'https://ecde.gica.dz'],
        ['SCH_SCHS', 'https://www.schs.dz'],
        ['SCH_SCSG', 'https://www.sg.dz'],
        ['SCH_SCAEK', 'https://www.scaek.dz'],
        ['SCH_TEST', 'https://demo.smartsoftware-dz.com/'],
    ]);

    companyList = [
        'SCH_ECDE',
        'SCH_SCHS',
        'SCH_SCSG',
        'SCH_SCAEK',
        'SCH_TEST'
    ];

    missingBackend = signal(false);

    select(company: string) {
        localStorage.setItem(this.#DEFAULT_COMPANY, company);
        this.#company = company;
        this.#homePage = this.#homePageMap.get(company);
        this.spaceCompany = company;
        this.#httpSrv.selectCompany(company);
        this.missingBackend.set(this.#_multiCompany && !company);
        // this.#router.navigate(['/login']).then();
    }

    set company(c: string | null) {
        this.#company = c;
    }

    get company(): string | null {
        return this.#company;
    }

    set homePage(hPage: string) {
        this.#homePage = hPage;
    }

    get homePage() {
        return this.#homePage;
    }

    set spaceCompany(company: string) {
        this.#company = company;
        this.missingBackend.set(this.#_multiCompany && !company);
    }

    get spaceCompany() {
        return this.#company;
    }

    set multiCompany(multi: boolean) {
        this.#_multiCompany = multi;
        this.missingBackend.set(this.#_multiCompany && !this.#company);
    }

    get multiCompany() {
        return this.#_multiCompany;
    }

    clear() {
        this.#homePage = null;
        this.#company = null;
    }
}

