export const FAULTS = '/faults';
export const LOCATIONS = '/locations';
export const PERSONS = '/persons';

export interface PersonLocation {
  id: number;
  parentId: number;
  locationId: number;
  locationDescription?: string;
}

export interface PersonFault {
  id: number;
  parentId: number;
  faultId: number;
  faultDescription?: string;
}
