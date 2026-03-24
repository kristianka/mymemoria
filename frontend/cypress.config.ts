import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: process.env.BASE_URL || "http://localhost:3000"
        // use software rendering for WebGL in CI without GPU
    },
    env: {
        CYPRESS_TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL
    }
});
