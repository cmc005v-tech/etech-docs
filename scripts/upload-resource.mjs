#!/usr/bin/env node
/**
 * 资源下载中心 - 站长附件上传工具（仅站长本机使用）
 *
 * 功能：将本地附件复制到站点 public/resources 目录，自动更新
 *       docs/resources/index.md 资源清单，并可一键提交推送到 main 分支，
 *       触发 GitHub Pages / Cloudflare Pages 自动构建上线。
 *
 * 用法：
 *   node scripts/upload-resource.mjs <附件路径> [选项]
 *
 * 选项：
 *   --name "显示名称"      资源表内展示的名称（默认取文件名去扩展名）
 *   --category "📂 分类"   已有分类标题或新分类标题（默认交互选择）
 *   --dir "目录名"         目标子目录（新分类必填，如 compliance-reports）
 *   --desc "简介"          表格简介列文案
 *   --no-push              仅复制 + 更新清单，不执行 git 提交推送
 *   --yes                  跳过全部交互，缺失项使用默认值
 *
 * 示例：
 *   node scripts/upload-resource.mjs D:/资料/行业报告.pdf --category "📂 平台合规专题" --dir compliance-reports --name "行业报告（2026版）" --desc "九大平台合规深度分析"
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const RESOURCES_DIR = path.join(REPO_ROOT, 'docs', 'public', 'resources')
const INDEX_MD = path.join(REPO_ROOT, 'docs', 'resources', 'index.md')

/** 现有分类标题 → 目录 映射（新增映射时保持与 index.md 一致） */
const CATEGORY_DIRS = {
  '📂 思维模型工具手册': 'mental-models',
  '📂 供应链管理模块': 'supply-chain',
  '📂 平台运营模块': 'platform-operations',
  '📂 合规风控模块': 'compliance',
  '📂 品牌出海模块': 'brand-management',
  '📂 跨境物流模块': 'logistics',
  '📂 工具包模板': 'toolkit',
}

/** 扩展名 → 表格类型徽标 */
const TYPE_MAP = {
  pdf: 'PDF', xlsx: 'XLSX', xls: 'XLS', docx: 'DOCX', doc: 'DOC',
  md: 'MD', pptx: 'PPTX', ppt: 'PPT', zip: 'ZIP', rar: 'RAR',
  csv: 'CSV', txt: 'TXT', png: 'PNG', jpg: 'JPG', jpeg: 'JPG',
  webp: 'WEBP', svg: 'SVG', mp4: 'MP4',
}

const GIT_LIMIT_BYTES = 100 * 1024 * 1024 // GitHub 单文件硬上限
const WARN_BYTES = 50 * 1024 * 1024      // 50MB 以上提醒（仓库体积）

/** 分类→目录映射持久化文件：新分类首次指定 --dir 后自动记录，下次免传 */
const CATEGORY_DIRS_JSON = path.join(__dirname, 'resource-category-dirs.json')

/** 现有分类标题 → 目录 映射（新增映射时保持与 index.md 一致） */
const BUILTIN_CATEGORY_DIRS = {
  '📂 思维模型工具手册': 'mental-models',
  '📂 供应链管理模块': 'supply-chain',
  '📂 平台运营模块': 'platform-operations',
  '📂 合规风控模块': 'compliance',
  '📂 品牌出海模块': 'brand-management',
  '📂 跨境物流模块': 'logistics',
  '📂 工具包模板': 'toolkit',
}

function loadCategoryDirs() {
  try {
    return { ...BUILTIN_CATEGORY_DIRS, ...JSON.parse(fs.readFileSync(CATEGORY_DIRS_JSON, 'utf8')) }
  } catch {
    return { ...BUILTIN_CATEGORY_DIRS }
  }
}

function saveCategoryDir(title, dir) {
  const all = { ...BUILTIN_CATEGORY_DIRS }
  try { Object.assign(all, JSON.parse(fs.readFileSync(CATEGORY_DIRS_JSON, 'utf8'))) } catch { /* 首次创建 */ }
  all[title] = dir
  fs.writeFileSync(CATEGORY_DIRS_JSON, JSON.stringify(all, null, 2) + '\n', 'utf8')
}

// ---------- 命令行参数解析 ----------
function parseArgs(argv) {
  const args = { file: null, name: null, category: null, dir: null, desc: '', noPush: false, yes: false }
  const rest = [...argv]
  while (rest.length) {
    const a = rest.shift()
    if (a === '--name') args.name = rest.shift()
    else if (a === '--category') args.category = rest.shift()
    else if (a === '--dir') args.dir = rest.shift()
    else if (a === '--desc') args.desc = rest.shift()
    else if (a === '--no-push') args.noPush = true
    else if (a === '--yes') args.yes = true
    else if (a.startsWith('-')) { console.error(`✗ 未知选项: ${a}`); process.exit(1) }
    else if (!args.file) args.file = a
    else { console.error(`✗ 多余参数: ${a}`); process.exit(1) }
  }
  return args
}

// ---------- 工具函数 ----------
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

async function ask(question, fallback = '') {
  const answer = (await rl.question(question)).trim()
  return answer || fallback
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + 'MB'
  return Math.round(bytes / 1024) + 'KB'
}

/** 清理为可安全用于 URL/文件名的名称（保留中文，替换危险字符与空格） */
function sanitizeFileName(name) {
  const cleaned = name
    .replace(/[\\/:*?"<>|#%&{}[\] ]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return cleaned
}

function escapeSingleQuote(s) {
  return s.replace(/'/g, "\\'")
}

/** 读取 index.md 中所有分类标题（按出现顺序） */
function readCategories(content) {
  const titles = []
  const re = /<ResourceCategory title="([^"]+)">/g
  let m
  while ((m = re.exec(content))) titles.push(m[1])
  return titles
}

/** 构造单条 ResourceTable item 行 */
function buildItemLine({ name, type, size, desc, link }) {
  const fields = [`name: '${escapeSingleQuote(name)}'`, `type: '${type}'`, `size: '${size}'`]
  if (desc) fields.push(`description: '${escapeSingleQuote(desc)}'`)
  fields.push(`link: '${link}'`)
  return `    { ${fields.join(', ')} },`
}

// ---------- 主流程 ----------
async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!args.file) {
    console.error('✗ 请指定附件路径，例如：node scripts/upload-resource.mjs "D:/资料/报告.pdf"')
    rl.close()
    process.exit(1)
  }
  const srcPath = path.resolve(args.file)
  if (!fs.existsSync(srcPath) || !fs.statSync(srcPath).isFile()) {
    console.error(`✗ 文件不存在: ${srcPath}`)
    rl.close()
    process.exit(1)
  }

  const stats = fs.statSync(srcPath)
  if (stats.size >= GIT_LIMIT_BYTES) {
    console.error('✗ 文件超过 100MB，GitHub 无法托管，请压缩后重试')
    rl.close()
    process.exit(1)
  }
  if (stats.size >= WARN_BYTES) {
    console.warn(`⚠ 文件 ${formatSize(stats.size)}，超过 50MB，会使仓库体积膨胀，建议确认是否上传`)
  }

  const ext = path.extname(srcPath).slice(1).toLowerCase()
  const type = TYPE_MAP[ext] || ext.toUpperCase()
  const rawName = path.basename(srcPath)
  const safeName = sanitizeFileName(rawName)
  const sizeText = formatSize(stats.size)

  // 1. 交互收集展示名称
  let name = args.name || path.basename(rawName, path.extname(rawName))
  if (!args.yes && !args.name) {
    name = (await ask(`资源名称（回车默认: ${name}）: `)) || name
  }
  if (safeName !== rawName) {
    console.log(`ℹ 文件名已安全化: ${rawName} → ${safeName}`)
  }

  // 2. 解析目标分类与目录
  const content = fs.readFileSync(INDEX_MD, 'utf8')
  const existingTitles = readCategories(content)
  const categoryDirs = loadCategoryDirs()
  let category = args.category || ''
  if (!category.startsWith('📂 ')) category = category ? `📂 ${category}` : ''

  let targetDir = null
  let isNewCategory = false

  if (!category) {
    if (args.yes) {
      console.error('✗ --yes 模式必须提供 --category')
      rl.close()
      process.exit(1)
    }
    console.log('现有分类：')
    existingTitles.forEach((t, i) => console.log(`  [${i + 1}] ${t}`))
    console.log(`  [${existingTitles.length + 1}] ➕ 新建分类`)
    const pick = parseInt(await ask(`选择目标分类（1-${existingTitles.length + 1}）: `), 10)
    if (pick >= 1 && pick <= existingTitles.length) {
      category = existingTitles[pick - 1]
    } else {
      category = await ask('新分类标题（如：📂 平台合规专题）: ')
      if (!category.startsWith('📂 ')) category = `📂 ${category}`
      isNewCategory = true
    }
  } else {
    isNewCategory = !existingTitles.includes(category)
  }

  if (categoryDirs[category]) {
    targetDir = categoryDirs[category]
  } else if (isNewCategory) {
    if (args.dir) {
      targetDir = args.dir
    } else if (args.yes) {
      console.error(`✗ 新分类 ${category} 必须提供 --dir 指定目录名（如 compliance-reports）`)
      rl.close()
      process.exit(1)
    } else {
      targetDir = await ask('请输入该分类的英文目录名（如 compliance-reports）: ')
    }
    saveCategoryDir(category, targetDir)
  } else {
    // 分类已存在但不在内置映射 → 从该分类现有条目的 link 推断目录
    const esc = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const block = content.match(new RegExp(`<ResourceCategory title="${esc}">[\\s\\S]*?<\\/ResourceCategory>`))
    if (!block) {
      console.error(`✗ 未在 index.md 找到分类块: ${category}`)
      rl.close()
      process.exit(1)
    }
    const linkMatch = block[0].match(/link: '\/resources\/([^'/]+)\//)
    if (!linkMatch) {
      console.error(`✗ 无法推断分类 ${category} 的目录，请用 --dir 指定`)
      rl.close()
      process.exit(1)
    }
    targetDir = linkMatch[1]
  }

  if (!/^[a-z0-9_-]+$/i.test(targetDir)) {
    console.error(`✗ 目录名不合法（仅限英文/数字/-/_）: ${targetDir}`)
    rl.close()
    process.exit(1)
  }

  // 3. 交互收集简介
  let desc = args.desc
  if (!args.yes && !args.desc) {
    desc = await ask('简介（可回车跳过）: ')
  }
  desc = desc.trim()

  // 4. 复制文件（同名冲突处理）
  const destDir = path.join(RESOURCES_DIR, targetDir)
  fs.mkdirSync(destDir, { recursive: true })
  const destPath = path.join(destDir, safeName)

  if (fs.existsSync(destPath)) {
    if (args.yes) {
      console.warn(`⚠ 目标文件已存在，--yes 模式直接覆盖: ${safeName}`)
    } else {
      const ans = await ask(`目标文件已存在，覆盖？[y/N] `)
      if (ans.toLowerCase() !== 'y') {
        console.log('已取消本次上传')
        rl.close()
        process.exit(0)
      }
    }
  }
  fs.copyFileSync(srcPath, destPath)
  const relDir = path.relative(REPO_ROOT, destPath).replace(/\\/g, '/')

  // 5. 更新 index.md 清单
  const link = `/resources/${targetDir}/${encodeURI(safeName)}`
  const itemLine = buildItemLine({ name, type, size: sizeText, desc, link })
  let updated = content

  if (!isNewCategory) {
    const esc = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const blockRe = new RegExp(`(<ResourceCategory title="${esc}">[\\s\\S]*?)(\\n  \\]\\" \\/>)` )
    const match = updated.match(blockRe)
    if (!match) {
      console.error(`✗ 分类块匹配失败: ${category}`)
      rl.close()
      process.exit(1)
    }
    updated = updated.replace(blockRe, (_, p1, p2) => `${p1}\n${itemLine}${p2}`)
  } else {
    // 新分类：插入到最后一个 </ResourceCategory> 之后（保持原有分隔线）
    const insertIdx = updated.lastIndexOf('</ResourceCategory>')
    if (insertIdx === -1) {
      console.error('✗ index.md 结构异常：未找到任何 ResourceCategory')
      rl.close()
      process.exit(1)
    }
    const newBlock =
      `\n\n<ResourceCategory title="${category}">\n` +
      `  <ResourceTable :items="[\n${itemLine}\n  ]" />\n` +
      `</ResourceCategory>`
    updated = updated.slice(0, insertIdx + '</ResourceCategory>'.length) + newBlock + updated.slice(insertIdx + '</ResourceCategory>'.length)
  }
  fs.writeFileSync(INDEX_MD, updated, 'utf8')

  console.log('')
  console.log('✔ 已更新：')
  console.log(`  - 附件: ${relDir}`)
  console.log(`  - 清单: docs/resources/index.md  [${isNewCategory ? '新增分类' : '已有分类'}] ${category}（${targetDir}/）`)

  // 6. git 提交推送
  if (args.noPush) {
    console.log('')
    console.log('✔ --no-push 模式完成，文件与清单已就绪，可手动 git add/commit/push')
    rl.close()
    return
  }

  const runGit = (cmdArgs) => {
    const r = spawnSync('git', cmdArgs, { cwd: REPO_ROOT, encoding: 'utf8' })
    if (r.status !== 0) {
      console.error(`✗ git ${cmdArgs.join(' ')} 失败:\n${r.stderr || r.stdout}`)
      process.exit(1)
    }
    return r.stdout.trim()
  }

  const commitMsg = `资源中心：新增附件「${name}」（${category.replace('📂 ', '')}）`
  runGit(['add', relDir, 'docs/resources/index.md'])
  runGit(['commit', '-m', commitMsg])
  runGit(['push', 'origin', 'HEAD'])
  console.log('')
  console.log('✔ 已提交并推送 main，GitHub Pages / Cloudflare Pages 将自动构建上线（约 1-3 分钟）')

  rl.close()
}

main().catch((e) => {
  console.error('✗ 执行失败:', e.message)
  rl.close()
  process.exit(1)
})
