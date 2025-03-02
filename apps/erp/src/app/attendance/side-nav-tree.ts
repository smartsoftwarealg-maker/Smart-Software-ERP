import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ATTENDANCE_ABSENCE_MOTIVE_URL,
    ABS_ATTENDANCE_HOLIDAY_URL,
    ABS_ATTENDANCE_LOG_URL,
    ABS_ATTENDANCE_MACHINES_URL,
    ABS_ATTENDANCE_WORKSHIFTS_URL, ABS_MANUAL_SIGNATURE_URL,
    ABS_SHIFT_ASSIGNMENTS_URL
} from '../common';

export const attendanceNavTree: SideNavNode = {
    name: 'ATTENDANCE',
    icon: 'fa-solid fa-clipboard-user',
    children: [
        {
            name: 'ATT_MACHINES',
            icon: 'fa-solid fa-slot-machine',
            route: ABS_ATTENDANCE_MACHINES_URL,
            accessRights: 'AttendanceMachine'
        },
        {
            name: 'ATT_WORKSHIFTS',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_ATTENDANCE_WORKSHIFTS_URL,
            accessRights: 'WorkShift'
        },
        {
            name: 'ATT_HOLIDAYS',
            icon: 'fa-solid fa-lights-holiday',
            route: ABS_ATTENDANCE_HOLIDAY_URL,
            accessRights: 'Holiday'
        },
        {
            name: 'ATT_ABSENCE_MOTIVES',
            icon: 'fa-solid fa-lights-holiday',
            route: ABS_ATTENDANCE_ABSENCE_MOTIVE_URL,
            accessRights: 'AbsenceMotive'
        },
        {
            name: 'ATT_SHIFT_ASSIGNMENTS',
            icon: 'fa-solid fa-user-gear',
            route: ABS_SHIFT_ASSIGNMENTS_URL,
            accessRights: 'PersonShift'
        },
        {
            name: 'ATT_MANUAL_SIGNATURES',
            icon: 'fa-solid fa-clock',
            route: ABS_MANUAL_SIGNATURE_URL,
            accessRights: 'ATTSignature'
        },
        {
            name: 'ATT_ATTENDANCE_LOG',
            icon: 'fa-solid fa-user-gear',
            route: ABS_ATTENDANCE_LOG_URL,
            accessRights: 'Attendance'
        },
    ],
    accessRights: 'ATTENDANCE_APP'
};
