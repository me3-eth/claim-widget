import resolve from '@rollup/plugin-node-resolve'
import common from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    resolve({
      mainFields: ['browser', 'module', 'main'],
      preferBuiltins: true
    }),
    common(),
    terser({ output: { comments: false } })
  ]
}
