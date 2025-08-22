import type { Page, Locator} from "@playwright/test";
import { expect } from "@playwright/test";

export class LoginPage {
    private title: Locator;
    private email: Locator;
    private password: Locator;
    private registration: Locator;
    private return: Locator;
    private shok: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText("Войти в ШОК");
        this.email = page.getByTestId("login-email-input");
        this.password = page.getByTestId("login-password-input");
        this.shok = page.getByTestId("login-submit-button");
        this.return = page.getByTestId("login-back-button");
        this.registration = page.getByTestId("login-register-button");
    }

    public async open() {
        await this.page.goto("/login");
    }

    public async isTitleVisiable(){
        expect(await this.title).toBeVisible();
    }

    public async fillEmail(email: string){
        expect(await this.email).toBeVisible();
        await this.email.fill(email);
    }

    public async fillPassword(password: string){
        expect(await this.password).toBeVisible();
        await this.password.fill(password);
    }

    public async clickShok(){
        expect(await this.shok).toBeVisible();
        await this.shok.click();
    }

    public async clickReturn(){
        expect(await this.return).toBeVisible();
        await this.return.click();
    }

    public async clickRegistration(){
        expect(await this.registration).toBeVisible();
        await this.registration.click();
    }

    public async login(email: string | null, password: string | null) {
        if (email){
            await this.fillEmail(email);
        }
        if (password){
        await this.fillPassword(password);
        }
        await this.clickShok();
    }
}