src/
├── common/                 `Common configurations and base classes`
│   └── base.page.ts       `Base page class with common methods`
├── data/                  `Test data management`
│   ├── enum.ts           `TypeScript enums for test data`
│   ├── login.data.json   `Login credentials and user data`
│   └── test.data.ts      `Test data constants and generators`
├── helpers/               `Utility helper classes`
│   └── data.helper.ts    `Data manipulation helpers`
├── pages/                        
│   ├── cart.page.ts              `Cart page elements và protected basic actions`
│   ├── cart.action.page.ts       `Cart page complex actions (inherits from cart.page.ts)`
│   ├── home.page.ts              `Home page elements và protected basic actions`
│   ├── home.action.page.ts       `Home page complex actions (inherits from home.page.ts)`
│   ├── myaccount.page.ts         `My Account page elements và protected basic actions`
│   ├── myaccount.action.page.ts  `My Account page complex actions (inherits from myaccount.page.ts)`
│   ├── product.page.ts           `Product page elements và protected basic actions`
│   └── product.action.page.ts    `Product page complex actions (inherits from product.page.ts)`
├── tests/                 `Test case specifications`
│   ├── TC01_Verify_Successful_User_Registration.spec.ts
│   ├── TC02_Verify_User_Can_Update_Billing_Address.spec
├── utils/                 
│   └── data.loader.ts    
└── verifies/             `Assertion and verification classes`
    ├── base.expect.ts    
    ├── myaccount.expect.ts
    └── payment.expect.ts

### Prerequisites
-   Node.js 16+
-   Playwright
-   TypeScript

### Installation
    npm install
    npx playwright install
    
### Running Tests
*Run all tests*

    npx playwright test

*Run specific test file*

    npx playwright test tests/testcase01.spec.ts

*Run with UI mode*

    npx playwright test --ui

*Run with specific browser*

    npx playwright test --project=chromium
    
### Page Objects vs Action Pages
#### **Page Objects (`*.page.ts`)**

-   **Responsibility**: Element locators và protected basic interactions
    
-   **Access Level**: `protected` methods - chỉ được sử dụng bởi action pages
    
-   **Contains**: Selectors, getters, protected click/fill methods
    
-   **Purpose**: Low-level element operations, không được gọi trực tiếp từ tests
    
#### **Action Pages (`*.action.page.ts`)**

-   **Responsibility**: Complex user workflows và business logic
    
-   **Access Level**: `public` methods - được gọi trực tiếp từ test cases
    
-   **Contains**: Multi-step actions, user journeys, business flows
    
-   **Inheritance**: Kế thừa từ corresponding page objects để access protected methods
    
-   **Purpose**: High-level business operations cho test cases