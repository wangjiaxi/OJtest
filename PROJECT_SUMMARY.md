# OJtest - Testlib Generator 项目总结

## 项目概述

这是一个基于testlib的在线测试数据生成工具，允许用户在浏览器中编写生成器代码并实时生成测试数据。项目使用Next.js构建，可以部署到Vercel平台供公开使用。

## 技术架构

### 前端技术栈
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: React 18

### 后端技术栈
- **API**: Next.js API Routes
- **运行时**: Node.js 18
- **代码执行**: JavaScript模拟testlib环境

### 部署平台
- **主要平台**: Vercel
- **CDN**: Vercel Edge Network
- **域名**: 支持自定义域名

## 核心功能

### 1. 代码编辑器
- 语法高亮的代码编辑区域
- 支持C++风格的testlib代码
- 代码保存和加载功能
- 实时语法检查

### 2. 测试数据生成
- 支持1-20个测试点生成
- 基于种子的随机数生成
- 安全的代码执行环境
- 实时结果显示

### 3. 数据管理
- 测试数据预览
- 批量数据下载
- 格式化输出
- 历史记录保存

### 4. 示例模板
- 多种常见算法模板
- 一键使用模板功能
- 详细的使用说明
- 最佳实践指导

## 项目结构

```
testlib-generator/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   └── generate/      # 数据生成API
│   ├── examples/          # 示例页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── public/                # 静态资源
│   └── testlib.h          # testlib头文件
├── scripts/               # 部署脚本
│   └── deploy.sh          # 自动部署脚本
├── package.json           # 项目配置
├── next.config.js         # Next.js配置
├── tailwind.config.js     # Tailwind配置
├── tsconfig.json          # TypeScript配置
├── vercel.json            # Vercel部署配置
└── README.md              # 项目说明
```

## 安全特性

### 代码执行安全
- 沙箱环境执行
- 危险函数过滤
- 资源使用限制
- 超时保护机制

### 输入验证
- 代码长度限制
- 恶意代码检测
- 参数范围验证
- XSS防护

## 性能优化

### 前端优化
- 组件懒加载
- 代码分割
- 静态资源压缩
- CDN加速

### 后端优化
- API响应缓存
- 请求频率限制
- 内存使用优化
- 并发处理

## 部署指南

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git

### 本地开发
```bash
npm install
npm run dev
```

### 生产部署
```bash
# 方法一：使用脚本
./scripts/deploy.sh

# 方法二：手动部署
npm run build
vercel --prod
```

## 使用场景

### 教育用途
- 算法竞赛培训
- 编程课程教学
- 在线判题系统
- 学习资源制作

### 专业用途
- 比赛数据准备
- 系统测试
- 性能基准测试
- 自动化测试

## 扩展功能

### 计划中的功能
- [ ] 支持更多编程语言
- [ ] 标准答案生成
- [ ] 数据可视化
- [ ] 批量测试
- [ ] 用户系统
- [ ] 数据分享

### 可能的改进
- [ ] 更强大的代码编辑器
- [ ] 实时协作功能
- [ ] 移动端优化
- [ ] 离线支持

## 维护指南

### 定期维护
- 依赖包更新
- 安全补丁应用
- 性能监控
- 用户反馈处理

### 监控指标
- 页面加载时间
- API响应时间
- 错误率统计
- 用户活跃度

## 贡献指南

### 开发流程
1. Fork项目仓库
2. 创建功能分支
3. 编写代码和测试
4. 提交Pull Request
5. 代码审查和合并

### 代码规范
- 使用TypeScript
- 遵循ESLint规则
- 编写单元测试
- 更新文档

## 许可证

本项目采用MIT许可证，允许自由使用、修改和分发。

## 联系方式

- 项目仓库: https://github.com/yourusername/testlib-generator
- 问题反馈: GitHub Issues
- 功能建议: GitHub Discussions

---

**项目状态**: 可用于生产环境
**最后更新**: 2024年12月
**版本**: v1.0.0