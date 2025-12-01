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

export interface Scale {
    id: number;
    name: string;
    reading: number;
}

export interface ScaleList {
    scales: Scale[];
}

export interface ScaleConfig {
    url: string;
}

