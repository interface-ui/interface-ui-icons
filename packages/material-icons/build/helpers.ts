import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import glob from 'fast-glob'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { format } from 'prettier'
import { pathComponents } from './path'

export const getSvgs = async () => {
  const pkgs = await findWorkspacePackages(
    (await findWorkspaceDir(process.cwd()))!,
  )

  const svgPkg = pkgs.find(
    pkg => pkg.manifest.name === '@interface-ui/icons-svg',
  )!
  return glob('**/*.svg', { cwd: svgPkg.dir, absolute: true })
}

export const svgToVue = async (file: string) => {
  const template = await readFile(file, 'utf-8')
  const name = path.basename(file).replace('.svg', '')

  const code = await format(
    `
    <template>
    ${template}
    </template>

    <script setup lang="ts">
    defineOptions({
      name: '${name}',
    })
    </script>`,
    { parser: 'vue', semi: false, singleQuote: true },
  )

  writeFile(path.resolve(pathComponents, `${name}.vue`), code, 'utf-8')
}

export const generateEntryFile = async (files: string[]) => {
  const code = await format(
    files
      .map(file => {
        const name = path.basename(file).replace('.svg', '')
        return `export { default as ${name} } from './${name}.vue'`
      })
      .join('\n'),
    { parser: 'typescript', semi: false, singleQuote: true },
  )

  writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf-8')
}
