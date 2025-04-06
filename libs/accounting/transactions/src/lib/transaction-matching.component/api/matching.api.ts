import _default from 'chart.js/dist/plugins/plugin.tooltip';
import numbers = _default.defaults.animations.numbers;

export interface MBalanace {
    fileId: number;
    id: number;
    customerCode: string;
    description: string;
    matchKey?: string;
    balance: number;
    lineNumber: number;
}

export interface Match {
    fileId: number;
    srcId: number;
    withId: number;
    customer: string;
    srcLine: number;
    withLine: number;
}
