import { defineConfig } from 'vitepress'

export default defineConfig({
  // === 站点基础 ===
  title: '跨境电商高级实战系列 · 学习网站',
  description:
    'L1 必修基础 · L2 分路径选修 · L3 高阶专精 —— 从课程到产品的完整学习体系',
  lang: 'zh-CN',

  // === Favicon ===
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

  // === 死链检查（忽略静态资源文件） ===
  ignoreDeadLinks: [
    /\.xlsx$/,
    /\.pdf$/,
    /\.zip$/,
    /\.docx$/,
    /\.pptx$/,
  ],

  // === Markdown 扩展 ===
  markdown: {
    lineNumbers: false,
    anchor: { permalink: undefined },
    toc: { level: [2, 3] },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },

  // === 主题配置 ===
  themeConfig: {
    logo: '/images/logo.svg',
    siteTitle: '跨境电商高级实战系列',

    // --- 顶部导航 ---
    nav: [
      { text: '体系总览', link: '/overview/' },
      { text: 'L1 必修课程', link: '/l1/' },
      { text: 'L2 选修课程', link: '/l2/' },
      { text: '知识库课程', link: '/courses/' },
      {
        text: '学习资源',
        items: [
          { text: '资源下载中心', link: '/resources/' },
          { text: '核心术语表', link: '/resources/glossary' },
          { text: '学习路线图', link: '/resources/learning-roadmap' },
          { text: '行业数据看板', link: '/resources/industry-data' },
          { text: '工具模板全景', link: '/resources/toolkit-preview' },
          { text: '入学诊断', link: '/resources/diagnosis' },
          { text: '先修包自学', link: '/resources/pre-study' },
        ],
      },
      { text: '案例库', link: '/cases/' },
      { text: '师资介绍', link: '/faculty/' },
      { text: '常见问题', link: '/faq/' },
    ],

    // --- 侧边栏（按路径多侧边栏） ---
    sidebar: {
      '/overview/': [
        {
          text: '体系总览',
          items: [
            { text: '课程体系总览', link: '/overview/' },
            { text: '分层课程体系详解', link: '/overview/layered-system' },
            { text: '案例库精选', link: '/overview/case-library' },
            { text: '核心数据亮点', link: '/overview/data-highlights' },
          ],
        },
      ],
      '/resources/': [
        {
          text: '学习资源',
          collapsed: false,
          items: [
            { text: '资源下载中心', link: '/resources/' },
            { text: '核心术语表', link: '/resources/glossary' },
            { text: '学习路线图', link: '/resources/learning-roadmap' },
            { text: '行业数据看板', link: '/resources/industry-data' },
            { text: '工具模板全景', link: '/resources/toolkit-preview' },
            { text: '入学诊断', link: '/resources/diagnosis' },
            { text: '先修包自学', link: '/resources/pre-study' },
          ],
        },
      ],
      '/cases/': [
        {
          text: '案例库',
          collapsed: false,
          items: [
            { text: '全部案例', link: '/cases/' },
          ],
        },
      ],
      '/l1/': [
        {
          text: 'L1 必修基础层',
          collapsed: false,
          items: [
            { text: 'L1 课程总览', link: '/l1/' },
            { text: 'L1-01 商业逻辑总览', link: '/l1/01-business-logic' },
            { text: 'L1-02 供应链全景认知', link: '/l1/02-supply-chain' },
            { text: 'L1-03 品牌出海 DTC 框架', link: '/l1/03-brand-dtc' },
            { text: 'L1-04 平台运营核心逻辑', link: '/l1/04-platform-ops' },
            { text: 'L1-05 物流与履约基础', link: '/l1/05-logistics' },
            { text: 'L1-06 合规风险地图', link: '/l1/06-compliance' },
            { text: 'L1-07 财务与成本认知', link: '/l1/07-finance-cost' },
            { text: 'L1-08 数据驱动入门', link: '/l1/08-data-driven' },
          ],
        },
      ],
      '/l2/': [
        {
          text: 'L2 分路径选修',
          collapsed: false,
          items: [
            { text: 'L2 课程总览', link: '/l2/' },
          ],
        },
        {
          text: 'L2-A 运营精进（24 课时）',
          collapsed: false,
          items: [
            { text: 'L2A-01 平台算法与流量', link: '/l2/a01-algorithm-traffic' },
            { text: 'L2A-02 Listing 高阶优化', link: '/l2/a02-listing-cro' },
            { text: 'L2A-03 广告投放与 ROI', link: '/l2/a03-ads-roi' },
            { text: 'L2A-04 AI 辅助运营实操', link: '/l2/a04-ai-ops' },
            { text: 'L2A-05 数据驱动决策', link: '/l2/a05-data-driven' },
            { text: 'L2A-06 社媒与 KOL 合作', link: '/l2/a06-social-kol' },
            { text: 'L2A-07 库存与供应链协同', link: '/l2/a07-inventory-scm' },
            { text: 'L2A-08 运营合规实操', link: '/l2/a08-compliance-ops' },
            { text: 'L2A-09 物流运营操作', link: '/l2/a09-logistics-ops' },
          ],
        },
        {
          text: 'L2-B 创业实战（22 课时）',
          collapsed: false,
          items: [
            { text: 'L2B-01 选品与市场调研', link: '/l2/b01-product-research' },
            { text: 'L2B-02 供应链从 0 搭建', link: '/l2/b02-supply-chain-setup' },
            { text: 'L2B-03 国内税务合规', link: '/l2/b03-tax-compliance' },
            { text: 'L2B-04 海外合规快速通道', link: '/l2/b04-overseas-compliance' },
            { text: 'L2B-05 资金链与外汇风控', link: '/l2/b05-finance-fx' },
            { text: 'L2B-06 创业团队搭建', link: '/l2/b06-team-building' },
            { text: 'L2B-07 品牌启动与冷启动', link: '/l2/b07-brand-launch' },
            { text: 'L2B-08 多平台快速启动', link: '/l2/b08-multi-platform' },
          ],
        },
        {
          text: 'L2-C 管理升级（19 课时）',
          collapsed: false,
          items: [
            { text: 'L2C-01 战略规划与商业模式', link: '/l2/c01-strategy' },
            { text: 'L2C-02 团队组织与绩效管理', link: '/l2/c02-organization' },
            { text: 'L2C-03 财务管控与经营分析', link: '/l2/c03-finance-digital' },
            { text: 'L2C-04 全链路风控体系', link: '/l2/c04-compliance-strategy' },
            { text: 'L2C-05 供应链战略与库存', link: '/l2/c05-supply-chain-strategy' },
            { text: 'L2C-06 品牌战略与全域增长', link: '/l2/c06-brand-strategy' },
            { text: 'L2C-07 数字化转型与 AI', link: '/l2/c07-digital-ai' },
          ],
        },
      ],
      '/courses/': [
        {
          text: '知识库课程',
          collapsed: false,
          items: [
            { text: '课程区说明', link: '/courses/' },
            {
              text: '供应链管理',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/supply-chain/' },
                { text: '全课大纲', link: '/courses/supply-chain/outline' },
                {
                  text: '试听样章：第1课',
                  link: '/courses/supply-chain/sample-lesson-1',
                },
                {
                  text: '工具包样例',
                  link: '/courses/supply-chain/toolkit-sample',
                },
              ],
            },
            {
              text: '平台运营',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/platform-operations/' },
                {
                  text: '全课大纲',
                  link: '/courses/platform-operations/outline',
                },
                {
                  text: '试听样章：第1课',
                  link: '/courses/platform-operations/sample-lesson-1',
                },
                {
                  text: '工具包样例',
                  link: '/courses/platform-operations/toolkit-sample',
                },
              ],
            },
            {
              text: '合规管理',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/compliance/' },
                { text: '全课大纲', link: '/courses/compliance/outline' },
                {
                  text: '试听样章：第1课',
                  link: '/courses/compliance/sample-lesson-1',
                },
                {
                  text: '工具包样例',
                  link: '/courses/compliance/toolkit-sample',
                },
              ],
            },
            {
              text: '品牌管理',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/brand-management/' },
                { text: '全课大纲', link: '/courses/brand-management/outline' },
                {
                  text: '试听样章：第1课',
                  link: '/courses/brand-management/sample-lesson-1',
                },
                {
                  text: '工具包样例',
                  link: '/courses/brand-management/toolkit-sample',
                },
              ],
            },
            {
              text: '物流与海外仓',
              collapsed: true,
              items: [
                {
                  text: '课程简介',
                  link: '/courses/logistics-overseas-warehouse/',
                },
                {
                  text: '全课大纲',
                  link: '/courses/logistics-overseas-warehouse/outline',
                },
                {
                  text: '试听样章：第1课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-1',
                },
                {
                  text: '工具包样例',
                  link: '/courses/logistics-overseas-warehouse/toolkit-sample',
                },
              ],
            },
            {
              text: '供应链落地执行',
              collapsed: true,
              items: [
                {
                  text: '课程简介',
                  link: '/courses/supply-chain-execution/',
                },
                {
                  text: '全课大纲',
                  link: '/courses/supply-chain-execution/outline',
                },
                {
                  text: '试听样章：第1课',
                  link: '/courses/supply-chain-execution/sample-lesson-1',
                },
                {
                  text: '工具包样例',
                  link: '/courses/supply-chain-execution/toolkit-sample',
                },
              ],
            },
          ],
        },
      ],
    },

    // --- 右侧锚点 ---
    aside: true,
    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    // --- 上下页导航 ---
    docFooter: {
      prev: '上一课',
      next: '下一课',
    },

    // --- 页脚 ---
    footer: {
      message:
        '完整课程资料面向报名学员定向分发，本站仅公开课程大纲与试听样章',
      copyright: `跨境电商高级实战系列 · 学习网站 ｜ Copyright © ${new Date().getFullYear()}`,
    },

    // --- 编辑链接 ---
    editLink: {
      pattern: 'https://github.com/your-org/course-site/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    // --- 最后更新 ---
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short',
      },
    },

    // --- 社交链接 ---
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/course-site' },
    ],

    // --- 搜索（本地搜索） ---
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详细信息',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有结果',
            footer: {
              selectText: '选择',
              navigateText: '导航',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
})
