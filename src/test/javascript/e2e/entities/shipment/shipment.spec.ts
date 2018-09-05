import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShipmentComponentsPage, ShipmentDeleteDialog, ShipmentUpdatePage } from './shipment.page-object';

describe('Shipment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let shipmentUpdatePage: ShipmentUpdatePage;
    let shipmentComponentsPage: ShipmentComponentsPage;
    /*let shipmentDeleteDialog: ShipmentDeleteDialog;*/

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Shipments', async () => {
        await navBarPage.goToEntity('shipment');
        shipmentComponentsPage = new ShipmentComponentsPage();
        expect(await shipmentComponentsPage.getTitle()).toMatch(/storeApp.shipment.home.title/);
    });

    it('should load create Shipment page', async () => {
        await shipmentComponentsPage.clickOnCreateButton();
        shipmentUpdatePage = new ShipmentUpdatePage();
        expect(await shipmentUpdatePage.getPageTitle()).toMatch(/storeApp.shipment.home.createOrEditLabel/);
        await shipmentUpdatePage.cancel();
    });

    /* it('should create and save Shipments', async () => {
        await shipmentComponentsPage.clickOnCreateButton();
        await shipmentUpdatePage.setTrackingCodeInput('trackingCode');
        expect(await shipmentUpdatePage.getTrackingCodeInput()).toMatch('trackingCode');
        await shipmentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await shipmentUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        await shipmentUpdatePage.setDetailsInput('details');
        expect(await shipmentUpdatePage.getDetailsInput()).toMatch('details');
        await shipmentUpdatePage.invoiceSelectLastOption();
        await shipmentUpdatePage.save();
        expect(await shipmentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    /* it('should delete last Shipment', async () => {
        const nbButtonsBeforeDelete = await shipmentComponentsPage.countDeleteButtons();
        await shipmentComponentsPage.clickOnLastDeleteButton();

        shipmentDeleteDialog = new ShipmentDeleteDialog();
        expect(await shipmentDeleteDialog.getDialogTitle())
            .toMatch(/storeApp.shipment.delete.question/);
        await shipmentDeleteDialog.clickOnConfirmButton();

        expect(await shipmentComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
