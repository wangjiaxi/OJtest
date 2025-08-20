# OJtest 快速启动指南

## 快速开始

### 1. 进入项目目录
```bash
cd OJtest
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 打开浏览器
访问 `http://localhost:3000`

## 部署到Vercel

### 自动部署
```bash
./scripts/deploy.sh
```

### 手动部署
```bash
npm install -g vercel
vercel --prod
```

## 主要功能

- 在线编写testlib生成器代码
- 实时生成测试数据
- 支持1-20个测试点
- 代码保存和加载
- 测试数据下载
- 丰富的示例模板

## 更多文档

- `README.md` - 详细项目说明
- `USAGE.md` - 使用指南
- `PROJECT_SUMMARY.md` - 项目技术总结
- `deploy.md` - 部署指南

---

**开始使用**: 运行 `npm run dev` 然后访问 http://localhost:3000