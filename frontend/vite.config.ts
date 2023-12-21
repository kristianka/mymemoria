import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    console.log(`Running in ${mode} mode`);

    return {
        plugins: [react()],
        build: {
            outDir: "./dist"
        },
        server: {
            port: 5173,
            proxy: {
                "/api": {
                    target: "http://localhost:3000"
                }
            }
        }
    };
});
