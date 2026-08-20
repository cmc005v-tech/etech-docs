<<<<<<< HEAD
# 跨境电商课程学习网站

> 基于 VitePress 构建的跨境电商专业课程学习平台，覆盖 L1/L2/L3 三层学员分层体系与 10 门知识库专业课。

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-blue)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.x-green)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 📖 项目简介

本项目是一个面向跨境电商从业者的**系统化学习平台**，提供从基础认知到高阶管理的完整课程体系。站点采用静态生成技术，支持暗色模式、交互式测验、学习进度追踪等现代化功能。

### 核心特性

- ✅ **三层课程体系**: L1必修基础层(8门) + L2进阶专业层(24门) + L3高阶管理层(3门)
- ✅ **知识库专业课**: 10门独立专业课程(供应链/平台运营/合规/品牌/物流/财务等)
- ✅ **真实案例库**: 40个商业案例覆盖6大领域，支持筛选/收藏/对比
- ✅ **互动学习组件**: Quiz随堂测验、MarkDone进度标记、ProgressDashboard学习看板
- ✅ **智能交互功能**: 能力地图、课程对比工具、学习证书生成与分享
- ✅ **暗色模式**: 全站深色主题适配，护眼舒适
- ✅ **SEO优化**: 完整的title/description/keywords元数据

### 技术栈

- **框架**: [VitePress 1.6.4](https://vitepress.dev/) + [Vue 3 Composition API](https://vuejs.org/)
- **样式**: CSS Variables + 自定义主题(vars.css/custom.css)
- **数据存储**: localStorage(学习进度/收藏列表)
- **部署**: 静态站点(GitHub Pages/Vercel/Cloudflare Pages)

---

## 🚀 快速开始

### 前置要求

- Node.js >= 16.x
- npm >= 7.x

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:5173 预览站点。

### 构建生产版本

```bash
npm run build
```

构建产物输出至 `docs/.vitepress/dist/`。

### 本地预览

```bash
npm run preview
```

访问 http://localhost:4173 查看构建后的站点。

---

## 📂 项目结构

```
course-site-vitepress/
├── docs/                      # 文档源文件
│   ├── l1/                    # L1必修基础层(8门课程)
│   ├── l2/                    # L2进阶专业层(24门课程)
│   ├── l3/                    # L3高阶管理层(3门课程)
│   ├── courses/               # 知识库专业课(10门)
│   │   ├── platform-operations/    # 平台运营
│   │   ├── supply-chain/           # 供应链管理
│   │   ├── compliance/             # 合规管理
│   │   ├── brand-management/       # 品牌管理
│   │   ├── logistics-overseas-warehouse/  # 物流履约
│   │   ├── supply-chain-execution/      # 供应链执行
│   │   ├── finance-management/         # 财务管控
│   │   ├── cashflow-forex/             # 资金链风控
│   │   ├── digital-transformation/     # 数字化转型
│   │   └── team-management/            # 团队组织
│   ├── cases/                 # 案例库(40个案例)
│   │   ├── index.md           # 案例库首页(含搜索/筛选/收藏)
│   │   ├── caseData.js        # 案例数据源
│   │   └── *.md               # 案例详情页
│   ├── resources/
│   │   └── progress.md        # 学习进度看板
│   └── .vitepress/            # VitePress配置
│       ├── config.ts          # 站点配置(侧边栏/导航/SEO)
│       └── theme/
│           ├── index.ts       # 主题入口(组件注册)
│           ├── style/
│           │   ├── vars.css   # CSS变量定义
│           │   └── custom.css # 自定义样式(含暗色模式)
│           └── components/    # Vue组件(21个)
├── package.json
├── .gitignore
└── README.md
```

---

## 🎯 使用教程

### 1. 浏览课程

- **首页**: 查看所有课程分类卡片
- **L1/L2/L3**: 点击左侧导航进入对应层级
- **知识库课程**: 在"courses"目录下浏览10门专业课

### 2. 参与测验

部分课程页面嵌入了 `<Quiz>` 组件：
- 点击选项即时反馈正确/错误
- 查看答案解析与得分
- 可重复答题巩固知识

### 3. 标记学习进度

课程页底部的 `<MarkDone>` 按钮：
- 点击"标记本课为已完成"
- 进度自动保存至浏览器localStorage
- 在 `/resources/progress` 查看汇总看板

### 4. 浏览案例库

访问 `/cases/index`：
- **筛选**: 按领域/类型/企业体量/年份过滤
- **搜索**: 关键词实时匹配案例内容
- **收藏**: 点击⭐按钮保存感兴趣案例
- **对比**: 选择两个案例进行多维度比较

### 5. 使用课程对比工具

访问 `/courses/course-selection`：
- 点击对比入口卡片(如"L2A-03 vs L2B-07")
- 查看6大维度对比视图(定位/前置/主题/人群/案例/建议)
- 帮助决策选课

### 6. 生成学习证书

完成某路径≥80%课程后：
- 在路径首页找到"生成学习证书"入口
- 输入姓名，系统自动填充完成数据
- 点击"分享证书"发送给好友或社交媒体

### 7. 切换暗色模式

- 点击右上角太阳/月亮图标
- 偏好自动保存，下次访问保持
- 所有组件均已适配深色主题

---

## 🛠️ 部署指南

### 方案一: GitHub Pages

1. 创建GitHub仓库并推送代码:
```bash
git remote add origin https://github.com/yourusername/cbec-course-site.git
git push -u origin main
```

2. 在仓库 Settings → Pages 中:
   - Source: Deploy from a branch
   - Branch: main / docs/.vitepress/dist
   - 等待部署完成

3. 访问 `https://yourusername.github.io/cbec-course-site/`

### 方案二: Vercel

1. 登录 [Vercel](https://vercel.com/) 并导入GitHub仓库
2. Framework Preset 选择 "VitePress"
3. Build Command: `npm run build`
4. Output Directory: `docs/.vitepress/dist`
5. 点击 Deploy，等待自动构建

### 方案三: Cloudflare Pages(推荐国内访问)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Workers & Pages → Create Application → Pages
3. Connect to Git 选择仓库
4. Build settings:
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `docs/.vitepress/dist`
5. 部署完成后获得 `*.pages.dev` 域名

### 自定义域名(可选)

在各托管平台设置中添加CNAME记录指向你的域名。

---

## 📊 项目统计

| 指标 | 数量 |
|------|------|
| 课程总数 | 45门(L1:8 + L2:24 + L3:3 + 知识库:10) |
| 案例总数 | 40个(6大领域) |
| Vue组件 | 21个(3,162行代码) |
| 页面总数 | 103+个Markdown页面 |
| Quiz测验 | 20+个嵌入实例 |
| 构建耗时 | ~17秒 |

---

## 🔧 开发规范

### 本地编辑工作流

本站采用**本地编辑**方式维护内容，不通过GitHub在线编辑。

**编辑流程**：

1. **定位文件**：找到要编辑的页面，位于 `docs/` 目录下
   - L1课程：`docs/l1/01-business-logic.md` 等
   - L2课程：`docs/l2/L2A-01-xxx.md` 等
   - L3课程：`docs/l3/xxx.md`
   - 知识库课程：`docs/courses/课程名/index.md` 等
   - 案例库：`docs/cases/caseData.js`（案例数据源）

2. **编辑内容**：使用任意Markdown编辑器修改 `.md` 文件
   - 推荐：VS Code / Typora / Obsidian
   - 注意：Vue组件属性中避免使用英文直双引号（会导致构建失败）

3. **本地预览**：
   ```bash
   npm run dev
   ```
   访问 http://localhost:5173 查看效果

4. **构建发布**：
   ```bash
   npm run build
   ```
   构建产物在 `docs/.vitepress/dist/`，部署到托管平台即可

**注意事项**：
- 修改后需重新 `npm run build` 才能更新线上站点
- `lastUpdated` 时间戳基于Git提交历史，本地编辑后需commit才能更新
- 编辑 `caseData.js` 后需重启dev server才能看到变化

### 添加新课程

1. 在 `docs/l1/`(或l2/l3/courses)下创建目录
2. 创建 `index.md`(课程简介) + `sample-lesson-1.md`(样章)
3. 在 `docs/.vitepress/config.ts` 的sidebar中添加导航项
4. 在 `docs/courses/index.md` 的课程卡片网格中添加卡片

### 嵌入Quiz组件

在Markdown文件中:
```markdown
<Quiz title="自测标题" :questions="[
  { q: '问题文本', options: ['A', 'B', 'C', 'D'], correct: 0, explanation: '解析' }
]" />
```

### 嵌入MarkDone组件

```markdown
<MarkDone id="l1-01" title="L1-01 课程名称" />
```

### 暗色模式适配

在 `docs/.vitepress/theme/style/custom.css` 中添加:
```css
.dark .your-component {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
}
```

---

## 📝 更新日志

### v1.2.0 (2026-08-20)
- ✅ 暗色模式细节打磨(5个新组件完整适配)
- ✅ SEO元数据补全(10门课+案例库keywords)
- ✅ 案例库高级筛选与收藏功能
- ✅ 学习证书智能触发与分享
- ✅ 能力地图交互增强(展开折叠/进度标记/课程跳转)
- ✅ 课程对比工具(双栏6维度对比)

### v1.1.0 (2026-08-17)
- ✅ L2剩余课时补全(4门8课制课程第6-8课)
- ✅ 全站案例交叉链接嵌入(RelatedCases组件)
- ✅ 讲师手册组件(InstructorHandbook)
- ✅ 学习路径推荐器(PathRecommender)

### v1.0.0 (2026-08-15)
- ✅ L1/L2/L3三层课程体系完整落地
- ✅ 10门知识库专业课上线
- ✅ 40个案例库建成
- ✅ Quiz/MarkDone/ProgressDashboard互动组件
- ✅ 暗色模式亮暗双切换

---

## 🤝 贡献指南

欢迎提交Issue或Pull Request改进本项目！

1. Fork本仓库
2. 创建特性分支: `git checkout -b feature/AmazingFeature`
3. 提交改动: `git commit -m 'Add some AmazingFeature'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 提交Pull Request

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 👨‍💻 作者

**Vincent** - 跨境电商教育研究者

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 致谢

- [VitePress](https://vitepress.dev/) - 优秀的静态站点生成器
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- 所有参与课程内容开发的讲师与行业专家

---

**⭐ 如果这个项目对你有帮助，请给一个Star！**
=======
# etech-docs
VitePress technical documentation site
>>>>>>> 3b366c6b5ae4c46b35ef3886e3a3fd60826116a6
