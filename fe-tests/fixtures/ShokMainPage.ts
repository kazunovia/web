import type { Page, Locator} from "@playwright/test";
import { expect } from "@playwright/test";

export class ShokMainPage{
    private title: Locator;
    private input: Locator;
    private checkButton: Locator;
    private ToLoginButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText("Я в ШОКе", {exact : true});
        this.input = this.page.getByTestId("main-email-input");
        this.checkButton = this.page.getByTestId("main-check-button")
        this.ToLoginButton = this.page.getByTestId("main-login-button");
    }

    public async open() {
        await this.page.goto("/");
    }

    public async isTitleVisiable(){
        expect(await this.title).toBeVisible();
    }

    public async isCheckButtonDisable(){
        await expect(this.checkButton).toHaveAttribute("aria-disabled", "true");
    }

    public async isCheckButtonEnable(){
        await expect(this.checkButton).not.toHaveAttribute("aria-disabled");
    }

    public async clickCheck(){
        expect(await this.checkButton).toBeVisible();
        await this.checkButton.click();
    }

    public async clickLogin(){
        expect(await this.ToLoginButton).toBeVisible();
        await this.ToLoginButton.click();
    }

    public async fillInput(text: string){
        expect(await this.input).toBeVisible();
        await this.input.fill(text)
    }

    public async getInput(){
        return await this.input.inputValue();
    }

    public async checkEmail(email: string) {
        await this.fillInput(email)
        await this.clickCheck();
    }
}