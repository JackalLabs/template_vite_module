import { defineConfig } from "vite"

import typescript from "@rollup/plugin-typescript"
import { resolve } from "path"
import { copyFileSync } from "fs"
import { typescriptPaths } from "rollup-plugin-typescript-paths"
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: './',
  plugins: [
    tsconfigPaths(),
    dts({
      afterBuild: () => {
        copyFileSync("dist/index.d.ts", "dist/index.d.mts")
      },
      include: ["src"],
      rollupTypes: true,
      logLevel: 'error'
    })
  ],
  resolve: {
    preserveSymlinks: true,
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
    ],
    extensions: ['.ts']
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
      name: 'SAMPLE'
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          absolute: false,
        }),
        typescript({ tsconfig: './tsconfig.json' }),
      ],
    },
  },
})
