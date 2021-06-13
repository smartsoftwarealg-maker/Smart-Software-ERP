
export interface DisplayableService extends FullService {
    agentName: string;
    time: string;
    total: number;
}

export interface Room {
    id: number;
    number: string;
    roomType: number;
    bedCount: number;
    state: number;
    centerId: number;
    options: number[];
    //
    canBeReserved?: boolean; // used in FE only
}

export interface RoomType {
    id: number;
    description: string;
    childCapacity: number;
    adultCapacity: number;
}

export interface RoomState {
    id: number;
    description: string;
}

export interface RoomOption {
    id: number;
    description: string;
}

export interface BookingMethod {
    id: number;
    description: string;
    confirmed: boolean;
}

export interface FoodType {
    id: number;
    description: string;
}

export interface Food {
    id: number;
    reference: string;
    description2: string;
    foodType: number;   // fk
    price: number;
    vat: number;        // fk
    accountno: string;  // fk
    appCode: number;
}

export interface Booking {
    id: number;
    bookingType: number;
    color: number;
    dateIn: string | Date;
    dateOut: string | Date;
    customer: number;
    customerName?: string; // used for display only
    note?: string;
    bookingState: number;
    firstActionDate?: string | Date;
    secondActionDate?: string | Date;
    invoiceId?: number;
}

export interface BookingRoomGuest {
    id: number;
    bookingRoom: number;
    fullName: string;
}

export interface BookingRoom {
    id: number;
    bookingId: number;
    roomId: number;
    chargingCost: number;
    guests: BookingRoomGuest[];
}

export interface FullBooking {
    booking: Booking;
    bookingRooms: BookingRoom[];
    invoiceDate?: string;
    makeRoomsDirty?: boolean;
    paymentMode: number;
    disavowedServices?: number[];
}

export interface PaymentMethod {
    id: number;
    description: string;
}

export interface ChargingCost {
    id: number;
    roomType: number;
    description: string;
    costRate: number;
    toString: string; // frontend only
}

export interface BookingState {
    id: number;
    description: string;
}

export interface BookingMethod {
    id: number;
    description: string;
    confirmed: boolean;
}

export interface Service {
    id: number;
    agent: number;
    centerId: number;
    payMethod: number;
    time: string;
    invoiceId?: number;
    bookingId?: number;
}

export interface ServiceDetail {
    id: number;
    serviceId: number;
    articleId: number;
    qty: number;
    price: number;
    vat: number;
    discount: number;
}

export interface FullService {
    service: Service;
    details: ServiceDetail[];
    invoiceNumber?: number;
}

export interface Transaction {
    id: number;
    date: string;
    number: number;
    salesInfo: {
        payMode: number;
    };
}

export interface Account {
    id: number;
    accountno: string;
    description: string;
    descriptionAr?: string;
    depreciationAcc?: string;
    endowmentAcc: string;
    budget: boolean; // is budget account?
    analyzed: boolean; // is analyzed?
    customer: boolean; // Requires a customer account?
    management: boolean; // Requires management account?
    treasury: boolean; // Is treasury account?
}

export interface FoyerArticle {
    id: number;
    reference: string;
    description2: string;
    price: number;
    vat: number;        // fk
    accountno: string;  // fk
    appCode: number;
}
