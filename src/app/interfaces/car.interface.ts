/**
 * Interfaces for cars data from API service
 */
export interface ICarsList {
    _id: string;
    name: string;
    location: Location;
    cars: Cars;
}

export interface Location {
    lat: string;
    long: string;
}

export interface Cars {
    location: string;
    vehicles: VehiclesItem[];
}

export interface VehiclesItem {
    _id: string;
    make: string;
    model: string;
    year_model: number;
    price: number;
    licensed: boolean;
    date_added: string;
}

/**
 * Interface for formatted cars data
 */
export interface ICarsListFormatted {
    _id: number;
    make: string;
    model: string;
    year_model: number;
    price: number;
    licensed: boolean;
    date_added: string;
    location: string;
}

/**
 * Interface for cart items
 */
export interface ICartItems {
    quantity: number;
    item: ICarsListFormatted;
}
