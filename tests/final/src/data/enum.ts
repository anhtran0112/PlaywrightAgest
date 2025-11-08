export enum Country {
    HONG_KONG = 'Hong Kong',
    UNITED_STATES = 'United States',
    UNITED_KINGDOM = 'United Kingdom',
    VIETNAM = 'Vietnam',
    // Thêm các country khác nếu cần
}

export enum Region {
    HONG_KONG_ISLAND = 'Hong Kong Island',
    KOWLOON = 'Kowloon',
    NEW_TERRITORIES = 'New Territories',
    // Thêm các region khác nếu cần
}

export enum PaymentMethod {
    DIRECT_BANK_TRANSFER = 'Direct Bank Transfer',
    CHECK_PAYMENTS = 'Check Payments',
    CASH_ON_DELIVERY = 'Cash on Delivery',
    PAYPAL_EXPRESS_CHECKOUT = 'PayPal Express Checkout'
}

export enum BillingField {
    FIRST_NAME = 'First Name *',
    LAST_NAME = 'Last Name *',
    COMPANY_NAME = 'Company Name',
    EMAIL = 'Email Address *',
    PHONE = 'Phone *',
    COUNTRY = 'Country *',
    ADDRESS = 'Address *',
    APARTMENT = 'Apartment, suite, unit etc. (',
    TOWN = 'Town / District *',
    REGION = 'Region *',
    POSTCODE = 'Postcode / ZIP'
}