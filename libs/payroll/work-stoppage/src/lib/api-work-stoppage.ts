export const WORK_ACCIDENT_URL = '/accidents';
export const ABSENCES_URL = '/absences';

export interface Accident {
  id: number;
  centerId: number;
  employee: number;
  parentId: number;
  date?: Date;
  duration: number;
  dateBack?: Date;
  motive?: number;
  pickDate?: Date;
  vacType?: number;
  payMonth?: number;
  salary?: number;
  certificationNumber?: string;
  certificationRef?: string;
  physician?: number;
  specialty?: number;
  firstName?: string;
  lastName?: string;
  motiveDescription?: string;
  typeDescription?: string;
  physicianDescription?: string;
  specialtyDescription?: string;
}
