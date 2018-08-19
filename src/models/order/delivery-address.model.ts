

const Express = "express";
const Standard = "standard";

export const DeliveryOptions = {
    Express,
    Standard
};

export interface DeliveryAddress {
    city,
    country,
    line1, // street
    postal_code,
    state?,
}

