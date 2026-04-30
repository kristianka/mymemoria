import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: process.env.BASE_URL || "http://localhost:3000",
        setupNodeEvents(on) {
            on("before:browser:launch", (browser, launchOptions) => {
                if (browser.family === "chromium" && browser.name !== "electron") {
                    // Force software-rendered WebGL so mapbox-gl can initialize
                    // on headless CI runners that have no GPU.
                    launchOptions.args.push("--use-gl=angle");
                    launchOptions.args.push("--use-angle=swiftshader");
                    launchOptions.args.push("--enable-unsafe-swiftshader");
                    launchOptions.args.push("--ignore-gpu-blocklist");
                }
                return launchOptions;
            });
        }
    },
    env: {
        CYPRESS_TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL
    }
});
