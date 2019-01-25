import faker from "faker";
import puppeteer from "puppeteer";
const signup_data = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      password1: ("password"),
      password2: ("password")   

    };
const login_data = {
      username: faker.name.firstName(),
      password: ("password"),
    };

    let page;
    let browser;
    const width = 1920;
    const height = 1080;
    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`]
      });
      page = await browser.newPage();
      await page.setViewport({ width, height });
    });
    afterAll(() => {
      browser.close();
    });

    describe("Signup form", () => {
      test("user can signup", async () => {
        await page.goto("https://rachel-ch4.herokuapp.com/signup.html");
        await page.click("input[name=name]");
        await page.type("input[name=name]", signup_data.username);
        await page.click("input[name=email]");
        await page.type("input[name=email]", signup_data.email);
        await page.click("input[name=phone]");
        await page.type("input[name=phone]", signup_data.phone);
        await page.click("input[name=password1]");
        await page.type("input[name=password1]", signup_data.password1);
        await page.click("input[name=password2]");
        await page.type("input[name=password2]", signup_data.password2);
        await page.click("input[type=submit]");
        await page.waitForSelector('#message');
        const message = await page.$eval('#message', info => (info.innerHTML));

        expect(message).toBeDefined();
      }, 1000000);
        
    });

      describe("Login form", () => {
      test("user can login", async () => {
        await page.goto("https://rachel-ch4.herokuapp.com/signin.html");
        await page.click("input[name=email]");
        await page.type("input[name=email]", login_data.username);
        await page.click("input[name=password]");
        await page.type("input[name=password]", login_data.password);
        await page.waitForSelector('#message');
        const message = await page.$eval('#message', info => (info.innerHTML));

        expect(message).toBeDefined();
      }, 1000000);
        
    });