export interface DueChartConfig {
    id: string;
    pre: number;
    past: number;
    preDescription: string;
    pastDescription: string;
    chartDescription: string;
}

export interface PriorityChartConfig {
    id: string;
    label: string;
    data: ByPriority[];
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
    dueDate: Date,
    hours: number;
}
