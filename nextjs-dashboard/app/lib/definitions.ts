export type Availability = {
    id: number;
    sunOpen: Date;
    sunClose: Date;
    monOpen: Date;
    monClose: Date;
    tuesOpen: Date;
    tuesClose: Date;
    wedOpen: Date;
    wedClose: Date;
    thurOpen: Date;
    thurClose: Date;
    friOpen: Date;
    friClose: Date;
    satOpen: Date;
    satClose: Date;
};

export type Business = {
    id: number;
    name: string;
    image: HTMLImageElement;
    description: string;
    representative: string;
    buildingNumber: string;
    street: string;
    unitNumber: string;
    city: string;
    state: string;
    zipCode: string;
}

export type Food = {
    id: number;
    name: string;
    image: HTMLImageElement;
    price: number;
    stock: number;
}

/* DIFF BETWEEN EMPLOYEE & CONTACT??? */
export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    status: 'active' | 'inactive';
}

export type Contact = {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    buildingNumber: string;
    street: string;
    unitNumber: string;
    city: string;
    state: string;
    zipCode: string;
}

export type CreditCard = {
    cardNumber: number;
    firstName: string;
    lastName: string;
    expirationDate: Date;
    securityCode: number;
    buildingNumber: string;
    street: string;
    unitNumber: string;
    city: string;
    state: string;
    zipCode: string;
}