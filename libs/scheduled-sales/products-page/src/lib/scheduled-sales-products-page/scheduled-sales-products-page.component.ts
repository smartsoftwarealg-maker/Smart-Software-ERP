import { Component, inject } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import { LanguageService } from '@ss/common/api-common';

type Product =  {
    name: string;
    image: string;
    description?: string;
}

@Component({
    selector: 'ss-scheduled-sales-products-page',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardFooter],
    templateUrl: './scheduled-sales-products-page.component.html',
    styleUrl: './scheduled-sales-products-page.component.scss',
})
export class ScheduledSalesProductsPageComponent {
    private languageSrv = inject(LanguageService);
    private info = new Map<string, string[]>([
            ['ar', ['']],
            ['en', ['Portland cement with limestone (NA 442/2013) CEM II B-L 32.5 N is a gray cement, for common and structural concretes, intended for the construction of your house.',
                `Portland limestone cement (NA 442/2013) CEM II A-L 42.5 N & R is a gray cement, containing :
                    * 80-94% ordinary clinker C3S ≥ 55%
                    * 6 to 20% pure limestone
                    * 0 to 5% gypsum as setting regulator.`,
                `Cement CEM I/42.5 N-LH/SR5 – NA 442/2013 is a Portland cement resulting from the grinding of clinker and calcium sulphate (gypsum or anhydrite) to regulate the setting, and possibly secondary constituents in small quantities less than 5%. The clinker content is at least 95%.`,
                `CEM II High Strength Portland Cement 52.5 N NA 442/2013 is a gray cement, containing 95% ordinary clinker C3S ≥ 60% and 5% gypsum as a setting regulator.`,
                `GICA PETROLEUM CLASS G (HSR) Cement from the GICA Group, certified to the standard of the American Petroleum Institute (API), is used in oil drilling sites.`]],
            ['fr', ['Ciment Portland au calcaire (NA 442/2013) CEM II B-L 32.5 N est un ciment gris, pour  bétons courants et structurels, destiné à la construction de votre maison.',
                `Ciment Portland au calcaire (NA 442/2013) CEM II A-L 42.5 N & R est un ciment gris, contenant :
                    * 80 à 94 % de clinker ordinaire  C3S ≥ 55 %
                    * 6 à 20 % de calcaire pur
                    * 0 à 5% de gypse en tant que régulateur de prise.`,
                `Le Ciment CEM I/42.5 N-LH/SR5 – NA 442/2013 est un Ciment Portland résultant du broyage de clinker et de sulfate de calcium (gypse ou anhydrite) pour régulariser la prise, et éventuellement de constituants secondaires en faible quantité inférieure à 5 %.  La teneur en clinker est au minimum de 95 %.`,
                `Ciment Portland à haute résistances CEM II 52.5 N  NA 442/2013 est un ciment gris, contenant 95% clinker  ordinaire  C3S ≥ 60%  et  5% de gypse en tant que régulateur de prise.`,
                `Le Ciment GICA PETROLEUM CLASS G (HSR) du Groupe GICA, certifié au standard de l’American Petroleum Institut (API), est utilisé dans les sites de forage pétrolier.`]]
        ]
    )

    products: Product[] = [
        {name: 'GICA BENIAN CEM II B-L 32.5 N', image: './assets/img/GICA-BENIAN.jpg', description: this.info.get(this.languageSrv.lang)[0]},
        {name: 'GICA BETON CEM II A-L 42.5 N & R', image: './assets/img/GICA-Beton.jpg', description: this.info.get(this.languageSrv.lang)[1]},
        {name: 'GICA INDJAZAT', image: './assets/img/GICA-INDJAZAT.jpg', description: this.info.get(this.languageSrv.lang)[2]},
        {name: 'GICA MOUDHAD', image: './assets/img/GICA-MOUDHAD.jpg', description: this.info.get(this.languageSrv.lang)[3]},
        {name: 'GICA PETROLEUM', image: './assets/img/GICA-PETROLEUM.png', description: this.info.get(this.languageSrv.lang)[4]}
    ];

}
