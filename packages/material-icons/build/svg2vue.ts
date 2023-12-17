import consola from 'consola'
import chalk from 'chalk'
import { emptyDir, ensureDir } from 'fs-extra'
import { pathComponents } from './path'
import { generateEntryFile, getSvgs, svgToVue } from './helpers'

consola.info(chalk.blue('Checking directories...'))
await ensureDir(pathComponents)
await emptyDir(pathComponents)

consola.info(chalk.blue('Converting SVG to Vue components...'))
const svgs = await getSvgs()
await Promise.all(svgs.map(svgToVue))

consola.info(chalk.blue('Generating entry file...'))
await generateEntryFile(svgs)
