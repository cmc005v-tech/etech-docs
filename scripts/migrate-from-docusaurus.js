/**
 * Docusaurus → VitePress 内容迁移脚本
 * 
 * 功能：
 * 1. 复制 6 门课程的 24 个 Markdown 文件
 * 2. 替换 :::note → ::: info
 * 3. 修正内部链接（去掉 /docs 前缀）
 * 4. 移除 sidebar_position（VitePress 不需要）
 * 5. 复制 resources 页面
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OLD_DOCS = path.resolve(ROOT, '..', 'course-site', 'docs')
const NEW_DOCS = path.resolve(ROOT, 'docs')

// 课程目录列表
const COURSES = [
  'supply-chain',
  'platform-operations',
  'compliance',
  'brand-management',
  'logistics-overseas-warehouse',
  'supply-chain-execution',
]

// 每个课程的文件列表
const COURSE_FILES = ['index.md', 'outline.md', 'sample-lesson-1.md', 'toolkit-sample.md']

/**
 * 转换 Markdown 内容：Docusaurus → VitePress
 */
function transformContent(content, filePath) {
  let result = content

  // 1. 替换 :::note → ::: info（Docusaurus 特有，VitePress 用 info）
  result = result.replace(/^:::note\b/gm, '::: info')

  // 2. 修正内部链接：去掉 /docs 前缀
  result = result.replace(/\/docs\//g, '/')

  // 3. 移除 sidebar_position（VitePress 侧边栏由 config.ts 控制）
  result = result.replace(/^sidebar_position:\s*\d+\s*\n/gm, '')

  // 4. 移除 import 语句（VitePress 全局注册组件，无需导入）
  result = result.replace(/^import\s+.+\s+from\s+['"].+['"]\s*;?\s*$/gm, '')

  // 5. 修正 :::info → ::: info（确保空格一致）
  result = result.replace(/^:::info\b/gm, '::: info')

  return result
}

/**
 * 迁移单个文件
 */
function migrateFile(relativePath) {
  const srcPath = path.join(OLD_DOCS, relativePath)
  const destPath = path.join(NEW_DOCS, relativePath)

  if (!fs.existsSync(srcPath)) {
    console.log(`  ⚠ 跳过（不存在）: ${relativePath}`)
    return false
  }

  // 确保目标目录存在
  const destDir = path.dirname(destPath)
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  const content = fs.readFileSync(srcPath, 'utf-8')
  const transformed = transformContent(content, relativePath)
  fs.writeFileSync(destPath, transformed, 'utf-8')

  console.log(`  ✓ 迁移: ${relativePath}`)
  return true
}

// === 主流程 ===
console.log('\n📦 开始 Docusaurus → VitePress 内容迁移\n')

// 1. 迁移课程文件
let migrated = 0
let skipped = 0

console.log('📚 迁移课程文件...')
for (const course of COURSES) {
  for (const file of COURSE_FILES) {
    const relativePath = `courses/${course}/${file}`
    if (migrateFile(relativePath)) {
      migrated++
    } else {
      skipped++
    }
  }
}

// 2. 迁移资源页面
console.log('\n📄 迁移资源页面...')
const resourceFiles = [
  ['resources/diagnosis.md', 'resources/diagnosis.md'],
  ['resources/pre-study.md', 'resources/pre-study.md'],
]

for (const [src, dest] of resourceFiles) {
  const srcPath = path.join(OLD_DOCS, src)
  if (fs.existsSync(srcPath)) {
    const content = fs.readFileSync(srcPath, 'utf-8')
    const transformed = transformContent(content, src)
    const destPath = path.join(NEW_DOCS, dest)
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    fs.writeFileSync(destPath, transformed, 'utf-8')
    console.log(`  ✓ 迁移: ${src}`)
    migrated++
  } else {
    console.log(`  ⚠ 跳过（不存在）: ${src}`)
    skipped++
  }
}

console.log(`\n✅ 迁移完成！成功: ${migrated}, 跳过: ${skipped}`)
