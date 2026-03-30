import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { F0910 } from '../services/balance-tables.api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PayModeService } from '@ss/common/api-lookup';
import { SupplierService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';

import { AccFileService } from '@ss/accounting/accounting-api';
import { TranslateDirective } from '@ss/common/ui-lang';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { F0910Service } from '../services/f09-10-service';
import { of } from 'rxjs';

@Component({
    selector: 'ss-f12-detail',
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MaterialModule,
    ],
    templateUrl: './f09-10-detail.component.html',
    styleUrl: './f09-10-detail.component.scss',
})
export class F0910DetailComponent extends BaseEntityDetailComponent<F0910> {
    #router = inject(Router);
    #accFileSrv = inject(AccFileService);
    #payModeSrv: PayModeService = inject(PayModeService);
    #supplierSrv: SupplierService = inject(SupplierService);

    payModeLookup = new DefaultAutoCompleteModel(this.#payModeSrv);
    supplierLookup = new DefaultAutoCompleteModel(
        this.#supplierSrv,
        'id',
        'denomination',
    );
    loginSrv = inject(LoginService);

    constructor(
        public override entitySrv: F0910Service,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ACC_F9_F10',
        );
        this.entitySrv.setParentId(this.#accFileSrv.accFile?.id);
    }

    public override setupForm(e: F0910): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id || 0],
            p1: [e.p1],
            p2: [e.p2],
            p3: [e.p3],
            p4: [e.p4],
            p5: [e.p5],
            p6: [e.p6],
            p7: [e.p7],
            p8: [e.p8],
            p9: [e.p9],
            p10: [e.p10],
            p11: [e.p11],
            p12: [e.p12],
            p13: [e.p13],
            p14: [e.p14],
            p15: [e.p15],
            p16: [e.p16],
            p17: [e.p17],
            p18: [e.p18],
            p19: [e.p19],
            p20: [e.p20],
            p21: [e.p21],
            p22: [e.p22],
            p23: [e.p23],
            p24: [e.p24],
            p25: [e.p25],
            p26: [e.p26],
            p27: [e.p27],
            p28: [e.p28],
            p29: [e.p29],
            p30: [e.p30],
            p31: [e.p31],
            p32: [e.p32],
            p33: [e.p33],
            p34: [e.p34],
            p35: [e.p35],
            p36: [e.p36],
            p37: [e.p37],
            p38: [e.p38],
        });
    }

    public labels = [
        'Charges des immeubles non affectés directement à l’exploitation',
        'Quote–part des cadeaux publicitaires non déductibles',
        'Quote-part du sponsoring et parrainage non déductibles',
        'Frais de réception non déductibles',
        'Cotisations et dons non déductibles',
        'Impôts et taxes non déductibles',
        'Provisions non déductibles',
        'Amortissements non déductibles',
        'Quote-part des frais de recherche développement non déductibles',
        'Amortissements non déductibles liés aux opérations de crédit bail (Preneur) (cf.art 27 de LFC 2010)',
        'Loyers hors produits financiers (bailleur) (cf.art 27 de LFC 2010)',
        'Impôt exigible sur le résultat',
        'Impôt différé (variation)',
        'Pertes de valeurs non déductibles',
        'Amendes et pénalités',
        'Autres réintégrations (*)',
        'Plus values sur cession d’éléments d’actif immobilisés (cf.art 173 du CIDTA)',
        'Les produits et les plus valus de cession des actions et titre assimilés ainsi que ceux des actions ou part d’OPCVM cotées en bourse',
        "Les revenus provenant de la distribution des bénéfices ayant été soumis à l'impôt sur les bénéfices des sociétés ou expressément exonérés (cf.art 147 bis du CIDTA)",
        'Amortissements liés aux opérations de crédit bail (Bailleur) (cf.art 27 de LFC 2010)',
        'Loyers hors charges financières (Preneur) (cf.art 27 de LFC 2010)',
        'Complément d’amortissements',
        'Autres déductions (*)',
        'Déficit de l’année N-1',
        'Déficit de l’année N-2',
        'Déficit de l’année N-3',
        'Déficit de l’année N-4',
        'Report à nouveau de l’exercice N-1 (à détailler)',
        'Résultat de l’exercice N-1',
        'Prélèvements sur réserves (à détailler)',
        'Réserves (à détailler)',
        'Augmentation du capital',
        'Dividendes',
        'Report à nouveau (à détailler)',
        'P35',
        'P36',
        'P37',
        'P38',
    ];

    override ngOnInit() {
        if (!this.#accFileSrv.accFile?.id) {
            this.#router.navigate(['../'], { relativeTo: this.route }).then();
        } else {
            super.ngOnInit();
        }
    }

    override getRouteParam() {
        return of({ id: this.loginSrv.appCtx.accFile });
    }
}
