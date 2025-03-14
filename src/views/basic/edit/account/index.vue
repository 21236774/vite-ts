<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMessage, NInput, NCard } from 'naive-ui'
import { createMarkdownParser } from '@/utils/markdown'
import { useStoreTheme, useStoreAuth } from '@/store'
import ClipboardJS from 'clipboard'

const markdownParser = createMarkdownParser()
const store = useStoreTheme()
const message = useMessage()
const content = ref('')
const contentInput = ref('')
const url = import.meta.env.VITE_AI_API
let abortController: AbortController | null = null

const markdownText = ref('')

const openAi = async () => {
  if (!contentInput.value) {
    message.error('请输入内容后再试试吧！')
    return
  }
  if (abortController) {
    abortController.abort()
  }
  abortController = new AbortController()
  const reqData = {
    inputs: {},
    query: contentInput.value,
    response_mode: 'streaming',
    conversation_id: '',
    user: 'abc'
  }
  const response = await fetch(url + '/chat-messages', {
    mode: 'cors',
    credentials: 'omit',
    method: 'POST',
    body: JSON.stringify(reqData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_AI_API_KEY,
      Accept: 'text/event-stream'
    },
    signal: abortController.signal // 添加 signal
  })
  try {
    if (response.body) {
      const encode = new TextDecoder('utf-8')
      const reader = response.body.getReader()
      content.value = ''
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        const chunk = encode.decode(value, { stream: !done })
        const lines = chunk
          .split('\n')
          .filter((line) => line.startsWith('data:'))

        for (const line of lines) {
          const data = line.replace('data: ', '')
          if (data) {
            try {
              const obj = JSON.parse(data)
              markdownText.value += markdownParser.render(obj.answer)
              content.value += obj.answer
            } catch (e) {
              console.error('Error parsing JSON:', e)
            }
          }
        }
      }
      console.log(content.value)
    }
  } catch (error) {
    throw new Error('请求失败')
  }
}

let clipboard: ClipboardJS | null = null

onMounted(() => {
  clipboard = new ClipboardJS('.copy-button', {
    text: function (trigger) {
      const codeBlock = trigger.nextElementSibling as HTMLElement
      return codeBlock.innerText
    }
  })

  clipboard.on('success', (e) => {
    message.success('复制成功！')
    e.clearSelection()
  })

  clipboard.on('error', (e) => {
    message.error('复制失败！')
  })
})

onUnmounted(() => {
  clipboard?.destroy()
})
</script>

<template>
  <n-card title="AI接口">
    <div>AI接口调用</div>
    <div class="flex pt-2">
      <n-input
        v-model:value="contentInput"
        type="textarea"
        placeholder="请输入文本向我提问吧"
      />
      <x-button @click="openAi" class="w-101">请求接口</x-button>
    </div>
    <div
      :class="`markdown-body max-h-650 relative w-650 ${
        store.theme === 'dark' ? '__dark' : ''
      }`"
    >
      <div v-html="markdownParser.render(content)"></div>
    </div>
  </n-card>
</template>

<style scoped>
.code-block {
  position: relative;
  margin-bottom: 16px;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
}

.copy-button:hover {
  background-color: #0056b3;
}
</style>
