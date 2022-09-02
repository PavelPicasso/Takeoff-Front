export interface InputSocialNetwork {
    type: string,
    value: string
}

export interface Contact {
    id?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    createdAt?: string[];
    updatedAt?: string[];
    communication?: InputSocialNetwork[];
}