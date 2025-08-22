import type { Page, Locator} from "@playwright/test";
import { expect } from "@playwright/test";


export class ProfilePage{
    private edit: Locator;
    private logout: Locator;

    
    constructor(public readonly page: Page){
        this.edit = page.getByTestId("user-edit-profile-button")
        this.logout = page.getByTestId("user-logout-button")
    }

    public async open() {
        await this.page.goto("/");
    }

    public async clickEdit() {
        await expect(this.edit).toBeVisible();
        await this.edit.click();
    }

    public async clickLogout() {
        await expect(this.logout).toBeVisible();
        await this.logout.click();
    }
}