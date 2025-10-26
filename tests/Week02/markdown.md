|demo.testarchitect.com
├── tests/                    
│   ├── pages/                 # Page Object Models (chỉ chứa locator, method, không verify)
│   │   ├── base.page.ts      # Lớp cơ sở cho các trang
│   │   ├── home.page.ts      # Trang Homepage
│   │   ├── shop.page.ts      # Trang Shop
│   │   ├── cart.page.ts      # Trang Cart
│   │   ├── checkout.page.ts  # Trang Checkout
│   │   ├── account.page.ts   # Trang My Account
│   │   ├── wishlist.page.ts  # Trang Wishlist
│   │   └── login.page.ts     # Trang Login
│   ├── tests/                # Chứa test case
│   │   ├── tc_01_homepage_elements.spec.ts    
│   │   ├── tc_02_product_search.spec.ts       
│   │   ├── tc_03_main_menu_navigation.spec.ts 
│   │   ├── tc_04_add_to_cart.spec.ts          
│   │   ├── tc_05_update_cart.spec.ts          
│   │   ├── tc_06_checkout_errors.spec.ts      
│   │   ├── tc_07_clear_cart.spec.ts           
│   │   ├── tc_08_guest_checkout.spec.ts       
│   │   ├── tc_09_user_registration.spec.ts    
│   │   └── tc_10_add_to_wishlist.spec.ts      
│   ├── fixtures/              
│   │   ├── test-data.json      # Thông tin tài khoản, sản phẩm, thanh toán
│   │   └── error-messages.json # Thông báo lỗi
│   └── verifiers/                 # Verify và bước kiểm tra
│       ├── homepage.steps.ts  # Xử lý verify Homepage
│       ├── search.steps.ts    # Xử lý verify Search
│       ├── menu.steps.ts      # Xử lý verify Menu
│       ├── cart.steps.ts      # Xử lý verify Cart
│       ├── checkout.steps.ts  # Xử lý verify Checkout
│       ├── account.steps.ts   # Xử lý verify Account
│       └── wishlist.steps.ts  # Xử lý verify Wishlist
├── utils/                    # Các hàm tiện ích
│   ├── reporter.ts           # Tùy chỉnh report
│   ├── custom-commands.ts    # Lệnh tùy chỉnh (semantic locator wrapper)
│   └── helpers.ts            # Hàm hỗ trợ (wait, logging)
├── config/                   
│   ├── playwright.config.ts  # Cấu hình Playwright
│   └── tsconfig.json         # Cấu hình TypeScript
├── reports/                  
├── screenshots/              
├── videos/                   
├── package.json              
├── .gitignore                # File bỏ qua file không cần commit
