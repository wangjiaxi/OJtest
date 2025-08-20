# OJtest 使用指南

## 概述

OJtest是一个基于testlib的在线测试数据生成工具，可以帮助算法竞赛选手和编程教育工作者快速生成高质量的测试数据。

## 功能说明

### 主要功能
- 在线编写testlib生成器代码
- 实时生成测试数据
- 支持多种数据类型生成
- 代码保存和加载
- 测试数据下载
- 响应式设计

### 支持的testlib函数
- `rnd.next()` - 生成随机数
- `rnd.next(n)` - 生成[0, n-1]范围内的随机数  
- `rnd.next(from, to)` - 生成[from, to]范围内的随机数
- `rnd.wnext(n, w)` - 生成权重随机数

## 代码示例

### 基础数组生成
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

### 图论数据生成
```cpp
#include "testlib.h"
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    registerGen(argc, argv, 1);
    
    int n = rnd.next(2, 50);
    int m = rnd.next(n-1, n*(n-1)/2);
    cout << n << " " << m << endl;
    
    // 生成边
    for (int i = 0; i < m; i++) {
        int u = rnd.next(1, n);
        int v = rnd.next(1, n);
        if (u != v) {
            cout << u << " " << v << endl;
        }
    }
    
    return 0;
}
```

## 最佳实践

### 1. 代码结构
- 始终包含 `#include "testlib.h"`
- 在main函数开始调用 `registerGen(argc, argv, 1)`
- 使用合适的数据范围避免溢出

### 2. 数据生成
- 考虑边界情况（最小值、最大值）
- 生成多样化的测试数据
- 确保数据符合题目约束

### 3. 性能优化
- 避免生成过大的数据
- 合理设置测试点数量
- 注意时间复杂度

## 常见问题

### Q: 为什么我的代码无法执行？
A: 请检查：
- 是否包含了testlib.h头文件
- 是否调用了registerGen函数
- 代码语法是否正确

### Q: 如何生成更复杂的数据结构？
A: 可以参考示例页面中的模板，或者：
- 使用循环生成数组
- 使用条件判断生成特殊情况
- 组合多个随机函数

### Q: 生成的数据如何验证？
A: 建议：
- 检查数据范围是否符合约束
- 验证数据格式是否正确
- 使用标准程序验证答案

## 技术支持

如果遇到问题，可以：
1. 查看浏览器控制台错误信息
2. 检查代码语法和逻辑
3. 参考示例代码
4. 提交GitHub Issue

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础testlib函数
- 在线代码编辑和执行
- 测试数据生成和下载