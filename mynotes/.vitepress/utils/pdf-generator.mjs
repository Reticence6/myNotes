import fs from 'node:fs'
import path from 'node:path'

/**
 * 扫描指定目录下的 PDF 文件，并为每个 PDF 生成一个对应的 Markdown 文件（如果不存在）
 * Markdown 文件内容为调用 PDFViewer 组件
 * 
 * @param {string} rootDir 项目根目录 (mynotes)
 * @param {string} relativeDir 相对路径，例如 'postgraduate/paperNotes'
 */
export function generatePdfMarkdown(rootDir, relativeDir) {
    const dirPath = path.join(rootDir, relativeDir)
    if (!fs.existsSync(dirPath)) return

    const files = fs.readdirSync(dirPath)

    files.forEach(file => {
        if (!file.endsWith('.pdf')) return

        const name = file.replace('.pdf', '')
        const mdFileName = `${name}.md`
        const mdFilePath = path.join(dirPath, mdFileName)

        // 如果 md 文件不存在，则生成
        if (!fs.existsSync(mdFilePath)) {
            const pdfUrl = path.join('/', relativeDir, file).replace(/\\/g, '/')
            const content = `---
layout: doc
---

# ${name}

<PDFViewer src="${pdfUrl}" />
`
            fs.writeFileSync(mdFilePath, content, 'utf-8')
            console.log(`Generated: ${mdFilePath}`)
        }
    })
}
