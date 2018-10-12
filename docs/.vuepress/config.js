module.exports = {
  title: '笔记收集',
  description: '',
  themeConfig: {
    sidebar: {
      '/vue/':[
        ''
      ]
    },
    sidebarDepth: 1
  },
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
  }
}