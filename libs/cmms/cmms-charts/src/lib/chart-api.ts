export interface DueChartConfig {
    id: string;
    pre: number;
    past: number;
    preDescription: string;
    pastDescription: string;
    chartDescription: string;
}

// export interface PriorityChartConfig {
//     id: string;
//     label: string;
//     data: ByPriority[];
// }

export interface SimpleBarsChartConfig {
    id: string;
    labels: string[];
    series: number[][];
    seriesNames?: string[];
}

export interface PastDue {
    total: number;
    pastDue: number;
}

export interface PendingSR {
    total: number;
    pending: number;
}

export interface ByPriority {
    priority: string,
    count: number;
}

export interface Gantt {
    description: string;
    startDate: Date,
    duration: number;
    completed: number;
}

export interface Mttr {
    mttr: number;
}

export interface Mtts {
    mtts: number;
}

export interface Pmp {
    pmp: number;
}
