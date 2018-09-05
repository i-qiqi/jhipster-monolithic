import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderItemComponentsPage, OrderItemDeleteDialog, OrderItemUpdatePage } from './order-item.page-object';

describe('OrderItem e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let orderItemUpdatePage: OrderItemUpdatePage;
    let orderItemComponentsPage: OrderItemComponentsPage;
    /*let orderItemDeleteDialog: OrderItemDeleteDialog;*/

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load OrderItems', async () => {
        await navBarPage.goToEntity('order-item');
        orderItemComponentsPage = new OrderItemComponentsPage();
        expect(await orderItemComponentsPage.getTitle()).toMatch(/storeApp.orderItem.home.title/);
    });

    it('should load create OrderItem page', async () => {
        await orderItemComponentsPage.clickOnCreateButton();
        orderItemUpdatePage = new OrderItemUpdatePage();
        expect(await orderItemUpdatePage.getPageTitle()).toMatch(/storeApp.orderItem.home.createOrEditLabel/);
        await orderItemUpdatePage.cancel();
    });

    /* it('should create and save OrderItems', async () => {
        await orderItemComponentsPage.clickOnCreateButton();
        await orderItemUpdatePage.setQuantityInput('5');
        expect(await orderItemUpdatePage.getQuantityInput()).toMatch('5');
        await orderItemUpdatePage.setTotalPriceInput('5');
        expect(await orderItemUpdatePage.getTotalPriceInput()).toMatch('5');
        await orderItemUpdatePage.statusSelectLastOption();
        await orderItemUpdatePage.productSelectLastOption();
        await orderItemUpdatePage.orderSelectLastOption();
        await orderItemUpdatePage.save();
        expect(await orderItemUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    /* it('should delete last OrderItem', async () => {
        const nbButtonsBeforeDelete = await orderItemComponentsPage.countDeleteButtons();
        await orderItemComponentsPage.clickOnLastDeleteButton();

        orderItemDeleteDialog = new OrderItemDeleteDialog();
        expect(await orderItemDeleteDialog.getDialogTitle())
            .toMatch(/storeApp.orderItem.delete.question/);
        await orderItemDeleteDialog.clickOnConfirmButton();

        expect(await orderItemComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
