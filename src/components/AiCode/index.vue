<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { createMarkdownParser } from '@/utils/markdown'
import { useStoreTheme } from '@/store'
import { NSpace, NSpin } from 'naive-ui'

const markdownParser = createMarkdownParser(false)
const store = useStoreTheme()
const content = ref('')
const codeContent = ref('')
const url = import.meta.env.VITE_AI_API
let abortController: AbortController | null = null

const openAiCode = async (code: string) => {
  codeContent.value = code
  if (abortController) {
    abortController.abort()
  }
  abortController = new AbortController()
  const reqData = {
    inputs: {},
    query: code,
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
              if (obj.answer !== undefined) content.value += obj.answer
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
defineExpose({
  openAiCode
})
</script>

<template>
  <div
    :class="`markdown-body relative ${store.theme === 'dark' ? '__dark' : ''}`"
  >
    <div v-html="markdownParser.render(codeContent)"></div>
    <div v-html="markdownParser.render(content)"></div>
  </div>
  <div class="flex justify-center pt-6" v-if="!content.length">
    <n-space>
      <n-spin size="large" />
      <n-spin size="large" />
      <n-spin size="large" />
    </n-space>
  </div>
</template>
