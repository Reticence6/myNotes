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
            { 
                text: '研究生学习', 
                items:[
                    { text:'论文笔记', link: '/postgraduate/paperNotes/20250415' }
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
                }, {
                    text: '二、大语言模型架构',
                    items: [
                        { text: '1.大模型架构概述', link: '/ML/LLM/2-1.大模型架构.md' },
                        { text: '2.基于Encoder-only架构的语言模型', link: '/ML/LLM/2-2.Encoder-only.md' },
                        { text: '3.基于Encoder-Decoder架构的语言模型', link: '/ML/LLM/2-3.Encoder-Decoder.md' },
                        { text: '4.基于Decoder-only架构的语言模型', link: '/ML/LLM/2-4.Decoder-only.md' },
                        { text: '5.Mamba模型', link: '/ML/LLM/2-5.Mamba.md' }
                    ]
                }, {
                    text: '三、Prompt工程',
                    items: [
                        { text: '1.Prompt工程概述', link: '/ML/LLM/3-1.Prompt工程简介.md' },
                        { text: '2.上下文学习', link: '/ML/LLM/3-2.上下文学习.md' },
                        { text: '3.思维链', link: '/ML/LLM/3-3.思维链.md' },
                        { text: '4.Prompt技巧及应用', link: '/ML/LLM/3-4.Prompt技巧及应用.md' },
                    ]
                }, {
                    text: '四、参数高效微调',
                    items: [
                        { text: '1.参数高效微调概述', link: '/ML/LLM/4-1.参数高效微调简介.md' },
                        { text: '2.参数附加方法', link: '/ML/LLM/4-2.参数附加方法.md' },
                        { text: '3.参数选择方法', link: '/ML/LLM/4-3.参数选择方法.md' },
                        { text: '4.低秩适配方法', link: '/ML/LLM/4-4.低秩适配方法.md' },
                    ]
                }, {
                    text: '五、模型编辑',
                    items: [
                        {text: '1.模型编辑的定义与性质', link:'/ML/LLM/5-1.模型编辑的定义与性质'},
                        {text: '2.T-Patcher和ROME', link:'/ML/LLM/5-2.T-Patcher和ROME'}
                    ]
                },{
                    text: '六、检索增强生成RAG',
                    items: [
                        {text: '1.RAG简介', link:'/ML/LLM/6-1.检索增强生成(RAG)简介'},
                        {text: '2.RAG知识检索', link:'/ML/LLM/6-2.RAG知识检索'},
                        {text: '3.RAG生成增强', link:'/ML/LLM/6-3.RAG生成增强'},
                        {text: '4.RAG降本增效', link:'/ML/LLM/6-4.RAG降本增效'},
                    ]
                }]
            }],
            '/postgraduate/paperNotes': [{
                text: '论文笔记',
                collapsed: false,
                items: [
                    { items: '20250415', link: '/postgraduate/paperNotes/20250415'},
                    { items: '20250422', link: '/postgraduate/paperNotes/20250422'},
                    { items: '20250429', link: '/postgraduate/paperNotes/20250429'},
                ]
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