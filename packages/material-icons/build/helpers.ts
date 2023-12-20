import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import glob from 'fast-glob'
import { format } from 'prettier'
import { pathComponents } from './path'

export async function getSvgs() {
  const pkgs = await findWorkspacePackages(
    (await findWorkspaceDir(process.cwd()))!,
  )

  const svgPkg = pkgs.find(
    pkg => pkg.manifest.name === '@interface-ui/icons-svg',
  )!
  return glob('**/*.svg', { cwd: svgPkg.dir, absolute: true })
}

export async function svgToVue(file: string) {
  const template = await readFile(file, 'utf-8')
  const name = path.basename(file).replace('.svg', '')

  const code = await format(
    `
    import { createSvgIcon, withInstall } from '../utils';
    import type { SFCWithInstall } from '../utils';
    const ${name} = createSvgIcon('${template}');
    export default withInstall(${name}, '${name}') as SFCWithInstall<typeof ${name}>;
    `,
    { parser: 'typescript', semi: false, singleQuote: true },
  )

  writeFile(path.resolve(pathComponents, `${name}.ts`), code, 'utf-8')
}

export async function generateEntryFile(files: string[]) {
  const code = await format(
    files
      .map((file) => {
        const name = path.basename(file).replace('.svg', '')
        return `export { default as ${name} } from './${name}'`
      })
      .join('\n'),
    { parser: 'typescript', semi: false, singleQuote: true },
  )

  writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf-8')
}
