import { defineConfig } from 'vitepress'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // === 站点基础 ===
  title: '跨境电商高级实战系列 · 学习网站',
  description:
    'L1 必修基础 · L2 分路径选修 · L3 高阶专精 —— 从课程到产品的学习体系',
  lang: 'zh-CN',
  // Cloudflare Pages / GitHub Pages 均部署在根域名，base 统一为 /
  base: '/',

  // === Favicon + 默认浅色模式 + SEO ===
  // 首次访问或存储为 auto 时，预置为浅色偏好，避免跟随系统深色给长文本阅读带来负担
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '跨境电商高级实战系列 · 学习网站' }],
    ['meta', { property: 'og:description', content: 'L1 必修基础 · L2 分路径选修 · L3 高阶专精 —— 从课程到产品的学习体系' }],
    ['meta', { property: 'og:site_name', content: '跨境电商高级实战系列' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '跨境电商高级实战系列 · 学习网站' }],
    ['meta', { name: 'twitter:description', content: 'L1 必修基础 · L2 分路径选修 · L3 高阶专精' }],
    // 其他 SEO
    ['meta', { name: 'keywords', content: '跨境电商,亚马逊运营,TikTok Shop,品牌出海,供应链管理,合规风控,DTC独立站' }],
    ['meta', { name: 'author', content: '跨境电商高级实战系列' }],
    // Google Analytics 4（请替换 G-XXXXXXXXXX 为实际 Measurement ID）
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }],
    [
      'script',
      {},
      `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,
    ],
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
    build: {
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 将 node_modules 中的大型依赖单独分包
            if (id.includes('node_modules')) {
              if (id.includes('@vue/') || id.includes('vue/')) return 'vue-vendor'
              if (id.includes('minisearch')) return 'search-vendor'
            }
          },
        },
      },
    },
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
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB (资源矩阵页面导致搜索索引变大)
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
          { text: '学习资源矩阵', link: '/resources/resource-matrix' },
          { text: '工具模板全景', link: '/resources/toolkit-preview' },
          { text: '入学诊断', link: '/resources/diagnosis' },
          { text: '学习证书', link: '/resources/certificate' },
          { text: '先修包自学', link: '/resources/pre-study' },
        ],
      },
      { text: '案例库', link: '/cases/' },
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
            { text: '学习资源矩阵', link: '/resources/resource-matrix' },
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
          text: '⚖️ 正反配对专题',
          collapsed: true,
          items: [
            { text: '📦 供应链对决：SC-01 vs SC-03', link: '/cases/comparison/sc-01-sc-03' },
            { text: '🏷️ 品牌保卫战：BM-01 vs BM-05', link: '/cases/comparison/bm-01-bm-05' },
            { text: '🛒 平台生存法则：PO-01 vs PO-04', link: '/cases/comparison/po-01-po-04' },
            { text: '🧭 创业生死线：BE-02 vs BE-01', link: '/cases/comparison/be-02-be-01' },
          ],
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
            { text: 'L1-01 跨境电商商业逻辑总览', link: '/l1/01-business-logic' },
            { text: 'L1-02 跨境供应链全景认知', link: '/l1/02-supply-chain' },
            { text: 'L1-03 品牌出海 DTC 基础框架', link: '/l1/03-brand-dtc' },
            { text: 'L1-04 平台运营核心逻辑', link: '/l1/04-platform-ops' },
            { text: 'L1-05 跨境物流与履约基础', link: '/l1/05-logistics' },
            { text: 'L1-06 全链路合规风险地图', link: '/l1/06-compliance' },
            { text: 'L1-07 跨境财务与成本认知', link: '/l1/07-finance-cost' },
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
            { text: 'L2A-01 平台算法深度解析与流量获取', link: '/l2/a01-algorithm-traffic' },
            { text: 'L2A-02 Listing 高阶优化与 CRO 转化', link: '/l2/a02-listing-cro' },
            { text: 'L2A-03 广告投放策略与 ROI 优化', link: '/l2/a03-ads-roi' },
            { text: 'L2A-04 AI 辅助运营实操', link: '/l2/a04-ai-ops' },
            { text: 'L2A-05 数据驱动运营决策', link: '/l2/a05-data-driven' },
            { text: 'L2A-06 社媒内容运营与 KOL 合作', link: '/l2/a06-social-kol' },
            { text: 'L2A-07 库存与供应链运营协同', link: '/l2/a07-inventory-scm' },
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
            { text: 'L2B-03 国内主体税务合规实操', link: '/l2/b03-tax-compliance' },
            { text: 'L2B-04 海外合规快速通道', link: '/l2/b04-overseas-compliance' },
            { text: 'L2B-05 资金链管理与外汇风控', link: '/l2/b05-finance-fx' },
            { text: 'L2B-06 创业团队搭建与分工', link: '/l2/b06-team-building' },
            { text: 'L2B-07 0-1 品牌启动与冷启动', link: '/l2/b07-brand-launch' },
            { text: 'L2B-08 多平台快速启动', link: '/l2/b08-multi-platform' },
          ],
        },
        {
          text: 'L2-C 管理升级（19 课时）',
          collapsed: false,
          items: [
            { text: '🎧 试听：L2C-01 战略规划', link: '/l2/c01-sample-lesson' },
            { text: 'L2C-01 战略规划与商业模式', link: '/l2/c01-strategy' },
            { text: 'L2C-02 团队组织架构与绩效管理', link: '/l2/c02-organization' },
            { text: 'L2C-03 财务管控与经营分析', link: '/l2/c03-finance-digital' },
            { text: 'L2C-04 全链路风控体系搭建', link: '/l2/c04-compliance-strategy' },
            { text: 'L2C-05 供应链战略与库存管理', link: '/l2/c05-supply-chain-strategy' },
            { text: 'L2C-06 品牌战略与全域增长管理', link: '/l2/c06-brand-strategy' },
            { text: 'L2C-07 数字化转型与 AI 赋能', link: '/l2/c07-digital-ai' },
          ],
        },
      ],
      '/l3/': [
        {
          text: 'L3 高阶毕业项目',
          collapsed: false,
          items: [
            { text: 'L3 课程总览', link: '/l3/' },
          ],
        },
        // === L3-A 运营操盘手毕业项目 ===
        {
          text: 'L3-A 运营操盘手(12课时)',
          collapsed: true,
          items: [
            { text: '🎧 试听:L3-A 项目导论', link: '/l3/l3a-sample-lesson' },
            { text: 'L3-A 运营操盘手毕业项目', link: '/l3/l3a-operations-project' },
            { text: 'L3-A 第2课 项目定位与团队组建', link: '/l3/l3a-lesson-2' },
            { text: 'L3-A 第3课 选品分析与上架方案', link: '/l3/l3a-lesson-3' },
            { text: 'L3-A 第4课 广告投放与流量获取', link: '/l3/l3a-lesson-4' },
            { text: 'L3-A 第5课 数据复盘与优化迭代', link: '/l3/l3a-lesson-5' },
            { text: 'L3-A 第6课 综合运营成果展示与答辩', link: '/l3/l3a-lesson-6' },
            { text: '工具包', link: '/l3/l3a-toolkit' },
          ],
        },
        // === L3-B 创业实战沙盘 ===
        {
          text: 'L3-B 创业实战沙盘(12课时)',
          collapsed: true,
          items: [
            { text: '🎧 试听:L3-B 沙盘导论', link: '/l3/l3b-sample-lesson' },
            { text: 'L3-B 创业实战沙盘', link: '/l3/l3b-startup-sandbox' },
            { text: 'L3-B 第2课 沙盘规则与商业模式画布', link: '/l3/l3b-lesson-2' },
            { text: 'L3-B 第3课 商业模式设计与选品验证', link: '/l3/l3b-lesson-3' },
            { text: 'L3-B 第4课 供应链搭建与合规自查', link: '/l3/l3b-lesson-4' },
            { text: 'L3-B 第5课 资金链测算与风险预案', link: '/l3/l3b-lesson-5' },
            { text: 'L3-B 第6课 商业计划书路演与答辩', link: '/l3/l3b-lesson-6' },
            { text: '工具包', link: '/l3/l3b-toolkit' },
          ],
        },
        // === L3-C 战略决策模拟 ===
        {
          text: 'L3-C 战略决策模拟(12课时)',
          collapsed: true,
          items: [
            { text: '🎧 试听:L3-C 推演导论', link: '/l3/l3c-sample-lesson' },
            { text: 'L3-C 战略决策模拟', link: '/l3/l3c-strategy-simulation' },
            { text: 'L3-C 第2课 战略分析框架入门', link: '/l3/l3c-lesson-2' },
            { text: 'L3-C 第3课 增长期企业增长飞轮设计', link: '/l3/l3c-lesson-3' },
            { text: 'L3-C 第4课 转型期企业组织变革', link: '/l3/l3c-lesson-4' },
            { text: 'L3-C 第5课 危机期企业风险处置', link: '/l3/l3c-lesson-5' },
            { text: 'L3-C 第6课 战略方案路演与答辩', link: '/l3/l3c-lesson-6' },
            { text: '工具包', link: '/l3/l3c-toolkit' },
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
                  text: '试听样章：第6课',
                  link: '/courses/supply-chain/sample-lesson-6',
                },
                {
                  text: '试听样章：第7课',
                  link: '/courses/supply-chain/sample-lesson-7',
                },
                {
                  text: '试听样章：第8课',
                  link: '/courses/supply-chain/sample-lesson-8',
                },
                {
                  text: '工具包样例',
                  link: '/courses/supply-chain/toolkit-sample',
                },
                { text: '完整工具包',
                  link: '/courses/supply-chain/toolkit',
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
                  text: '试听样章：第6课',
                  link: '/courses/platform-operations/sample-lesson-6',
                },
                {
                  text: '试听样章：第7课',
                  link: '/courses/platform-operations/sample-lesson-7',
                },
                {
                  text: '试听样章：第8课',
                  link: '/courses/platform-operations/sample-lesson-8',
                },
                {
                  text: '工具包样例',
                  link: '/courses/platform-operations/toolkit-sample',
                },
                { text: '完整工具包',
                  link: '/courses/platform-operations/toolkit',
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
                  text: '试听样章：第6课',
                  link: '/courses/compliance/sample-lesson-6',
                },
                {
                  text: '试听样章：第7课',
                  link: '/courses/compliance/sample-lesson-7',
                },
                {
                  text: '试听样章：第8课',
                  link: '/courses/compliance/sample-lesson-8',
                },
                {
                  text: '工具包样例',
                  link: '/courses/compliance/toolkit-sample',
                },
                { text: '完整工具包',
                  link: '/courses/compliance/toolkit',
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
                  text: '试听样章：第6课',
                  link: '/courses/brand-management/sample-lesson-6',
                },
                {
                  text: '试听样章：第7课',
                  link: '/courses/brand-management/sample-lesson-7',
                },
                {
                  text: '试听样章：第8课',
                  link: '/courses/brand-management/sample-lesson-8',
                },
                {
                  text: '工具包样例',
                  link: '/courses/brand-management/toolkit-sample',
                },
                { text: '完整工具包',
                  link: '/courses/brand-management/toolkit',
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
                  text: '试听样章：第6课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-6',
                },
                {
                  text: '试听样章：第7课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-7',
                },
                {
                  text: '试听样章：第8课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-8',
                },
                {
                  text: '试听样章：第9课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-9',
                },
                {
                  text: '试听样章：第10课',
                  link: '/courses/logistics-overseas-warehouse/sample-lesson-10',
                },
                {
                  text: '工具包样例',
                  link: '/courses/logistics-overseas-warehouse/toolkit-sample',
                },
                { text: '完整工具包',
                  link: '/courses/logistics-overseas-warehouse/toolkit',
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
                  text: '试听样章：第6课',
                  link: '/courses/supply-chain-execution/sample-lesson-6',
                },
                {
                  text: '试听样章：第7课',
                  link: '/courses/supply-chain-execution/sample-lesson-7',
                },
                {
                  text: '试听样章：第8课',
                  link: '/courses/supply-chain-execution/sample-lesson-8',
                },
                {
                  text: '试听样章：第9课',
                  link: '/courses/supply-chain-execution/sample-lesson-9',
                },
                {
                  text: '试听样章：第10课',
                  link: '/courses/supply-chain-execution/sample-lesson-10',
                },
                {
                  text: '工具包样例',
                  link: '/courses/supply-chain-execution/toolkit-sample',
                },
                { text: '完整工具包',
                  link: '/courses/supply-chain-execution/toolkit',
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
                { text: '完整工具包',
                  link: '/courses/finance-management/toolkit',
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
                { text: '完整工具包',
                  link: '/courses/cashflow-forex/toolkit',
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
                { text: '完整工具包',
                  link: '/courses/digital-transformation/toolkit',
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
                { text: '完整工具包',
                  link: '/courses/team-management/toolkit',
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
      copyright: `跨境电商高级实战系列 · 学习网站 ｜ Copyright © ${new Date().getFullYear()}`,
    },

    // --- 编辑链接 ---
    // 本站采用本地编辑工作流，不通过GitHub在线编辑
    // 编辑方式：修改 docs/ 目录下的 .md 文件后执行 npm run build 重新构建
    editLink: false,

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
        // 自定义搜索索引：排除低价值页面 + 截断长内容，减小索引体积
        _render(src, env, md) {
          // 排除工具包页面和课时独立页面（不生成索引）
          if (env.relativePath && /toolkit/.test(env.relativePath)) return ''
          if (env.relativePath && /l[123][\\/].*lesson-\d/.test(env.relativePath)) return ''
          // 对超长内容截断（保留前 3000 字符，足够搜索匹配）
          if (src.length > 3000) src = src.slice(0, 3000)
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          return html
        },
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
