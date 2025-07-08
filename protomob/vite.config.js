import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: ".",
    base: "/",
    build: {
        outDir: "dist",
        assetsDir: "assets",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                onboarding: resolve(__dirname, "src/pages/onboarding.html"),
                auth: resolve(__dirname, "src/pages/auth.html"),
                contact: resolve(__dirname, "src/pages/contact.html"),
                risktest: resolve(__dirname, "src/pages/risktest.html"),
                information: resolve(__dirname, "src/pages/information.html"),
            },
        },
    },
});
