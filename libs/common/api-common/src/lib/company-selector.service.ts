import { inject, Injectable } from '@angular/core';
import { HttpService, LoginService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class CompanySelectorService {
    #spaceCompany: string|null = null;
    #_multiCompany = false;
    #company: string|null = null;
    #homePage: string|null = null;
    #httpSrv = inject(HttpService);
    #homePageMap: Map<string, string> = new Map<string, string>([
        ['SCH_ECDE', 'https://ecde.gica.dz'],
        ['SCH_SCHS', 'https://www.schs.dz']
    ]);

    companyList = [
        'SCH_ECDE',
        'SCH_SCHS',
        'SCH_SCSG',
        'SCH_SCAEK',
    ];


    select(company: string) {
        this.#company = company;
        this.#homePage = this.#homePageMap.get(company);
        this.spaceCompany = company;
        this.#httpSrv.selectCompany(company);
        // this.#router.navigate(['/login']).then();
    }

    set company(c: string|null) {
        this.#company = c;
    }

    get company(): string|null {
        return this.#company;
    }

    set homePage(hPage: string) {
        this.#homePage = hPage;
    }
    get homePage() {
        return this.#homePage;
    }

    set spaceCompany(company: string) {
        this.#spaceCompany = company;
    }
    get spaceCompany() {
        return this.#spaceCompany;
    }

    set multiCompany(multi: boolean) {
        this.#_multiCompany = multi;
    }

    get multiCompany() {
        return this.#_multiCompany;
    }

    clear() {
        this.#homePage = null;
        this.#spaceCompany = null;
    }
}

