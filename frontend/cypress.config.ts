import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: process.env.BASE_URL || "http://localhost:3000",
        // use software rendering for WebGL in CI without GPU
        setupNodeEvents(on, config) {
            on("before:browser:launch", (browser, launchOptions) => {
                if (browser.name === "chrome" || browser.name === "chromium") {
                    // force headless, mapbox js causes erros otherwise in CI
                    launchOptions.args = launchOptions.args.filter(
                        (arg) => arg !== "--headless=new"
                    );
                    launchOptions.args.push("--headless=old");
                    launchOptions.args.push("--use-gl=swiftshader");
                    launchOptions.args.push("--disable-gpu");
                    launchOptions.args.push("--no-sandbox");
                    launchOptions.args.push("--disable-dev-shm-usage");
                }
                return launchOptions;
            });
        }
    },
    env: {
        CYPRESS_TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL
    },
    chromeWebSecurity: false
});
