export interface WeightCapture {
    id: number;
    tare: number;
    tareId: number;
    tareTime: Date;
    brut: number;
    brutId: number;
    brutTime: Date;
    tareUserDescription? : string;
    brutUserDescription? : string;
}

export interface TruckStatus {
    id: number;
    type: 'tare'|'brut';
}

export interface TruckScale {
    reading: number;
}

export interface ScaleConfig {
    apiKey: string;
    server: string;
}

