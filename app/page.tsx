'use client'

import { useState } from 'react'

interface TestCase {
  input: string
  output: string
}

export default function Home() {
  const [generatorCode, setGeneratorCode] = useState(`#include "testlib.h"
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
}`)
  
  const [testCases, setTestCases] = useState<TestCase[]>([])
  const [loading, setLoading] = useState(false)
  const [numCases, setNumCases] = useState(5)

  const generateTestCases = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: generatorCode,
          numCases: numCases
        }),
      })
      
      const data = await response.json()
      if (data.success) {
        setTestCases(data.testCases)
      } else {
        alert('生成失败: ' + data.error)
      }
    } catch (error) {
      alert('请求失败: ' + error)
    }
    setLoading(false)
  }

  const downloadTestCases = () => {
    const zip = testCases.map((tc, i) => 
      `=== 测试点 ${i + 1} ===\n输入:\n${tc.input}\n输出:\n${tc.output}\n`
    ).join('\n')
    
    const blob = new Blob([zip], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'testcases.txt'
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Testlib 测试数据生成器
          </h1>
          <div className="flex justify-center gap-4">
            <a
              href="/examples"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              查看示例
            </a>
            <button
              onClick={() => {
                const saved = localStorage.getItem('generatorCode')
                if (saved) setGeneratorCode(saved)
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              加载保存的代码
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 代码编辑区 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">生成器代码</h2>
            <textarea
              value={generatorCode}
              onChange={(e) => setGeneratorCode(e.target.value)}
              className="w-full h-96 font-mono text-sm border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入你的testlib生成器代码..."
            />
            
            <div className="mt-4 flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  生成测试点数量
                </label>
                <input
                  type="number"
                  value={numCases}
                  onChange={(e) => setNumCases(parseInt(e.target.value) || 1)}
                  min="1"
                  max="20"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={generateTestCases}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '生成中...' : '生成测试数据'}
              </button>
              
              <button
                onClick={() => localStorage.setItem('generatorCode', generatorCode)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                保存代码
              </button>
            </div>
          </div>

          {/* 结果显示区 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">生成结果</h2>
              {testCases.length > 0 && (
                <button
                  onClick={downloadTestCases}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  下载测试数据
                </button>
              )}
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {testCases.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  点击"生成测试数据"开始生成
                </p>
              ) : (
                testCases.map((testCase, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <h3 className="font-medium text-gray-800 mb-2">
                      测试点 {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">输入:</span>
                        <pre className="bg-gray-50 p-2 rounded text-sm font-mono overflow-x-auto">
                          {testCase.input}
                        </pre>
                      </div>
                      {testCase.output && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">输出:</span>
                          <pre className="bg-gray-50 p-2 rounded text-sm font-mono overflow-x-auto">
                            {testCase.output}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">使用说明</h2>
          <div className="prose text-gray-700">
            <ol className="list-decimal list-inside space-y-2">
              <li>在左侧编辑器中输入你的testlib生成器代码</li>
              <li>设置要生成的测试点数量（1-20个）</li>
              <li>点击"生成测试数据"按钮</li>
              <li>查看生成的测试数据，可以下载保存</li>
            </ol>
            
            <h3 className="text-lg font-medium mt-6 mb-2">Testlib 常用函数</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code>rnd.next(a, b)</code> - 生成[a,b]范围内的随机整数</li>
              <li><code>rnd.next(a, b, c)</code> - 生成[a,b]范围内的随机整数，c为种子</li>
              <li><code>rnd.wnext(n, w)</code> - 生成权重随机数</li>
              <li><code>registerGen(argc, argv, 1)</code> - 注册生成器</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}