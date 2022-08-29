export interface InputSocial {
    social: string,
    url: string
}
  
export interface InputData {
    firstName: string,
    middleName: string,
    lastName: string,
    social: InputSocial[]
}

export interface PeriodicElement {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dateTimeCreation: string[];
    lastChange: string[];
    communication: InputSocial[];
}