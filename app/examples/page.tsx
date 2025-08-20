'use client'

import { useState } from 'react'

const examples = [
  {
    title: '基础数组生成',
    description: '生成一个数组，包含n个随机整数',
    code: `#include "testlib.h"
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
}`
  },
  {
    title: '图论 - 树生成',
    description: '生成一棵随机树',
    code: `#include "testlib.h"
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    registerGen(argc, argv, 1);
    
    int n = rnd.next(2, 50);
    cout << n << endl;
    
    for (int i = 2; i <= n; i++) {
        int parent = rnd.next(1, i - 1);
        cout << parent << " " << i << endl;
    }
    
    return 0;
}`
  },
  {
    title: '字符串生成',
    description: '生成随机字符串',
    code: `#include "testlib.h"
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    registerGen(argc, argv, 1);
    
    int n = rnd.next(1, 20);
    cout << n << endl;
    
    for (int i = 0; i < n; i++) {
        char c = 'a' + rnd.next(0, 25);
        cout << c;
    }
    cout << endl;
    
    return 0;
}`
  },
  {
    title: '矩阵生成',
    description: '生成随机矩阵',
    code: `#include "testlib.h"
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    registerGen(argc, argv, 1);
    
    int n = rnd.next(2, 10);
    int m = rnd.next(2, 10);
    cout << n << " " << m << endl;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << rnd.next(0, 9) << " ";
        }
        cout << endl;
    }
    
    return 0;
}`
  },
  {
    title: '区间查询',
    description: '生成区间查询测试数据',
    code: `#include "testlib.h"
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    registerGen(argc, argv, 1);
    
    int n = rnd.next(1, 100);
    int q = rnd.next(1, 50);
    cout << n << " " << q << endl;
    
    for (int i = 0; i < n; i++) {
        cout << rnd.next(1, 1000) << " ";
    }
    cout << endl;
    
    for (int i = 0; i < q; i++) {
        int l = rnd.next(1, n);
        int r = rnd.next(l, n);
        cout << l << " " << r << endl;
    }
    
    return 0;
}`
  }
]

export default function Examples() {
  const [selectedExample, setSelectedExample] = useState<string>('')

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    alert('代码已复制到剪贴板')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          代码示例
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {example.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {example.description}
              </p>
              
              <div className="relative">
                <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono overflow-x-auto max-h-64 overflow-y-auto">
                  <code>{example.code}</code>
                </pre>
                
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => copyToClipboard(example.code)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    复制代码
                  </button>
                  <a
                    href="/"
                    onClick={() => {
                      localStorage.setItem('generatorCode', example.code)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    使用此模板
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            返回生成器
          </a>
        </div>
      </div>
    </div>
  )
}