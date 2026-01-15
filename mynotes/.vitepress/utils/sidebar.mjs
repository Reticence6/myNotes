import path from 'node:path'
import fs from 'node:fs'

const IGNORE_LIST = ['.vitepress', 'node_modules', '.idea', 'assets', 'public', 'index.md', '.DS_Store', 'images', 'utils']

// 智能数字排序 (e.g. "1-1.xxx" < "1-2.xxx", "1.xxx" < "2.xxx")
const sortByNumber = (a, b) => {
    const numsA = a.text.match(/\d+/g)?.map(Number) || [0]
    const numsB = b.text.match(/\d+/g)?.map(Number) || [0]
    
    for (let i = 0; i < Math.max(numsA.length, numsB.length); i++) {
        const valA = numsA[i] || 0
        const valB = numsB[i] || 0
        if (valA !== valB) return valA - valB
    }
    return 0
}

/**
 * 获取指定目录下的所有 Markdown 文件作为侧边栏项
 * @param {string} rootDir 项目根目录 (mynotes)
 * @param {string} relativeDir 相对路径，例如 'ML/机器学习'
 * @returns {Array} sidebar items
 */
export function getSidebarItems(rootDir, relativeDir) {
    const dirPath = path.join(rootDir, relativeDir)
    if (!fs.existsSync(dirPath)) return []

    const files = fs.readdirSync(dirPath)
    const items = []

    files.forEach(file => {
        if (!file.endsWith('.md') || IGNORE_LIST.includes(file)) return

        const name = file.replace('.md', '')
        items.push({
            text: name,
            link: path.join('/', relativeDir, name).replace(/\\/g, '/')
        })
    })

    return items.sort(sortByNumber)
}

/**
 * 专门处理 LLM 这种需要根据文件名前缀分组的情况
 * @param {string} rootDir 项目根目录 (mynotes)
 * @param {string} relativeDir 相对路径，例如 'ML/LLM'
 * @param {Object} groups 分组映射，例如 { '1': '一、基础', '2': '二、架构' }
 */
export function getGroupedSidebarItems(rootDir, relativeDir, groups) {
    const dirPath = path.join(rootDir, relativeDir)
    if (!fs.existsSync(dirPath)) return []

    const files = fs.readdirSync(dirPath)
    const groupedItems = {}

    // 初始化分组
    Object.keys(groups).forEach(key => {
        groupedItems[key] = {
            text: groups[key],
            collapsed: false,
            items: []
        }
    })
    
    const otherItems = []

    files.forEach(file => {
        if (!file.endsWith('.md') || IGNORE_LIST.includes(file)) return

        const name = file.replace('.md', '')
        const link = path.join('/', relativeDir, name).replace(/\\/g, '/')
        
        // 尝试匹配前缀，例如 "1-1.xxx" 匹配 "1"
        const match = name.match(/^(\d+)[-.]/)
        if (match && groups[match[1]]) {
            groupedItems[match[1]].items.push({ text: name, link })
        } else {
            otherItems.push({ text: name, link })
        }
    })

    // 将结果转换为数组
    const result = Object.values(groupedItems).filter(group => group.items.length > 0)
    
    // 对每个组内的 items 进行排序
    result.forEach(group => {
        group.items.sort(sortByNumber)
    })

    // 如果有其他文件，也加进去
    if (otherItems.length > 0) {
        otherItems.sort(sortByNumber)
        result.push(...otherItems)
    }

    return result
}
