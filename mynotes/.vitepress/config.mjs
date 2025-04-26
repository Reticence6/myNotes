import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/myNotes/',
    title: "WJK's Awesome Notes",
    description: "A VitePress Site of learning notes",
    // 删除.html后缀
    cleanUrls: true,
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
            { text: 'Examples', link: '/examples/markdown-examples' }
        ],

        sidebar: {
            '/examples/': [{
                text: 'Examples',
                collapsed: false,
                items: [
                    { text: 'Markdown Examples', link: '/examples/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/examples/api-examples' }
                ]
            }],
            '/ML/机器学习': [{
                text: '机器学习',
                collapsed: false,
                items: [
                    { text: '1.机器学习入门', link: '/ML/机器学习/1.机器学习入门' },
                    { text: '2.预备知识', link: '/ML/机器学习/2.预备知识' },
                    { text: '3.线性神经网络', link: '/ML/机器学习/3.线性神经网络' },
                    { text: '68.Transformer', link: '/ML/机器学习/68.Transformer.md' },
                ]
            }],
            '/ML/LLM': [{
                text: 'LLM',
                collapsed: false,
                items: [{
                    text: '一、语言模型基础',
                    items: [
                        { text: '1.基本概念', link: '/ML/LLM/1-1.语言模型基础' },
                        { text: '2.RNN与Transformer', link: '/ML/LLM/1-2.RNN与Transformer' },
                        { text: '3.语言模型的采样与评测', link: '/ML/LLM/1-3.语言模型的采样' },
                    ]
                }]
            }],
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