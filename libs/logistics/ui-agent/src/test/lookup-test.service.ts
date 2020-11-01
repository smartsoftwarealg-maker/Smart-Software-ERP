import {Injectable} from '@angular/core';
import {
    Activity,
    AgentType,
    City,
    CompanyType,
    Country, Currency,
    LookupsCacheService,
    LookupsService,
    PayMode, Price
} from "@ss/common/api-lookup";
import {Observable, of} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class LookupTestService extends LookupsService {

    constructor(protected lookupCacheService: LookupsCacheService) {
        super(lookupCacheService);
    }


    getPayModes(): Observable<PayMode[]> {
        return of([
            {
                "id": 3,
                "description": "A TERME"
            },
            {
                "id": 2,
                "description": "Cheque"
            },
            {
                "id": 6,
                "description": "Compensation"
            },
            {
                "id": 7,
                "description": "CREDOC"
            },
            {
                "id": 1,
                "description": "Espece"
            },
            {
                "id": 5,
                "description": "Partielle"
            },
            {
                "id": 8,
                "description": "Traite"
            },
            {
                "id": 4,
                "description": "Virement Bancaire"
            }
        ]);
    }

    getActivities(): Observable<Activity[]> {
        return of(
            [
                {
                    "id": 1,
                    description: "activity 01"
                },
                {
                    "id": 2,
                    description: "activity 02"
                },
                {
                    "id": 3,
                    description: "activity 03"
                },
                {
                    "id": 4,
                    description: "activity 04"
                },
                {
                    "id": 5,
                    description: "activity 05"
                },
            ]);
    }

    getAgentTypes(): Observable<AgentType[]> {
        return of([
            {
                "id": 1,
                "description": "Client/Founisseur"
            },
            {
                "id": 0,
                "description": "Clients"
            },
            {
                "id": 2,
                "description": "Fournisseur"
            },
            {
                "id": 4,
                "description": "Tiers intene"
            },
            {
                "id": 3,
                "description": "Unite"
            }
        ]);
    }

    getCompanyTypes(): Observable<CompanyType[]> {
        return of(
            [
                {
                    "id": 30,
                    "description": " POSTE "
                },
                {
                    "id": 50,
                    "description": "ACCESSOIRES AUTO "
                },
                {
                    "id": 48,
                    "description": "AGENCE DE COMMUNICATION "
                },
                {
                    "id": 46,
                    "description": "AGENCEMENT  ET VENTE TOUT TYPE DE PRESENTOIRES"
                },
                {
                    "id": 6,
                    "description": "AGREGATS"
                },
                {
                    "id": 10,
                    "description": "ALIMENTAIRE"
                },
                {
                    "id": 51,
                    "description": "ASSURANCE AUTOMOBILE "
                },
                {
                    "id": 1,
                    "description": "BRIQUETERIES"
                },
                {
                    "id": 21,
                    "description": "Carrelage  "
                },
                {
                    "id": 52,
                    "description": "CENTRE NATIONALE DU REGISTRE DE COMMERCE "
                },
                {
                    "id": 9,
                    "description": "CERAMIQUES"
                },
                {
                    "id": 42,
                    "description": "CHAUD ET FROID"
                },
                {
                    "id": 3,
                    "description": "CIMENTERIES"
                },
                {
                    "id": 44,
                    "description": "CONFECTION DE CACHET ET GRIFFE"
                },
                {
                    "id": 20,
                    "description": "CONSTRUCTION BARRAGE "
                },
                {
                    "id": 34,
                    "description": "CONSULTATION ET TRADUCTION "
                },
                {
                    "id": 26,
                    "description": "CONTROLE ET REPARATION  D''AUTOMOBILE "
                },
                {
                    "id": 15,
                    "description": "ELECTRICITE "
                },
                {
                    "id": 36,
                    "description": "ELECTROMENAGER "
                },
                {
                    "id": 47,
                    "description": "ETUDE ET REALISATION  "
                },
                {
                    "id": 11,
                    "description": "EXPORT"
                },
                {
                    "id": 19,
                    "description": "FOURNITURE INDUSTRIELLE"
                },
                {
                    "id": 35,
                    "description": "GARDIENNAGE SURVEILLANCE PROTECTION "
                },
                {
                    "id": 39,
                    "description": "HABILLEMENT "
                },
                {
                    "id": 28,
                    "description": "HUISSIER "
                },
                {
                    "id": 13,
                    "description": "INDUSTRIE MECANIQUE"
                },
                {
                    "id": 8,
                    "description": "INDUSTRIE TEXTILE"
                },
                {
                    "id": 37,
                    "description": "INFORMATIQUE ELECTRONIQUE "
                },
                {
                    "id": 32,
                    "description": "INSTALATION  ET REPARATION "
                },
                {
                    "id": 43,
                    "description": "MATERIEL INFORMATIQUE"
                },
                {
                    "id": 54,
                    "description": "MENUISERIE  ALUMINIUM"
                },
                {
                    "id": 22,
                    "description": "MOTEUR ELECTRIQUE "
                },
                {
                    "id": 23,
                    "description": "OUTILLAGE"
                },
                {
                    "id": 17,
                    "description": "PAPETTERIE"
                },
                {
                    "id": 2,
                    "description": "PARTICULIER"
                },
                {
                    "id": 27,
                    "description": "PATISSERIE "
                },
                {
                    "id": 5,
                    "description": "PETROCHIMIE"
                },
                {
                    "id": 40,
                    "description": "PIECES DETACHEES "
                },
                {
                    "id": 25,
                    "description": "PRESTATION"
                },
                {
                    "id": 41,
                    "description": "PRODUITS  D'ENTRETIENTS "
                },
                {
                    "id": 31,
                    "description": "PRODUITS PATISSERIE"
                },
                {
                    "id": 45,
                    "description": "QUINCAILLERIE DROGUERIE "
                },
                {
                    "id": 29,
                    "description": "RESTAURANT"
                },
                {
                    "id": 16,
                    "description": "Revendeur "
                },
                {
                    "id": 7,
                    "description": "REVENDEUR FLEXIBLE"
                },
                {
                    "id": 12,
                    "description": "REVENDEUR TRANSMISSION "
                },
                {
                    "id": 4,
                    "description": "SIDERURGIES"
                },
                {
                    "id": 49,
                    "description": "STUDIO PHOTO "
                },
                {
                    "id": 18,
                    "description": "TRANSMISSION "
                }
            ]
        );
    }

    getCities(): Observable<City[]> {
        return of([
            {
                "id": 1,
                "description": "TIZI-OUZOU"
            },
            {
                "id": 2,
                "description": "city 02"
            },
            {
                "id": 3,
                "description": "city 03"
            },
            {
                "id": 4,
                "description": "city 04"
            },
            {
                "id": 5,
                "description": "city 05"
            }
        ]);
    }

    getCountries(): Observable<Country[]> {
        return of([
            {
                "id": 1,
                "description": "country 01",
            },
            {
                "id": 2,
                "description": "country 02",
            },
            {
                "id": 3,
                "description": "country 03",
            },
            {
                "id": 4,
                "description": "country 04"
            },
        ])
    }

    getCurrencies(): Observable<Currency[]> {
        return of([
            {
                "id": 1,
                "description": "currency 01",
            },
            {
                "id": 2,
                "description": "currency 02",
            },
            {
                "id": 3,
                "description": "currency 03",
            },
            {
                "id": 4,
                "description": "currency 04"
            },
            {
                "id": 5,
                "description": "currency 05"
            },
        ])
    }

    getPrices(): Observable<Price[]> {
        return of([
            {
                "id": 1,
                "description": "price 01",
            },
            {
                "id": 2,
                "description": "price 02",
            },
            {
                "id": 3,
                "description": "price 03",
            },
            {
                "id": 4,
                "description": "price 04"
            },
            {
                "id": 5,
                "description": "price 05"
            },
            {
                "id": 6,
                "description": "price 05"
            }
        ])
    }
}
