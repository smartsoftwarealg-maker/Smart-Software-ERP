import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';


export const slideToLeft =
    trigger('routeAnimation', [
        state('*', style({
            opacity: 1,
            position: 'relative',
            transform: 'translateX(0)',
            height: '100%',
            width: '100%'
        })),
        transition(':enter', [style({
            opacity: 0,
            position: 'fixed',
            height: '100%',
            width: '100%',
            transform: 'translateX(100%)'
        }), animate('0.7s  ease-in')]),
        transition(':leave', [animate('0.7s ease-out', style({
            position: 'fixed', opacity: 0, transform: 'translateX(-100%)'
        }))
        ])
    ]);


export const slideToRight =
    trigger('routeAnimation', [
        state('*', style({
            opacity: 1,
            position: 'relative',
            transform: 'translateX(0)',
            height: '100%',
            width: '100%'
        })),
        transition(':enter', [style({
            opacity: 0,
            position: 'fixed',
            height: '100%',
            width: '100%',
            transform: 'translateX(-100%)'
        }), animate('0.7s  ease-in')]),
        transition(':leave', [animate('0.7s ease-out', style({
            position: 'fixed', opacity: 0, transform: 'translateX(100%)'
        }))
        ])
    ]);


export const Rotate =
    trigger('rotateAnimation', [
        state('*', style({transform: 'rotate(0deg)'})),
        state('rotate', style({transform: 'rotate(360deg)'})),
        transition('* => rotate', animate('2s 6s  ease-in'))
    ]);

export const Larger =
    trigger('largerAnimation', [
        state('*', style({opacity: 0.1, transform: 'scale(0,0)'})),
        state('larger', style({opacity: 1, transform: 'scale(1,1)'})),
        transition('* => larger', animate('1s   ease-in'))
    ]);



