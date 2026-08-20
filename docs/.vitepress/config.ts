import { defineConfig } from 'vitepress'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // === 站点基础 ===
  title: '跨境电商高级实战系列 · 学习网站',
  description:
    'L1 必修基础 · L2 分路径选修 · L3 高阶专精 —— 从课程到产品的完整学习体系',
  lang: 'zh-CN',

  // === Favicon + 默认浅色模式 + SEO ===
  // 首次访问或存储为 auto 时，预置为浅色偏好，避免跟随系统深色给长文本阅读带来负担
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '跨境电商高级实战系列 · 学习网站' }],
    ['meta', { property: 'og:description', content: 'L1 必修基础 · L2 分路径选修 · L3 高阶专精 —— 从课程到产品的完整学习体系' }],
    ['meta', { property: 'og:site_name', content: '跨境电商高级实战系列' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '跨境电商高级实战系列 · 学习网站' }],
    ['meta', { name: 'twitter:description', content: 'L1 必修基础 · L2 分路径选修 · L3 高阶专精' }],
    // 其他 SEO
    ['meta', { name: 'keywords', content: '跨境电商,亚马逊运营,TikTok Shop,品牌出海,供应链管理,合规风控,DTC独立站' }],
    ['meta', { name: 'author', content: '跨境电商高级实战系列' }],
    [
      'script',
      {},
      `try{var _v=localStorage.getItem('vitepress-theme-appearance');if(!_v||_v==='auto'){localStorage.setItem('vitepress-theme-appearance','light')}}catch(e){}`,
    ],
  ],

  // === 外观：右上角亮/暗切换按钮，用户自主选择 ===
  // 切换结果由主题层 MutationObserver 固化为明确的 light/dark（见 theme/index.ts），防止写回 auto 后跟随系统
  appearance: true,

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
    // 注意：不可覆盖 anchor.permalink——本地搜索索引依赖标题内的锚点链接切分章节
    toc: { level: [2, 3] },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },

  // === Vite 插件配置 ===
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: '跨境电商高级实战系列 · 学习网站',
          short_name: '跨境电商课程',
          description: 'L1 必修基础 · L2 分路径选修 · L3 高阶专精',
          theme_color: '#3b82f6',
          background_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{html,css,js,json,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
          ],
        },
      }),
    ],
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
      { text: 'L3 毕业项目', link: '/l3/' },
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
          { text: '学习证书', link: '/resources/certificate' },
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
            { text: '学习证书', link: '/resources/certificate' },
            { text: '先修包自学', link: '/resources/pre-study' },
            { text: '学习指南', link: '/resources/study-guide' },
            { text: '行业报告摘要', link: '/resources/industry-reports' },
            { text: '讲师手册样例', link: '/resources/instructor-handbook-sample' },
            { text: '学员成果展示', link: '/resources/student-showcase' },
            { text: '我的学习进度', link: '/resources/progress' },
          ],
        },
      ],
      '/cases/': [
        {
          text: '案例库',
          collapsed: false,
          items: [{ text: '全部案例', link: '/cases/' }],
        },
        {
          text: '🏭 供应链管理',
          collapsed: true,
          items: [
            { text: 'SC-01 巨星科技FBA供应链优化', link: '/cases/sc-01' },
            { text: 'SC-02 万魔声学供应链数字化', link: '/cases/sc-02' },
            { text: 'SC-03 瑞贝卡供应链失控', link: '/cases/sc-03' },
            { text: 'SC-04 直邮时代黄昏', link: '/cases/sc-04' },
            { text: 'SC-05 领星ERP数据泄露', link: '/cases/sc-05' },
          ],
        },
        {
          text: '🛒 平台运营',
          collapsed: true,
          items: [
            { text: 'PO-01 温州小伙跨境卖锅', link: '/cases/po-01' },
            { text: 'PO-02 户外卖家扭亏三招', link: '/cases/po-02' },
            { text: 'PO-03 3D蝙蝠灯TikTok爆款', link: '/cases/po-03' },
            { text: 'PO-04 TikTok服务商跑路封店', link: '/cases/po-04' },
            { text: 'PO-05 亚马逊Cosmo算法', link: '/cases/po-05' },
          ],
        },
        {
          text: '🏷️ 海外品牌管理',
          collapsed: true,
          items: [
            { text: 'BM-01 ELEGOO独立站品牌', link: '/cases/bm-01' },
            { text: 'BM-02 盖世小鸡拉美品牌', link: '/cases/bm-02' },
            { text: 'BM-03 乐歌品牌转型上市', link: '/cases/bm-03' },
            { text: 'BM-04 ITEAWORLD茶叶出海', link: '/cases/bm-04' },
            { text: 'BM-05 爆款商标被抢注', link: '/cases/bm-05' },
          ],
        },
        {
          text: '⚖️ 合规管理',
          collapsed: true,
          items: [
            { text: 'CM-01 厦门税务被重罚', link: '/cases/cm-01' },
            { text: 'CM-02 海外仓被查扣5万件', link: '/cases/cm-02' },
            { text: 'CM-03 TRO闪粉肌理图侵权', link: '/cases/cm-03' },
            { text: 'CM-04 贸法通案例集', link: '/cases/cm-04' },
            { text: 'CM-05 欧盟PPWR包装法规', link: '/cases/cm-05' },
            { text: 'CM-06 USPTO商标合规调查', link: '/cases/cm-06' },
            { text: 'CM-07 欧盟小包裹税', link: '/cases/cm-07' },
          ],
        },
        {
          text: '🚢 物流履约',
          collapsed: true,
          items: [
            { text: 'LF-01 洛杉矶海外仓暴雷', link: '/cases/lf-01' },
            { text: 'LF-02 鹿特丹高温扣170万件', link: '/cases/lf-02' },
            { text: 'LF-03 10年FBA实战', link: '/cases/lf-03' },
            { text: 'LF-04 TikTok FBT仓发', link: '/cases/lf-04' },
            { text: 'LF-05 深圳货代暴雷', link: '/cases/lf-05' },
            { text: 'LF-06 欧洲前置仓研判', link: '/cases/lf-06' },
            { text: 'LF-07 英国专线小包政策', link: '/cases/lf-07' },
            { text: 'LF-08 英国海外仓合同风控', link: '/cases/lf-08' },
          ],
        },
        {
          text: '🧭 商业本质',
          collapsed: true,
          items: [
            { text: 'BE-01 鲜花电商失败复盘', link: '/cases/be-01' },
            { text: 'BE-02 航空包机三阶段壁垒', link: '/cases/be-02' },
            { text: 'BE-03 森大集团先贸易后建厂', link: '/cases/be-03' },
            { text: 'BE-04 Labubu娃衣泡沫', link: '/cases/be-04' },
            { text: 'BE-05 宠物鲜食高潜赛道', link: '/cases/be-05' },
            { text: 'BE-06 泳池清洁机器人', link: '/cases/be-06' },
          ],
        },
      ],
      '/l1/': [
        {
          text: 'L1 必修基础层',
          collapsed: false,
          items: [
            { text: 'L1 课程总览', link: '/l1/' },
            { text: '🎧 试听：L1-01 盈利模型', link: '/l1/01-sample-lesson' },
            { text: '🎧 试听：L1-02 供应链全链路', link: '/l1/02-sample-lesson' },
            { text: '🎧 试听：L1-03 品牌分界线', link: '/l1/03-sample-lesson' },
            { text: '🎧 试听：L1-04 平台选型', link: '/l1/04-sample-lesson' },
            { text: '🎧 试听：L1-05 物流六大模式', link: '/l1/05-sample-lesson' },
            { text: '🎧 试听：L1-06 合规七大维度', link: '/l1/06-sample-lesson' },
            { text: '🎧 试听：L1-07 成本结构拆解', link: '/l1/07-sample-lesson' },
            { text: '🎧 试听：L1-08 数据驱动入门', link: '/l1/08-sample-lesson' },
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
            { text: '🎧 试听：L2A-01 算法与流量', link: '/l2/a01-sample-lesson' },
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
            { text: '🎧 试听：L2B-01 选品与调研', link: '/l2/b01-sample-lesson' },
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
            { text: '🎧 试听：L2C-01 战略规划', link: '/l2/c01-sample-lesson' },
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
      '/l3/': [
        {
          text: 'L3 高阶毕业项目',
          collapsed: false,
          items: [
            { text: 'L3 项目总览', link: '/l3/' },
            { text: 'L3-A 运营操盘手毕业项目', link: '/l3/l3a-operations-project' },
            { text: '🎧 试听：L3-A 项目导论', link: '/l3/l3a-sample-lesson' },
            { text: 'L3-B 创业实战沙盘', link: '/l3/l3b-startup-sandbox' },
            { text: '🎧 试听：L3-B 沙盘导论', link: '/l3/l3b-sample-lesson' },
            { text: 'L3-C 战略决策模拟', link: '/l3/l3c-strategy-simulation' },
            { text: '🎧 试听：L3-C 推演导论', link: '/l3/l3c-sample-lesson' },
          ],
        },
      ],
      '/courses/': [
        {
          text: '知识库课程',
          collapsed: false,
          items: [
            { text: '课程区说明', link: '/courses/' },
            { text: '课程选型指南', link: '/courses/course-selection' },
            {
              text: '供应链管理',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/supply-chain/' },
                { text: '学习路线图', link: '/courses/supply-chain/learning-path' },
                { text: '课程 FAQ', link: '/courses/supply-chain/faq' },
                { text: '全课大纲', link: '/courses/supply-chain/outline' },
                {
                  text: '试听样章：第1课',
                  link: '/courses/supply-chain/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/supply-chain/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/supply-chain/sample-lesson-3',
                },
                {
                  text: '试听样章：第4课',
                  link: '/courses/supply-chain/sample-lesson-4',
                },
                {
                  text: '试听样章：第5课',
                  link: '/courses/supply-chain/sample-lesson-5',
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
                  text: '学习路线图',
                  link: '/courses/platform-operations/learning-path',
                },
                { text: '课程 FAQ', link: '/courses/platform-operations/faq' },
                {
                  text: '全课大纲',
                  link: '/courses/platform-operations/outline',
                },
                {
                  text: '试听样章：第1课',
                  link: '/courses/platform-operations/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/platform-operations/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/platform-operations/sample-lesson-3',
                },
                {
                  text: '试听样章：第4课',
                  link: '/courses/platform-operations/sample-lesson-4',
                },
                {
                  text: '试听样章：第5课',
                  link: '/courses/platform-operations/sample-lesson-5',
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
                { text: '学习路线图', link: '/courses/compliance/learning-path' },
                { text: '课程 FAQ', link: '/courses/compliance/faq' },
                { text: '全课大纲', link: '/courses/compliance/outline' },
                {
                  text: '试听样章：第1课',
                  link: '/courses/compliance/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/compliance/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/compliance/sample-lesson-3',
                },
                {
                  text: '试听样章：第4课',
                  link: '/courses/compliance/sample-lesson-4',
                },
                {
                  text: '试听样章：第5课',
                  link: '/courses/compliance/sample-lesson-5',
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
                {
                  text: '学习路线图',
                  link: '/courses/brand-management/learning-path',
                },
                { text: '课程 FAQ', link: '/courses/brand-management/faq' },
                { text: '全课大纲', link: '/courses/brand-management/outline' },
                {
                  text: '试听样章：第1课',
                  link: '/courses/brand-management/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/brand-management/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/brand-management/sample-lesson-3',
                },
                {
                  text: '试听样章：第4课',
                  link: '/courses/brand-management/sample-lesson-4',
                },
                {
                  text: '试听样章：第5课',
                  link: '/courses/brand-management/sample-lesson-5',
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
                  text: '学习路线图',
                  link: '/courses/logistics-overseas-warehouse/learning-path',
                },
                {
                  text: '课程 FAQ',
                  link: '/courses/logistics-overseas-warehouse/faq',
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
                  text: '试听样章：第2课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-3',
                },
                {
                  text: '试听样章：第4课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-4',
                },
                {
                  text: '试听样章：第5课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-5',
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
                  text: '学习路线图',
                  link: '/courses/supply-chain-execution/learning-path',
                },
                {
                  text: '课程 FAQ',
                  link: '/courses/supply-chain-execution/faq',
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
                  text: '试听样章：第2课',
                  link: '/courses/supply-chain-execution/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/supply-chain-execution/sample-lesson-3',
                },
                {
                  text: '试听样章：第4课',
                  link: '/courses/supply-chain-execution/sample-lesson-4',
                },
                {
                  text: '试听样章：第5课',
                  link: '/courses/supply-chain-execution/sample-lesson-5',
                },
                {
                  text: '工具包样例',
                  link: '/courses/supply-chain-execution/toolkit-sample',
                },
              ],
            },
            {
              text: '财务管控与经营分析',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/finance-management/' },
                {
                  text: '学习路线图',
                  link: '/courses/finance-management/learning-path',
                },
                { text: '课程 FAQ', link: '/courses/finance-management/faq' },
                {
                  text: '全课大纲',
                  link: '/courses/finance-management/outline',
                },
                {
                  text: '试听样章：第1课',
                  link: '/courses/finance-management/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/finance-management/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/finance-management/sample-lesson-3',
                },
                {
                  text: '工具包样例',
                  link: '/courses/finance-management/toolkit-sample',
                },
              ],
            },
            {
              text: '资金链与外汇风控',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/cashflow-forex/' },
                {
                  text: '学习路线图',
                  link: '/courses/cashflow-forex/learning-path',
                },
                { text: '课程 FAQ', link: '/courses/cashflow-forex/faq' },
                { text: '全课大纲', link: '/courses/cashflow-forex/outline' },
                {
                  text: '试听样章：第1课',
                  link: '/courses/cashflow-forex/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/cashflow-forex/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/cashflow-forex/sample-lesson-3',
                },
                {
                  text: '工具包样例',
                  link: '/courses/cashflow-forex/toolkit-sample',
                },
              ],
            },
            {
              text: '数字化转型与AI赋能',
              collapsed: true,
              items: [
                {
                  text: '课程简介',
                  link: '/courses/digital-transformation/',
                },
                {
                  text: '学习路线图',
                  link: '/courses/digital-transformation/learning-path',
                },
                {
                  text: '课程 FAQ',
                  link: '/courses/digital-transformation/faq',
                },
                {
                  text: '全课大纲',
                  link: '/courses/digital-transformation/outline',
                },
                {
                  text: '试听样章：第1课',
                  link: '/courses/digital-transformation/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/digital-transformation/sample-lesson-2',
                },
                {
                  text: '工具包样例',
                  link: '/courses/digital-transformation/toolkit-sample',
                },
              ],
            },
            {
              text: '团队组织与项目管理',
              collapsed: true,
              items: [
                { text: '课程简介', link: '/courses/team-management/' },
                {
                  text: '学习路线图',
                  link: '/courses/team-management/learning-path',
                },
                { text: '课程 FAQ', link: '/courses/team-management/faq' },
                {
                  text: '全课大纲',
                  link: '/courses/team-management/outline',
                },
                {
                  text: '试听样章：第1课',
                  link: '/courses/team-management/sample-lesson-1',
                },
                {
                  text: '试听样章：第2课',
                  link: '/courses/team-management/sample-lesson-2',
                },
                {
                  text: '试听样章：第3课',
                  link: '/courses/team-management/sample-lesson-3',
                },
                {
                  text: '工具包样例',
                  link: '/courses/team-management/toolkit-sample',
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
