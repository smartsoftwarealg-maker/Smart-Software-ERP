import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'paymonth'
})
export class PaymonthPipe implements PipeTransform {

    transform(value: number): string {
        if (value) {
            const year = +(value / 100).toFixed(0);
            const day  = value % 100;
            const zero = day < 10? '0' : '';
            return `${zero}${day}/${year}`;
        }
        return '';
    }

}
