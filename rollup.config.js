import {defineConfig} from "rollup"
import nodeResolve from "@rollup/plugin-node-resolve"
import json from "@rollup/plugin-json"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import typescript from "rollup-plugin-typescript2"
import externals from "rollup-plugin-node-externals"


export default defineConfig({
    input: {
        index: "src/index.ts"
    },
    output: [
        {
            dir: "dist",
            format: "cjs"
        }
    ],
    plugins: [
        nodeResolve(),
        json(),
        externals({
            devDeps: false // 把package.json里的依赖当作外部依赖，打包的时候不要包含。
        }),
        commonjs(),
        terser(),
        typescript()
    ]
})
