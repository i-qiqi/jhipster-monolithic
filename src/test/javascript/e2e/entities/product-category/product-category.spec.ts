import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductCategoryComponentsPage, ProductCategoryDeleteDialog, ProductCategoryUpdatePage } from './product-category.page-object';

describe('ProductCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productCategoryUpdatePage: ProductCategoryUpdatePage;
    let productCategoryComponentsPage: ProductCategoryComponentsPage;
    let productCategoryDeleteDialog: ProductCategoryDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductCategories', async () => {
        await navBarPage.goToEntity('product-category');
        productCategoryComponentsPage = new ProductCategoryComponentsPage();
        expect(await productCategoryComponentsPage.getTitle()).toMatch(/storeApp.productCategory.home.title/);
    });

    it('should load create ProductCategory page', async () => {
        await productCategoryComponentsPage.clickOnCreateButton();
        productCategoryUpdatePage = new ProductCategoryUpdatePage();
        expect(await productCategoryUpdatePage.getPageTitle()).toMatch(/storeApp.productCategory.home.createOrEditLabel/);
        await productCategoryUpdatePage.cancel();
    });

    it('should create and save ProductCategories', async () => {
        await productCategoryComponentsPage.clickOnCreateButton();
        await productCategoryUpdatePage.setNameInput('name');
        expect(await productCategoryUpdatePage.getNameInput()).toMatch('name');
        await productCategoryUpdatePage.setDescriptionInput('description');
        expect(await productCategoryUpdatePage.getDescriptionInput()).toMatch('description');
        await productCategoryUpdatePage.save();
        expect(await productCategoryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last ProductCategory', async () => {
        const nbButtonsBeforeDelete = await productCategoryComponentsPage.countDeleteButtons();
        await productCategoryComponentsPage.clickOnLastDeleteButton();

        productCategoryDeleteDialog = new ProductCategoryDeleteDialog();
        expect(await productCategoryDeleteDialog.getDialogTitle()).toMatch(/storeApp.productCategory.delete.question/);
        await productCategoryDeleteDialog.clickOnConfirmButton();

        expect(await productCategoryComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
