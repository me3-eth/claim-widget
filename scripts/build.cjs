const svelte = require('rollup-plugin-svelte')
const sveltePreprocess = require('svelte-preprocess')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const css = require('rollup-plugin-css-only')
const replace = require('@rollup/plugin-replace')
const terser = require('rollup-plugin-terser').terser
const shell = require('shelljs')
const fs = require('fs').promises
const path = require('path')
const { rollup } = require('rollup')
const packageJson = require('../package.json')

const commonRollupPlugins = [
  json(),

  nodeResolve({
    browser: true,
    dedupe: ['svelte']
  }),

  commonjs(),

  babel({
    extensions: ['.js', '.cjs', '.html', '.svelte'],
    babelHelpers: 'runtime'
  })
]

const appPath = path.resolve(__dirname, '../')
const production = true
const buildPath = 'dist'
const entryPoint = path.join(appPath, 'src', 'index.js')
const entryComponent = /index\.svelte$/
const moduleName = packageJson.name.replace('@', '').replace('/', '-')
const moduleVersion = packageJson.version

const moduleFile = path.join(buildPath, `${moduleName}.js`)
const bundleName = `${moduleName}.${moduleVersion}.js`

const outputOpt = {
  sourcemap: true,
  format: 'iife',
  name: 'App', // TODO correct?
  file: path.join(buildPath, bundleName),
}

async function extractCSS() {
  let cssChunk = ''

  const bundle = await rollup({
    input: entryPoint,
    plugins: [
      svelte({
        compilerOptions: {
          dev: !production,
          customElement: false
        },
        emitCss: true,
        preprocess: sveltePreprocess()
      }),

      css({
        output(nestedCSS, styleNodes, bundle) {
          const escapedCssChunk = nestedCSS
            .replace(/\n/g, '')
            .replace(/[\\"']/g, '\\$&')
            .replace(/\u0000/g, '\\0')

          cssChunk = escapedCssChunk
        }
      }),

      ...commonRollupPlugins
    ]
  })

  await bundle.generate(outputOpt)

  return cssChunk
}

async function buildWebComponent({ minify, cssChunk }) {
  const bundle = await rollup({
    input: entryPoint,
    plugins: [
      // Compile child components first as reqular svelte
      svelte({
        compilerOptions: {
          dev: !production,
          customElement: false
        },
        emitCss: true,
        exclude: entryComponent,
        preprocess: sveltePreprocess()
      }),

      // Compile entrypoint component
      svelte({
        compilerOptions: {
          dev: !production,
          customElement: true
        },
        emitCss: false,
        include: entryComponent,
        preprocess: sveltePreprocess()
      }),

      /*
      css({
        output(nestedCSS, styleNodes, bundle) {
          const code = bundle[bundleName].code

          const matches = code.match(
            minify
              ? /.shadowRoot.innerHTML='<style>(.*)<\/style>'/
              : /.shadowRoot.innerHTML = "<style>(.*)<\/style>"/
          )

          if (matches && matches[1]) {
            const style = matches[1]
            bundle[bundleName].code = code.replace(style, cssChunk)
          } else {
            console.error({ code, nestedCSS, cssChunk })
            throw new Error('Unable to shadowRoot')
          }
        }
      }),
      */

      replace({
        '.head.appendChild(e': '.appendChild(e',
        delimiters: ['', '']
      }),
      
      ...commonRollupPlugins,
      minify && terser()
    ]
  })

  const { output } = await bundle.generate(outputOpt)
  const { code, map } = output[0]

  const filename = minify
    ? (outputOpt.file).replace('.js', '.min.js')
    : outputOpt.file
  await fs.writeFile(filename, code)

  if (minify) await fs.writeFile(`${filename}.map`, map.toString())
  else await fs.writeFile(moduleFile, code)
}

async function main() {
  try {
    shell.mkdir('-p', buildPath)
    shell.rm(`${buildPath}/*`)

    const cssChunk = await extractCSS()

    await buildWebComponent({ minify: false, cssChunk })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
