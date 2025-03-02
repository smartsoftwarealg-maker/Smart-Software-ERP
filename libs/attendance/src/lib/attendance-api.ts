import {Lookup} from '@ss/common/api-lookup';

export const HOLIDAY_REQUEST_URL = '/payroll/holiday-requests';
export const ATTENDANCE_MACHINE_URL = '/attendance/machines';
export const WORK_SHIFT_URL = '/attendance/shifts';
export const HOLIDAY_URL = '/attendance/holidays';
export const SIGNATURE_URL = '/attendance/manual-signatures';
export const ATTENDANCE_TYPE_URL = '/attendance/attendance-types';
export const ATTENDANCE_PERSONS_URL = '/attendance/persons';
export const ATTENDANCE_SHIFTS_URL = '/shifts';
export const SHIFT_TIMING_URL = '/timings';
export const ATT_ATTENDANCE = '/attendance/attendance';
export const ABSENCE_MOTIVE_URL = '/lookups/absence_motives';
export const TYPES: Lookup[] = [
    {id: 1, description: 'ATT_ATTENDANCE'},
    {id: 2, description: 'ATT_PRESENCE'},
    {id: 3, description: 'ATT_ABSENCE'},
    {id: 4, description: 'ATT_LATENESS'},
    {id: 5, description: 'ATT_SHIFT'},
];


export interface AttendanceMachine {
    id: number;
    centerId: number,
    ipAddress: string;
    port: string;
    description: string;
}

export interface AttendanceType {
    id: number;
    description: String,
    descriptionAr?: string;
    letter?: string;
    color: number;
    field?: string;
}

export interface Attendance {
    id: number;
    centerId: number;
    parentId: number;
    dateTime?: Date;
    attendanceType?: number;
    manual: boolean;
    updater?: number;
}

export interface PersonShift {
    id: number;
    parentId: number;
    date: Date,
    shift: number;
    shiftDescription?: string;
    service?: number;
    firstName?: string;
    lastName?: string;
}

export interface ATTReport {
    id: number;
    firstName?: string;
    lastName?: string;
    post?: string;
    attendance: string[][],
    colors: number[];
    weekends: boolean[];
    hexColors?: string[];
}

export interface Timing {
    id: number;
    parentId: number;
    from: Date;
    to: Date;
    breakFrom: Date;
    breakTo: Date;
    date?: Date;
}

export interface WorkShift {
    id: number;
    description: String,
    startDate: Date,
    graceTime: number;
    period: number;
}

export interface Holiday {
    id: number;
    date: Date;
    description?: string;
}

export interface ATTSignature {
    id: number;
    centerId: number;
    personId: number;
    dateTime: Date;
    attendanceType?: number;
    manually: boolean;
    updater?: number;
    updaterName?: string;
    firstName?: string;
    lastName?: string;
    typeDescription?: string;
}
