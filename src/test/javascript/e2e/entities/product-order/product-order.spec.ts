import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductOrderComponentsPage, ProductOrderDeleteDialog, ProductOrderUpdatePage } from './product-order.page-object';

describe('ProductOrder e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productOrderUpdatePage: ProductOrderUpdatePage;
    let productOrderComponentsPage: ProductOrderComponentsPage;
    /*let productOrderDeleteDialog: ProductOrderDeleteDialog;*/

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductOrders', async () => {
        await navBarPage.goToEntity('product-order');
        productOrderComponentsPage = new ProductOrderComponentsPage();
        expect(await productOrderComponentsPage.getTitle()).toMatch(/storeApp.productOrder.home.title/);
    });

    it('should load create ProductOrder page', async () => {
        await productOrderComponentsPage.clickOnCreateButton();
        productOrderUpdatePage = new ProductOrderUpdatePage();
        expect(await productOrderUpdatePage.getPageTitle()).toMatch(/storeApp.productOrder.home.createOrEditLabel/);
        await productOrderUpdatePage.cancel();
    });

    /* it('should create and save ProductOrders', async () => {
        await productOrderComponentsPage.clickOnCreateButton();
        await productOrderUpdatePage.setPlacedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await productOrderUpdatePage.getPlacedDateInput()).toContain('2001-01-01T02:30');
        await productOrderUpdatePage.statusSelectLastOption();
        await productOrderUpdatePage.setCodeInput('code');
        expect(await productOrderUpdatePage.getCodeInput()).toMatch('code');
        await productOrderUpdatePage.customerSelectLastOption();
        await productOrderUpdatePage.save();
        expect(await productOrderUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    /* it('should delete last ProductOrder', async () => {
        const nbButtonsBeforeDelete = await productOrderComponentsPage.countDeleteButtons();
        await productOrderComponentsPage.clickOnLastDeleteButton();

        productOrderDeleteDialog = new ProductOrderDeleteDialog();
        expect(await productOrderDeleteDialog.getDialogTitle())
            .toMatch(/storeApp.productOrder.delete.question/);
        await productOrderDeleteDialog.clickOnConfirmButton();

        expect(await productOrderComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
