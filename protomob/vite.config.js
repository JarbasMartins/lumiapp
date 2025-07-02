import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: ".",
    base: "./",
    build: {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                onboarding: resolve(__dirname, "src/pages/onboarding.html"),
                auth: resolve(__dirname, "src/pages/auth.html"),
                riskTest: resolve(__dirname, "src/pages/risktest.html"),
                contact: resolve(__dirname, "src/pages/contact.html"),
                information: resolve(__dirname, "src/pages/information.html"),
            },
        },
    },
    server: {
        port: 5173,
        open: "/src/pages/onboarding.html",
    },
});
