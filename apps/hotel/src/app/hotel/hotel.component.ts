import { Component } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { BasicShellComponent } from '../common/basic-shell/basic-shell.component';
import { LanguageService } from '@ss/common/api-common';
import { CanActivateService } from '../smart-lib/components/login/can-activte.service';
import { ReportViewComponent } from '../smart-lib/components/reports/report-view/report-view.component';

@Component({
    selector: 'app-hotel-main',
    templateUrl: './hotel.component.html',
    styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {

    menu: Menu[];

    constructor(public langSrv: LanguageService) {
        // todo: filter according to access rights
        this.menu = defaultMenu;
    }
}

interface SubModule extends Route {
    path: string;
    data: { title: string; image: string; entity: string, moduleName: string };
}

interface Menu extends Route {
    data: { title: string; entity: string };
    children: SubModule[];
}

const mainRoute: Route = {
    path: '',
    component: HotelComponent,
    canActivate: [ CanActivateService ]
};

const settingsRoute: SubModule = {
    path: 'settings',
    loadChildren: () => import('./options/options.module').then(m => m.OptionsModule),
    data: { title: 'HTL_SETTINGS', entity: null, image: 'far fa-sliders-h', moduleName: 'OptionsModule' }
};

const vatListRoute: SubModule = {
    path: 'vat',
    loadChildren: () => import('../common/vat/vat.module').then(m => m.VatModule),
    data: { title: 'HTL_VAT_LIST', entity: null, image: 'fas fa-balance-scale-left', moduleName: 'VatModule' }
};

const guestsRoute: SubModule = {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    data: { title: 'HTL_GUESTS', entity: null, image: 'fas fa-male', moduleName: 'ClientsModule' }
};

const costCenterRoute: SubModule = {
    path: 'costCenters',
    loadChildren: () => import('../common/cost-center/cost-center.module').then(m => m.CostCenterModule),
    data: { title: 'HTL_COST_CENTERS', entity: null, image: 'fas fa-code-branch', moduleName: 'CostCenterModule' }
};

const paymentsRoute: SubModule = {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentModule),
    data: { title: 'HTL_PAYMENTS', entity: null, image: 'fas fa-cash-register', moduleName: 'PaymentModule' }
};

const reportsRoute: SubModule = {
    path: 'reports',
    component: ReportViewComponent,
    data: { title: 'HTL_REPORTS', entity: null, image: 'fas fa-chart-pie', moduleName: 'ReportViewComponent' }
};

const roomsRoute: SubModule = {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule),
    data: { title: 'HTL_ROOMS', entity: null, image: 'fas fa-bed', moduleName: 'RoomsModule' }
};

const roomTypesRoute: SubModule = {
    path: 'roomTypes',
    loadChildren: () => import('./room-types/room-types.module').then(m => m.RoomTypesModule),
    data: { title: 'HTL_ROOM_TYPES', entity: null, image: 'fas fa-cubes', moduleName: 'RoomTypesModule' }
};

const roomOptionsRoute: SubModule = {
    path: 'roomOptions',
    loadChildren: () => import('./room-options/room-options.module').then(m => m.RoomOptionsModule),
    data: { title: 'HTL_ROOM_OPTIONS', entity: null, image: 'fas fa-stars', moduleName: 'RoomOptionsModule' }
};

const bookingMethodsRoute: SubModule = {
    path: 'bookingMethods',
    loadChildren: () => import('./booking-methods/booking-methods.module').then(m => m.BookingMethodsModule),
    data: { title: 'HTL_BOOKING_METHODS', entity: null, image: 'fas fa-list-ol', moduleName: 'BookingMethodsModule' }
};

const bookingCostsRoute: SubModule = {
    path: 'bookingCosts',
    loadChildren: () => import('./booking-costs/booking-costs.module').then(m => m.BookingCostsModule),
    data: { title: 'HTL_BOOKING_COSTS', entity: null, image: 'far fa-money-bill-wave', moduleName: 'BookingCostsModule' }
};

const bookingsRoute: SubModule = {
    path: 'bookings',
    loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule),
    data: { title: 'HTL_BOOKINGS', entity: null, image: 'fas fa-hotel', moduleName: 'BookingModule' }
};

const restaurantRoute: SubModule = {
    path: 'restaurant',
    loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
    data: { title: 'HTL_RESTAURANT', entity: null, image: 'fas fa-utensils-alt', moduleName: 'RestaurantModule' }
};

const foodRoute: SubModule = {
    path: 'food',
    loadChildren: () => import('./food/food.module').then(m => m.FoodModule),
    data: { title: 'HTL_FOOD_LIST', entity: null, image: 'fas fa-turkey', moduleName: 'FoodModule' }
};

const foodCategoriesRoute: SubModule = {
    path: 'foodCategories',
    loadChildren: () => import('./food-categories/food-categories.module').then(m => m.FoodCategoriesModule),
    data: { title: 'HTL_FOOD_CATEGORIES', entity: null, image: 'fas fa-burger-soda', moduleName: 'FoodCategoriesModule' }
};

const foyerRoute: SubModule = {
    path: 'foyer',
    loadChildren: () => import('./foyer/foyer.module').then(m => m.FoyerModule),
    data: { title: 'HTL_FOYER', entity: null, image: 'fas fa-mug-hot', moduleName: 'FoyerModule' }
};

const foyerArticlesRoute: SubModule = {
    path: 'foyerArticles',
    loadChildren: () => import('./foyer-articles/foyer-articles.module').then(m => m.FoyerArticlesModule),
    data: { title: 'HTL_FOYER_ARTICLES', entity: null, image: 'fas fa-box-fragile', moduleName: 'FoyerArticlesModule' }
};

const gymRoute: SubModule = {
    path: 'gym',
    loadChildren: () => import('./gym/gym.module').then(m => m.GymModule),
    data: { title: 'HTL_GYM', entity: null, image: 'fas fa-dumbbell', moduleName: 'GymModule' }
};

export const defaultMenu: Menu[] = [
    {
        data: { title: 'HTL_MANAGE_HOTEL', entity: null },
        children: [settingsRoute, vatListRoute, costCenterRoute, guestsRoute, paymentsRoute, reportsRoute]
    },
    {
        data: { title: 'HTL_MANAGE_ROOMS', entity: null },
        children: [roomsRoute, roomTypesRoute, roomOptionsRoute]
    },
    {
        data: { title: 'HTL_MANAGE_BOOKING', entity: null },
        children: [bookingsRoute, bookingCostsRoute, bookingMethodsRoute]
    },
    {
        data: { title: 'HTL_MANAGE_RESTAURANT', entity: null },
        children: [restaurantRoute, foodRoute, foodCategoriesRoute]
    },
    {
        data: { title: 'HTL_MANAGE_FOYER', entity: null },
        children: [foyerRoute, foyerArticlesRoute]
    },
    {
        data: { title: 'HTL_MANAGE_GYM', entity: null },
        children: [gymRoute]
    }
];

export const routes: Routes = [
    {
        path: '',
        component: BasicShellComponent,
        children: [
            mainRoute,
            settingsRoute,
            vatListRoute,
            costCenterRoute,
            guestsRoute,
            paymentsRoute,
            reportsRoute,
            roomTypesRoute,
            roomOptionsRoute,
            roomsRoute,
            bookingMethodsRoute,
            bookingCostsRoute,
            bookingsRoute,
            restaurantRoute,
            foodRoute,
            foodCategoriesRoute,
            foyerRoute,
            foyerArticlesRoute,
            gymRoute,
            { path: '**', redirectTo: '', pathMatch: 'full', data: null }
        ],
    },
    { path: '**', redirectTo: '', pathMatch: 'full', data: null }
];
