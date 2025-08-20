import { NextRequest, NextResponse } from 'next/server'

// 简化的testlib随机数生成器
class SimpleRandom {
  private seed: number

  constructor(s: number = 1) {
    this.seed = s
  }

  setSeed(s: number) {
    this.seed = s
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed
  }

  nextInt(from: number, to: number): number {
    if (from > to) [from, to] = [to, from]
    return Math.abs(this.next()) % (to - from + 1) + from
  }

  nextDouble(from: number = 0, to: number = 1): number {
    if (from > to) [from, to] = [to, from]
    return from + (to - from) * (Math.abs(this.next()) / 233280)
  }
}

// JavaScript版本的testlib模拟器
function executeTestlibCode(code: string, seed: number): string {
  const rnd = new SimpleRandom(seed)
  
  // 创建一个安全的执行环境
  const context = {
    rnd: {
      next: (from?: number, to?: number) => {
        if (from === undefined) return Math.abs(rnd.next())
        if (to === undefined) return rnd.nextInt(0, from - 1)
        return rnd.nextInt(from, to)
      },
      wnext: (n: number, w: number = 1) => {
        let result = 0
        for (let i = 0; i < w; i++) {
          result = Math.max(result, rnd.nextInt(0, n - 1))
        }
        return result
      }
    },
    console: {
      log: (...args: any[]) => output.push(args.join(' '))
    },
    Math,
    parseInt,
    parseFloat,
    String,
    Number,
    Array
  }
  
  let output: string[] = []
  
  try {
    // 简单的C++到JavaScript转换
    let jsCode = code
      .replace(/#include.*\n/g, '')
      .replace(/using namespace std;\n/g, '')
      .replace(/int main\(.*\)\s*{/g, '(function() {')
      .replace(/return 0;\s*}/g, '})();')
      .replace(/cout\s*<<\s*([^;]+)\s*<<\s*endl;/g, 'console.log($1);')
      .replace(/cout\s*<<\s*([^;]+);/g, 'console.log($1);')
      .replace(/registerGen\([^)]+\);/g, '')
      .replace(/\bint\s+(\w+)\s*=/g, 'let $1 =')
      .replace(/\bfor\s*\(\s*int\s+(\w+)\s*=/g, 'for (let $1 =')
      .replace(/endl/g, '"\\n"')
    
    // 在受限环境中执行代码
    const func = new Function(...Object.keys(context), jsCode)
    func(...Object.values(context))
    
    return output.join('\n')
  } catch (error) {
    throw new Error(`代码执行失败: ${error}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, numCases } = await request.json()
    
    if (!code || !numCases) {
      return NextResponse.json({ success: false, error: '缺少必要参数' })
    }

    // 检查代码安全性
    const dangerousPatterns = [
      /system\s*\(/,
      /exec\s*\(/,
      /eval\s*\(/,
      /require\s*\(/,
      /import\s+/,
      /process\./,
      /fs\./,
      /child_process/
    ]
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json({ 
          success: false, 
          error: '代码包含不安全的操作' 
        })
      }
    }
    
    // 生成测试数据
    const testCases = []
    for (let i = 0; i < Math.min(numCases, 20); i++) {
      try {
        const output = executeTestlibCode(code, i + 1)
        testCases.push({
          input: output.trim(),
          output: '' // 如果需要标准答案，这里可以调用标准程序
        })
      } catch (error) {
        return NextResponse.json({ 
          success: false, 
          error: error instanceof Error ? error.message : '生成失败' 
        })
      }
    }
    
    return NextResponse.json({ success: true, testCases })
    
  } catch (error) {
    console.error('生成测试数据失败:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : '未知错误' 
    })
  }
}