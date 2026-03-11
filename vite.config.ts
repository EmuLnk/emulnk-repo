import type { UserConfig } from 'vite'
import { viteStaticCopy } from "vite-plugin-static-copy";
import { dirname } from 'node:path'
import { globSync } from "node:fs";

export default {
    base: "/",
    build: {
        modulePreload: false,
        target: "chrome109",
        rollupOptions: {
            input: globSync('themes/**/*.*'),
            output: {
                format: 'es',
                assetFileNames: "themes/[name].[ext]",
                chunkFileNames: "themes/[name].[ext]",
                entryFileNames: "themes/[name].js",
                preserveModules: true,
                dir: 'dist'
            },
            preserveEntrySignatures: "strict"
        }
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'static/*',
                    dest: '.',
                },
                ...globSync("themes/**/theme.json").map(json => ({src: json, dest: dirname(json)}))
            ],
        }),
    ],
} satisfies UserConfig
