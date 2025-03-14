import MarkdownIt from 'markdown-it'
import MarkdownItHighlightjs from 'markdown-it-highlightjs'
import hljs from 'highlight.js'

const createMarkdownParser = (isBtn = true) => {
  const markdownParser = new MarkdownIt({
    html: true, // 允许HTML标签
    linkify: true, // 自动识别URLs并转化为链接
    typographer: true // 启用智能排版功能
  })
  // 添加代码高亮插件
  markdownParser.use(MarkdownItHighlightjs, { hljs })
  if (isBtn) {
    markdownParser.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      const code = token.content // 获取代码内容
      const lang = token.info.trim() // 获取代码语言

      // 高亮代码
      const highlightedCode = hljs.highlightAuto(code, [lang]).value

      // 添加复制按钮
      const copyButton = `
    <button class="copy-code-button" data-code="${encodeURIComponent(code)}">
      复制
    </button>
  `
      // 添加AI解析按钮
      const AIButton = `
    <button class="ai-code-button" lang="${lang}" data-code="${encodeURIComponent(
        code
      )}">
      AI代码解析
    </button>
  `

      // 渲染代码块
      return `
    <div class="code-block-wrapper">
      ${copyButton}
      ${AIButton}
      <pre><code class="hljs ${lang}">${highlightedCode}</code></pre>
    </div>
  `
    }
  }
  return markdownParser
}

interface Message {
  success: (message: string) => void
  error: (message: string) => void
}
const copyCode = (message: Message) => {
  const buttons = document.querySelectorAll('.copy-code-button')

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const encodedCode = button.getAttribute('data-code')
      const code = decodeURIComponent(encodedCode as string)
      navigator.clipboard
        .writeText(code)
        .then(() => {
          message.success('代码已复制！')
        })
        .catch(() => {
          message.error('复制失败，请手动复制。')
        })
    })
  })
}

const aiCodeClick = (fn: (code: string) => void) => {
  const buttons = document.querySelectorAll('.ai-code-button')
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const encodedCode = button.getAttribute('data-code')
      const lang = button.getAttribute('lang') || 'javascript'
      const code = decodeURIComponent(encodedCode as string)
      const code1 = `\`\`\`${lang}
      ${code}
\`\`\``
      console.log(code1)

      fn(code1)
    })
  })
}

export { createMarkdownParser, copyCode, aiCodeClick }
