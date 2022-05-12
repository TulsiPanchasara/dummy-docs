export type docsType = {
    id: number;
    firstName: string;
    lastName: string;
    mobile: number;
    email: string;
    address: addressType;
    dob: string;
}

export type addressType = {
    line1: string;
    line2: string;
    city: string;
    country: string;
}

export type tableColumnType = {
    name: string;
    value: string;
    type: 'action' | 'field'
}