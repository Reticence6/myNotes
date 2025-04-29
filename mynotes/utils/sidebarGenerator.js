import { readdirSync } from 'fs';
import { join, relative } from 'path';

/**
 * 自动生成侧边栏配置的工具类
 */
export class SidebarGenerator {
    /**
     * @param {Object} options 配置选项
     * @param {string} options.rootDir 根目录路径
     * @param {number} options.maxDepth 最大目录深度
     * @param {string[]} options.excludeDirs 要排除的目录
     * @param {string[]} options.excludeFiles 要排除的文件
     * @param {Function} options.sortFn 自定义排序函数
     */
    constructor(options = {}) {
        this.rootDir = options.rootDir || '';
        this.maxDepth = options.maxDepth || 3;
        this.excludeDirs = options.excludeDirs || ['.vitepress', 'utils'];
        this.excludeFiles = options.excludeFiles || ['index.md'];
        this.sortFn = options.sortFn || this.defaultSortFn;
    }

    /**
     * 默认排序函数
     * @param {string} a 
     * @param {string} b 
     * @returns {number}
     */
    defaultSortFn(a, b) {
        // 提取数字前缀进行比较
        const numA = parseInt((a.match(/^\d+/) || ['0'])[0]);
        const numB = parseInt((b.match(/^\d+/) || ['0'])[0]);
        return numA - numB;
    }

    /**
     * 生成侧边栏配置
     * @returns {Object} 侧边栏配置
     */
    generate() {
        const sidebar = {};
        this.scanDirectory(this.rootDir, sidebar);
        return sidebar;
    }

    /**
     * 扫描目录并生成配置
     * @param {string} dirPath 目录路径
     * @param {Object} sidebar 侧边栏配置对象
     * @param {number} depth 当前深度
     */
    scanDirectory(dirPath, sidebar, depth = 0) {
        if (depth >= this.maxDepth) return;

        const items = [];
        const entries = readdirSync(dirPath, { withFileTypes: true });

        // 先处理目录
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const dirName = entry.name;
                if (this.excludeDirs.includes(dirName)) continue;

                const subDirPath = join(dirPath, dirName);
                const subItems = [];
                this.scanDirectory(subDirPath, sidebar, depth + 1);

                // 如果子目录有内容，添加到当前目录的items中
                if (sidebar[`/${dirName}/`]) {
                    items.push({
                        text: dirName,
                        items: sidebar[`/${dirName}/`]
                    });
                }
            }
        }

        // 处理文件
        for (const entry of entries) {
            if (entry.isFile() && entry.name.endsWith('.md')) {
                const fileName = entry.name;
                if (this.excludeFiles.includes(fileName)) continue;

                const filePath = join(dirPath, fileName);
                const relativePath = relative(this.rootDir, filePath)
                    .replace(/\\/g, '/')
                    .replace(/\.md$/, '');

                items.push({
                    text: fileName.replace(/\.md$/, ''),
                    link: `/${relativePath}`
                });
            }
        }

        // 如果有内容，添加到sidebar中
        if (items.length > 0) {
            const relativePath = relative(this.rootDir, dirPath)
                .replace(/\\/g, '/');
            const key = `/${relativePath}/`;
            sidebar[key] = items.sort((a, b) => this.sortFn(a.text, b.text));
        }
    }
}