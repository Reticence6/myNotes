import { defineConfig } from 'vitepress'
import path from 'node:path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'
import { getSidebarItems, getGroupedSidebarItems } from './utils/sidebar.mjs'
import { generatePdfMarkdown } from './utils/pdf-generator.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// 自动生成 PDF 对应 Markdown
generatePdfMarkdown(rootDir, 'postgraduate/paperNotes')

// LLM 分组配置
const llmGroups = {
    '1': '一、语言模型基础',
    '2': '二、大语言模型架构',
    '3': '三、Prompt工程',
    '4': '四、参数高效微调',
    '5': '五、模型编辑',
    '6': '六、检索增强生成RAG'
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    ignoreDeadLinks: true,
    base: '/myNotes/',
    title: "WJK's Awesome Notes",
    description: "A VitePress Site of learning notes",
    // 删除.html后缀
    cleanUrls: true,
    async buildEnd(siteConfig) {
        // 复制 PDF 文件到构建目录
        const pdfDir = path.resolve(rootDir, 'postgraduate/paperNotes')
        // siteConfig.outDir 是构建输出目录，例如 .vitepress/dist
        const targetDir = path.resolve(siteConfig.outDir, 'postgraduate/paperNotes')

        if (fs.existsSync(pdfDir)) {
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true })
            }

            const files = fs.readdirSync(pdfDir)
            files.forEach(file => {
                if (file.endsWith('.pdf')) {
                    const srcPath = path.join(pdfDir, file)
                    const destPath = path.join(targetDir, file)
                    fs.copyFileSync(srcPath, destPath)
                    console.log(`Copied PDF: ${file}`)
                }
            })
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        outlineTitle: '目录',
        outline: [1, 4],
        nav: [
            { text: 'Home', link: '/' },
            {
                text: '机器学习',
                items: [
                    { text: '机器学习', link: '/ML/机器学习/1.机器学习入门' },
                    { text: '大模型', link: '/ML/LLM/1-1.语言模型基础' },
                ]
            },
            { 
                text: '研究生学习', 
                items:[
                    { text: '论文笔记', link: '/postgraduate/paperNotes/20250415-PDG2Seq' }
                ]
            },
            {
                text: 'Web开发',
                items:[
                    { text: 'SpringBoot+Vue', link: '/Web开发/SpringBoot+Vue/1.SpringBoot介绍'},
                    { text: 'Java', link: '/Web开发/Java/1.基础语法'}
                ]
            },
            { text: 'Examples', link: '/examples/markdown-examples' }
        ],

        // 自定义文档页脚的上一页和下一页文本
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        sidebar: {
            '/examples/': [{
                text: 'Examples',
                collapsed: false,
                items: getSidebarItems(rootDir, 'examples')
            }],
            '/ML/机器学习': [{
                text: '机器学习',
                collapsed: false,
                items: getSidebarItems(rootDir, 'ML/机器学习')
            }],
            '/ML/LLM': [{
                text: 'LLM',
                collapsed: false,
                items: getGroupedSidebarItems(rootDir, 'ML/LLM', llmGroups)
            }],
            '/postgraduate/paperNotes': [{
                text: '论文笔记',
                collapsed: false,
                items: getSidebarItems(rootDir, 'postgraduate/paperNotes')
            }],
            '/Web开发/SpringBoot+Vue': [{
                text: 'SpringBoot+Vue',
                collapsed: false,
                items: getSidebarItems(rootDir, 'Web开发/SpringBoot+Vue')
            }],
            '/Web开发/Java': [{
                text: 'Java',
                collapsed: false,
                items: getSidebarItems(rootDir, 'Web开发/Java')
            }]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Reticence6' }
        ],

        // 底部配置
        footer: {
            copyright: "Copyright © 2025 Silence_WJK"
        },
        // 搜索框配置
        search: {
            provider: 'local',
            options: {
                // 这里是搜索框的提示文本
                placeholder: 'Search...',
                translations: {
                    button: {
                        'en': 'Search',
                        'zh': '搜索',
                    },
                    modal: {
                        'en': 'Search',
                        'zh': '搜索',
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                            closeText: "关闭"
                        }
                    }
                }
            }
        },
    },
    markdown: {
        math: true
    }
})