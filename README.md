# OJtest - Testlib 测试数据生成器

基于testlib的在线测试数据生成工具，支持在线编写生成器代码并生成测试数据。

## 功能特性

- 在线编写testlib生成器代码
- 实时生成测试数据
- 支持下载生成的测试数据
- 支持自定义测试点数量
- 响应式设计，支持移动端

## 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Node.js API Routes
- **编译**: G++ (C++17)
- **部署**: Vercel

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 `http://localhost:3000`

## 部署到Vercel

1. 将代码推送到GitHub仓库

2. 在Vercel中导入项目

3. 确保构建设置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. 部署完成后即可访问

## 使用说明

1. 在代码编辑器中输入testlib生成器代码
2. 设置要生成的测试点数量（1-20个）
3. 点击"生成测试数据"按钮
4. 查看生成结果，可下载保存

## Testlib 常用函数

- `rnd.next(a, b)` - 生成[a,b]范围内的随机整数
- `rnd.next(a, b, c)` - 生成[a,b]范围内的随机整数，c为种子
- `rnd.wnext(n, w)` - 生成权重随机数
- `registerGen(argc, argv, 1)` - 注册生成器

## 示例代码

```cpp
#include "testlib.h"
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    registerGen(argc, argv, 1);
    
    int n = rnd.next(1, 100);
    cout << n << endl;
    
    for (int i = 0; i < n; i++) {
        cout << rnd.next(1, 1000) << " ";
    }
    cout << endl;
    
    return 0;
}
```

## 注意事项

- 生成器代码必须包含 `#include "testlib.h"`
- 必须调用 `registerGen(argc, argv, 1)` 初始化
- 单次最多生成20个测试点
- 每个测试点生成时间限制为30秒

## License

MIT License