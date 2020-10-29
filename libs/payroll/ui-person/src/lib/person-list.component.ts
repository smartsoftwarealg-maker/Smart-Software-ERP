import {Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {Person as IPerson, PersonService} from '@ss/payroll/api-person';
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {LookupsService} from "@ss/common/api-lookup";
import {LanguageService} from "@ss/common/ui-lang";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";

interface Lookup {
    id: number;
    description: string;
}

// frontend only
interface Person extends IPerson {
    fullName: string;
    photoUrl?: string;
    photoSafeUrl?: SafeUrl | string;
}

@Component({
    selector: 'ss-person-list',
    styleUrls: ['./person-list.component.scss'],
    templateUrl: './person-list.component.html'
})
export class PersonListComponent extends BaseEntityListComponent<IPerson> {

    public displayedColumns = [
        'photo',
        'id',
        'fullname',
        'birth',
        'address',
        'wilaya',
        'maritalStatus',
        'nationality',
        'mservice'
    ];

    maritalStatus: { [id: number]: string; };
    nationalities: { [id: number]: string; };
    wilayas: { [id: number]: string; };
    militaryServiceStates: { [id: number]: string; };

    constructor(
        public personSrv: PersonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public domSanitizer: DomSanitizer) {
        super(personSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_EMPLOYEES_LIST');
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getMaritalStatuses()
            .pipe(
                tap(x => {
                    this.maritalStatus = this.onLookupLoaded(x);
                }),

                switchMap(() => this.lookupsSrv.getNationalities()),
                tap(x => {
                    this.nationalities = this.onLookupLoaded(x);
                }),

                switchMap(() => this.lookupsSrv.getWilaya()),
                tap(x => {
                    this.wilayas = this.onLookupLoaded(x);
                }),

                switchMap(() => this.lookupsSrv.getMilitaryServiceStates()),
                tap(x => {
                    this.militaryServiceStates = this.onLookupLoaded(x);
                }),
            );
    }

    onLookupLoaded(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public processLoadedData(data: Person[]): Person[] {
        return data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.birthInfo.birthDate = this.langSrv.formatDate(p.birthInfo.birthDate);
            p.retirementDate = this.langSrv.formatDate(p.birthInfo.birthDate);
            p.fullName = this.langSrv.formatFullName(p.birthInfo.firstName, p.birthInfo.lastName);
            p.photoUrl = 'loading';
            this.personSrv.loadPhoto(p.id)
                .subscribe(
                    img => {
                        if (img != null && img.size > 0) {
                            p.photoUrl = URL.createObjectURL(img);
                            p.photoSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(p.photoUrl);
                        } else {
                            p.photoUrl = null;
                            p.photoSafeUrl = '/assets/payroll-images/photo-placeholder-128.png';
                        }
                    },
                    err => {
                        if (err.status !== 404) {
                            throw err;
                        }
                    }

                );
            return p;
        });
    }

    public releaseResources(): void {
        if (this.data != null) {
            this.data
                .filter((a: Person) => a != null && a.photoUrl && a.photoUrl !== 'loading')
                .forEach((a: Person) => URL.revokeObjectURL(a.photoUrl));
        }
    }

}
