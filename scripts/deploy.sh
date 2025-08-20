#!/bin/bash

echo "开始部署 OJtest 到 Vercel..."

# 检查是否安装了必要的工具
if ! command -v npm &> /dev/null; then
    echo "错误: 请先安装 Node.js 和 npm"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "错误: 请先安装 Git"
    exit 1
fi

# 安装依赖
echo "安装依赖..."
npm install

# 类型检查
echo "进行类型检查..."
npm run type-check

# 构建项目
echo "构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "构建成功!"
else
    echo "构建失败，请检查错误信息"
    exit 1
fi

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "安装 Vercel CLI..."
    npm install -g vercel
fi

# 部署到 Vercel
echo "部署到 Vercel..."
vercel --prod

echo "部署完成!"
echo "提示: 你可以在 Vercel Dashboard 中查看部署状态和域名"