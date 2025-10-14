import { HomePage } from '../pages/home.page';
import { expect } from '@playwright/test';
//import { Locator } from '@playwright/test';

// Định nghĩa interfaces
interface NavigationResult {
    success: boolean;
    expectedUrl: string;
    actualUrl: string;
}

/*
interface CategoryNavigation {
    category: string;
    success: boolean;
    expectedUrl: string;
    actualUrl: string;
}
interface AllCategoriesNavigationResult {
    allSuccessful: boolean;
    details: CategoryNavigation[];
}

interface CategoryDefinitionURL {
    nameUrl: string;
    expectedUrl: string;
}
*/
export class HomeVerify {
    private homePage: HomePage;

    constructor(homePage: HomePage) {
        // Nhận HomePage instance từ bên ngoài
        // Tạo ra một đối tượng HomePage mới từ bản thiết kế HomePage. 
        this.homePage = homePage;
    }

    // VERIFICATION METHODS

    public async verifyLinkNavigation(categoryName: string,expectedUrl: string): Promise<void> {
        const actualUrl = this.homePage.getPage().url();
        expect(actualUrl).toBe(expectedUrl);
    }

    // Kiểu trả về - Promise chứa object theo interface NavigationResult
    /*
    public async verifyCategoryNavigation(categoryName: string, expectedUrl: string): Promise<NavigationResult> {
        const actualUrl = this.homePage.getPage().url();
        const success = actualUrl === expectedUrl;

        return {
            success,
            expectedUrl,
            actualUrl
        };
    }*/
    
    /*
    public async verifyAllCategoriesNavigation(): Promise<AllCategoriesNavigationResult> {
        //Khởi tạo 1 mảng chứa URL
        // Khai báo biến categories có kiểu dữ liệu mảng theo interface: CategoryDefinitionURL
        const categories: CategoryDefinitionURL[] = [
            {
                nameUrl: 'Automobiles & Motorcycles',
                expectedUrl: 'https://demo.testarchitect.com/product-category/automobiles-motorcycles/'
            },
            {
                nameUrl: 'Car Electronics',
                expectedUrl: 'https://demo.testarchitect.com/product-category/car-electronics/'
            },
            {
                nameUrl: 'Mobile Phone Accessories',
                expectedUrl: 'https://demo.testarchitect.com/product-category/mobile-phone-accessories/'
            },
            {
                nameUrl: 'Computer & Office',
                expectedUrl: 'https://demo.testarchitect.com/product-category/computer-office/'
            },
            {
                nameUrl: 'Tablet Accessories',
                expectedUrl: 'https://demo.testarchitect.com/product-category/tablet-accessories/'
            },
            {
                nameUrl: 'Consumer Electronics',
                expectedUrl: 'https://demo.testarchitect.com/product-category/consumer-electronics/'
            },
            {
                nameUrl: 'Electronic Components & Supplies',
                expectedUrl: 'https://demo.testarchitect.com/product-category/electronic-components-supplies/'
            },
            {
                nameUrl: 'Phones & Telecommunications',
                expectedUrl: 'https://demo.testarchitect.com/product-category/phones-telecommunications/'
            },
            {
                nameUrl: 'Watches',
                expectedUrl: 'https://demo.testarchitect.com/product-category/watches/'
            }
        ];
        // Khởi tạo biến để lưu kết quả 
        // Có kiểu dữ liệu mảng theo interface: CategoryNavigation
        const details: CategoryNavigation[] = [];
        let allSuccessful = true;

        for (const category of categories) {
            const result = await this.verifyCategoryNavigation(category.nameUrl, category.expectedUrl);
            //  Thêm kết quả vào cuối mảng details
            details.push({
                category: category.nameUrl,
                success: result.success,
                expectedUrl: category.expectedUrl,
                actualUrl: result.actualUrl
            });

            // Chỉ cần fail 1 ngưng
            if (!result.success) {
                allSuccessful = false;
            }
        }

        return {
            // AllCategoriesNavigationResult
            allSuccessful,
            details
        };
        
    }*/
}