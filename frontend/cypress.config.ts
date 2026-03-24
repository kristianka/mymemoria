import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: process.env.BASE_URL || "http://localhost:3000",
        // use software rendering for WebGL in CI without GPU
        setupNodeEvents(on, config) {
            on("before:browser:launch", (browser, launchOptions) => {
                if (process.env.CI && (browser.name === "chrome" || browser.name === "chromium")) {
                    launchOptions.args.push("--use-gl=swiftshader");
                    launchOptions.args.push("--disable-gpu-sandbox");
                }
                return launchOptions;
            });
        }
    },
    env: {
        CYPRESS_TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL
    }
});
