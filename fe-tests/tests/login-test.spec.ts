import { expect } from "@playwright/test";
import { test } from "../fixtures"
import { login, password } from "../fixtures/data.spec"

test("Страница Логина: Кнопка Регистрация ведёт на страницу регистрации", async ({ loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await loginPage.isTitleVisiable();
        });
        await test.step("Нажать кнопку Регистрация", async () => {
            await loginPage.clickRegistration();
        });
        await test.step("Отображается страница регистрации", async () => {
            await expect(loginPage.page).toHaveURL("/register");
        })
    })
})

test("Страница Логина: Кнопка Назад ведёт на начальную страницу", async ({ loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await loginPage.isTitleVisiable();
        });
        await test.step("Нажать кнопку Назад", async () => {
            await loginPage.clickReturn();
        });
        await test.step("Отображается начальная страница", async () => {
            await expect(loginPage.page).toHaveURL("/");
        })
    })
})


test("Страница Логина: При нажатии на кнопку В шок при пустом поле Email надпись Введите email", async ({loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await loginPage.isTitleVisiable();
        });
        await test.step("Ввести пароль и сделать логин", async () => {
            await loginPage.login(null, "123456");
        });
        await test.step("Проверить всплывщую надпись", async () => {
            expect(await loginPage.page.getByText("Введите email")).toBeVisible();
        })
    })
})


test("Страница Логина: При нажатии на кнопку В шок при пустом поле Email надпись Введите пароль", async ({loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await expect(loginPage.title).toBeVisible();
        });
        await test.step("Ввести почту и сделать логин", async () => {
            await loginPage.login("test@mail.ru", null);
        });
        await test.step("Проверить всплывщую надпись", async () => {
            expect(await loginPage.page.getByText('Введите пароль')).toBeVisible();
        })
    })
})

test("Страница Логина: При логине с данными существующего пользователя открывается окно профиля", async ({loginPage}) => {
    await test.step("Открыть страницу https://yavshok.ru/login", async () => {
        await loginPage.open()
        await test.step("Отображается страница https://yavshok.ru/login", async () => {
            await expect(loginPage.page).toHaveURL("/login");
            await expect(loginPage.title).toBeVisible();
        });
        await test.step("Ввести почту и сделать логин", async () => {
            await loginPage.login(login, password);
        });
        await test.step("Проверить всплывщую надпись", async () => {
            await expect(loginPage.page).toHaveURL("/");
            await expect(await loginPage.page.getByTestId("user-logout-button")).toBeVisible()
        })
    })
})