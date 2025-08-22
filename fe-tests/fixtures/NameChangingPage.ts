import type { Page, Locator} from "@playwright/test";
import { login, password} from "./data.spec"
import { expect } from "@playwright/test";

export class NameChangingPage {
    private title: Locator;
    private name: Locator;
    private save: Locator;
    private cancel: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText('Edit Profile').nth(1);
        this.name = page.getByTestId("edit-name-input");
        this.save = page.getByText("Save Changes");
        this.cancel = page.getByTestId("edit-cancel-button");
    }

    public async isTitleVisiable(){
        expect(await this.title).toBeVisible();
    }

    public async fillName(name: string){
        expect(await this.name).toBeVisible();
        await this.name.fill(name);
    }

    public async getName(){
        return this.name.getAttribute('value');
    }

    public async clickSave(){
        expect(await this.save).toBeVisible();
        await this.save.click();
    }

    public async clickCancel(){
        expect(await this.cancel).toBeVisible();
        await this.cancel.click();
    }

    public async changeName(name: string | null): Promise<void> {
        if (name){
            this.name.fill(name);
        }
        await this.save.click();
    }

    public async open() {
            await this.page.goto("/login");
            await this.page.getByTestId("login-email-input").fill(login);
            await this.page.getByTestId("login-password-input").fill(password);
            await this.page.getByTestId("login-submit-button").click();
            await this.page.getByTestId("user-edit-profile-button").click();
        }

}