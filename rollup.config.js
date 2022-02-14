import path from 'path'

import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH
const verbose = true
const minify = production
const sourcemap = (production ? false : true)
const format = 'es'

const outputDir = (dir = '') => {
    return path.join(__dirname, (production ? 'dist/' : 'dev/'), dir)
}

const plugins = [
    eslint({
        exclude: [],
    }),

    // Convert CommonJS libraries to ES6
    resolve({
        browser: true, // default: false
        modulesOnly: false, // default: false
        moduleDirectories: [
            './node_modules/'
        ],
        preferBuiltins: true,
    }),
    commonjs(),

    // Minify on production
    minify && terser(),
]

const watch = {
    // chokidar: true,
    clearScreen: true,
    exclude: ['node_modules/**'],
    include: ['./*.js', 'src/**/*'],
}

export default [
    {
        input: {
            rosegarden: 'src/rosegarden.js',
        },
        output: {
            dir: outputDir(),
            entryFileNames: '[name].js',
            format,
            manualChunks: {
                // 'ext/rambda': ['rambda'],
            },
            sourcemap,
        },
        plugins,
        watch,
    },
]
