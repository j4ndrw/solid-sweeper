import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        target: "esnext",
        polyfillDynamicImport: false,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@interfaces": path.resolve(__dirname, "./src/interfaces"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
        },
    },
});
