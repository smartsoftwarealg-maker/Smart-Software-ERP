export const ATTENDANCE_MACHINE_URL = '/attendance/machines';
export const WORK_SHIFT_URL         = '/attendance/shifts';
export const ATTENDANCE_TYPE_URL    = '/attendance/attendance-types';
export const ATTENDANCE_PERSONS_URL = '/attendance/persons';
export const ATTENDANCE_SHIFTS_URL  = '/shifts';
export const SHIFT_TIMING_URL       = '/timings';

export interface AttendanceMachine {
    id: number;
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
