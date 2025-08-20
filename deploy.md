# 部署指南

## 部署到Vercel

### 方法一：通过Vercel CLI

1. 安装Vercel CLI：
```bash
npm i -g vercel
```

2. 在项目根目录运行：
```bash
vercel
```

3. 按照提示完成部署配置

### 方法二：通过GitHub集成

1. 将代码推送到GitHub仓库：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/wangjiaxi/testlib-generator.git
git push -u origin main
```

2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)

3. 点击 "New Project"

4. 导入你的GitHub仓库

5. 配置项目设置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. 点击 "Deploy"

### 环境变量配置

如果需要配置环境变量，在Vercel项目设置中添加：

- `NODE_ENV`: `production`

### 自定义域名

1. 在Vercel项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置DNS记录

## 本地开发

1. 克隆项目：
```bash
git clone https://github.com/wangjiaxi/testlib-generator.git
cd testlib-generator
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:3000`

## 项目结构

```
testlib-generator/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # API路由
│   ├── globals.css           # 全局样式
│   ├── layout.tsx           # 布局组件
│   └── page.tsx             # 主页面
├── public/
│   └── testlib.h            # testlib头文件
├── package.json             # 项目配置
├── next.config.js           # Next.js配置
├── tailwind.config.js       # Tailwind配置
├── tsconfig.json            # TypeScript配置
├── vercel.json              # Vercel部署配置
└── README.md                # 项目说明
```

## 功能说明

### 支持的testlib函数

- `rnd.next()` - 生成随机数
- `rnd.next(n)` - 生成[0, n-1]范围内的随机数
- `rnd.next(from, to)` - 生成[from, to]范围内的随机数
- `rnd.wnext(n, w)` - 生成权重随机数

### 代码转换

系统会自动将C++代码转换为JavaScript执行：

- `cout << x << endl;` → `console.log(x);`
- `int x = ...;` → `let x = ...;`
- `for (int i = 0; ...)` → `for (let i = 0; ...)`

### 安全限制

为了安全考虑，系统会阻止以下操作：
- 系统调用 (`system`, `exec`)
- 文件操作 (`fs`, `require`)
- 进程操作 (`process`, `child_process`)
- 代码执行 (`eval`)

## 故障排除

### 常见问题

1. **编译失败**
   - 检查C++语法是否正确
   - 确保包含了必要的头文件
   - 检查是否使用了不支持的函数

2. **生成失败**
   - 检查代码逻辑是否正确
   - 确保调用了 `registerGen`
   - 检查输出格式是否正确

3. **部署失败**
   - 检查package.json配置
   - 确保所有依赖都已安装
   - 检查Vercel配置文件

### 获取帮助

如果遇到问题，可以：
1. 查看浏览器控制台错误信息
2. 检查Vercel部署日志
3. 提交GitHub Issue