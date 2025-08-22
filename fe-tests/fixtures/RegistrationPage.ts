import type { Page, Locator} from "@playwright/test";
import { expect } from "@playwright/test";

export class RegistrationPage {
    private title: Locator;
    private email: Locator;
    private password: Locator;
    private register: Locator;
    private return: Locator;
    private age: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText("Регистрация в ШОКе")
        this.email = page.getByTestId("register-email-input");
        this.password = page.getByTestId("register-password-input");
        this.age = page.getByTestId("register-age-input");
        this.register = page.getByTestId("register-submit-button");
        this.return = page.getByTestId("register-back-button");
    }

    public async open() {
        await this.page.goto("/register");
    }

    public async isTitleVisiable(){
        expect(await this.title).toBeVisible();
    }

    public async clickRegister(){
        expect(await this.register).toBeVisible();
        await this.register.click();
    }

    public async clickReturn(){
        expect(await this.return).toBeVisible();
        await this.return.click();
    }

    public async fillEmail(email: string){
        expect(await this.email).toBeVisible();
        await this.email.fill(email);
    }

    public async fillPassword(password: string){
        expect(await this.password).toBeVisible();
        await this.password.fill(password);
    }

    public async fillAge(age: string){
        expect(await this.age).toBeVisible();
        await this.password.fill(age);
    }

    public async registrate(email: string | null, password: string | null, age: string | null) {
        if (email){
            await this.fillEmail(email);
        }
        if (password){
            await this.fillPassword(password);
        }
        if (age){
            await this.fillAge(age);
        }
        await this.clickRegister();
    }

}