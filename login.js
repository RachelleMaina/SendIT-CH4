import faker from "faker";
import puppeteer from "puppeteer";
const data = {
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

    describe("Login form", () => {
      test("user can login", async () => {
        await page.goto("https://rachel-ch4.herokuapp.com/signin.html");
        await page.click("input[name=name]");
        await page.type("input[name=name]", data.username);
        await page.click("input[name=password]");
        await page.type("input[name=password]", data.password);
        await page.waitForSelector('#message');
        const message = await page.$eval('#message', info => (info.innerHTML));

        expect(message).toBeDefined();
      }, 40000);
        
    });