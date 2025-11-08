import { Country, Region, PaymentMethod } from './enum';

export const BillingTestData = {
    valid: {
        firstName: 'ANH',
        lastName: 'TRAN',
        companyName: 'Test Company',
        email: 'anh.tran@yahoo.com',
        phone: '1234567890',
        country: Country.HONG_KONG,
        address: '123 BLV Street',
        apartment: 'Apt 4B',
        town: 'Central',
        region: Region.HONG_KONG_ISLAND,
        postcode: '12345'
    },
    invalid: {
        empty: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: Country.HONG_KONG,
            address: '',
            town: '',
            region: Region.HONG_KONG_ISLAND,
            postcode: ''
        },
        invalidEmail: {
            firstName: 'Anh',
            lastName: 'Tran',
            email: 'invalid-email',
            phone: '1234567890',
            country: Country.HONG_KONG,
            address: '123 BVL Street',
            town: 'Central',
            region: Region.HONG_KONG_ISLAND,
            postcode: '12345'
        }
    }
};

export const PaymentTestData = {
    default: PaymentMethod.DIRECT_BANK_TRANSFER,
    alternatives: [
        PaymentMethod.CASH_ON_DELIVERY,
        PaymentMethod.PAYPAL_EXPRESS_CHECKOUT,
        PaymentMethod.CHECK_PAYMENTS
    ]
};