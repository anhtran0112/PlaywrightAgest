import { HomePage } from '../pages/home.page';
import { BasePage } from '../pages/base.page';
import { expect } from '@playwright/test';
//import { Locator } from '@playwright/test';

type CategoryMethod =
    | 'clickAutomobilesLink'
    | 'clickCarElectronicsLink'
    | 'clickComputerOfficeLink'
    | 'clickMobilePhoneAccessoriesLink'
    | 'clickTabletAccessoriesLink'
    | 'clickConsumerElectronicsLink'
    | 'clickElectronicComponentsLink'
    | 'clickPhonesTelecomLink'
    | 'clickWatchesLink';

// Định nghĩa interfaces
interface NavigationResult {
    success: boolean;
    expectedUrl: string;
    actualUrl: string;
}

interface CategoryTest {
    name: string;
    method: CategoryMethod;
    expectedUrl: string;
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
    private basePage: BasePage;

    constructor(homePage: HomePage) {
        // Nhận HomePage instance từ bên ngoài
        // Tạo ra một đối tượng HomePage mới từ bản thiết kế HomePage. 
        this.homePage = homePage;
        // Tạo BasePage từ page của HomePage thông qua getter
        this.basePage = new BasePage(homePage.getPage());
    }

    // VERIFICATION METHODS


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

    async verifyProductsExistAfterSearch(productName: string, shouldExist: boolean = true): Promise<boolean> {

        const productCount = await this.basePage.countProductsAfterSearch(productName);

        if (shouldExist) {
            const hasProducts = productCount > 0;
            if (hasProducts) {
                console.log(`PASS: "${productName}" products exist (found ${productCount})`);
            } else {
                console.log(`FAIL: Expected "${productName}" products but found none`);
            }
            return hasProducts;
        } else {
            const noProducts = productCount === 0;
            if (noProducts) {
                console.log(`PASS: No "${productName}" products found as expected`);
            } else {
                console.log(`FAIL: Expected no "${productName}" products but found ${productCount}`);
            }
            return noProducts;
        }
    }

    //=====================Navigation==================

    async verifyAllMenuCategoriesNavigateCorrectly(): Promise<void> {
        const categories: CategoryTest[] = [
            {
                name: 'Automobiles & Motorcycles',
                method: 'clickAutomobilesLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/automobiles-motorcycles/'
            },
            {
                name: 'Car Electronics',
                method: 'clickCarElectronicsLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/car-electronics/'
            },
            {
                name: 'Computer & Office',
                method: 'clickComputerOfficeLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/computer-office/'
            },
            {
                name: 'Mobile Phone Accessories',
                method: 'clickMobilePhoneAccessoriesLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/mobile-phone-accessories/'
            },
            {
                name: 'Tablet Accessories',
                method: 'clickTabletAccessoriesLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/tablet-accessories/'
            },
            {
                name: 'Consumer Electronics',
                method: 'clickConsumerElectronicsLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/consumer-electronics/'
            },
            {
                name: 'Electronic Components & Supplies',
                method: 'clickElectronicComponentsLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/electronic-components-supplies/'
            },
            {
                name: 'Phones & Telecommunications',
                method: 'clickPhonesTelecomLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/phones-telecommunications/'
            },
            {
                name: 'Watches',
                method: 'clickWatchesLink',
                expectedUrl: 'https://demo.testarchitect.com/product-category/watches/'
            }
        ];

        for (const category of categories) {
            await this.testCategoryNavigation(category);
        }
    }

    public async verifyLinkNavigation(categoryName: string, expectedUrl: string): Promise<void> {
        const actualUrl = this.homePage.getPage().url();
        expect(actualUrl).toBe(expectedUrl);
    }

    private async testCategoryNavigation(category: CategoryTest): Promise<void> {
        await this.homePage.hoverMouseAllCategoryItems();
        // Click vào link category
        await this.homePage[category.method]();
        await this.homePage.getPage().waitForLoadState('load');
        await this.homePage.getPage().waitForLoadState('networkidle');
        //Tạo Locator dựa trên văn bản động
        const dynamicTextLocator = this.homePage.getPage().getByText(category.name, { exact: false });
        //Chờ Locator text xuất hiện 
        await dynamicTextLocator.waitFor({ state: 'visible', timeout: 30000 });
        await this.verifyLinkNavigation(category.name, category.expectedUrl);
        await this.homePage.navigateToHomepage();
        // Chờ quay lại home page
        await this.homePage.getPage().waitForLoadState('load');
        await this.homePage.getPage().waitForLoadState('networkidle');
    }
}