import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: process.env.BASE_URL || "http://localhost:5173"
    },
    env: {
        CYPRESS_TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL
    }
});
