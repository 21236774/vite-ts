<script setup lang="ts">
import { ref } from 'vue'
import {
  FormInst,
  useMessage,
  NInput,
  NForm,
  NFormItem,
  NButton
} from 'naive-ui'
import { useRoute } from 'vue-router'
import { useStoreAuth } from '@/store'
import { useRouterPush } from '@/hooks'

interface Rules {
  required: boolean
  message: string
  trigger: string | string[]
}

const store = useStoreAuth()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const router = useRoute()

const { routerPush } = useRouterPush()

const formValue = ref({
  user: {
    account: '',
    password: ''
  }
})

const account: Rules = {
  required: true,
  trigger: 'input',
  message: '账号有误'
}
const password: Rules = {
  required: true,
  message: '密码有误',
  trigger: 'input'
}
const rules = { user: { account, password } }

const handleValidateClick = (e?: MouseEvent): void => {
  e && e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const {
        account,
        password
      }: { account: string | number; password: string | number } =
        formValue.value.user
      const isLogin = store.userPwdLogin({ account, password })
      if (isLogin) {
        message.success('登录成功')
        if (router.query?.redirect)
          routerPush({ path: router.query?.redirect + '' })
        else routerPush({ path: import.meta.env.VITE_ROUTE_HOME_PATH })
      } else {
        message.error('账号密码错误')
      }
    } else {
      message.error('账号密码错误')
    }
  })
}
const handleKeyup = (e: KeyboardEvent): void => {
  e?.keyCode === 13 && handleValidateClick()
}
</script>

<template>
  <div class="login-box">
    <ul class="bg-bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      class="w-1/6 absolute inset-0 m-auto h-1/4"
      label-align="left"
      size="medium"
    >
      <n-form-item label="账号" path="user.account">
        <n-input
          v-model:value="formValue.user.account"
          placeholder="输入账号"
        />
      </n-form-item>
      <n-form-item label="密码" path="user.password">
        <n-input
          v-model:value="formValue.user.password"
          type="password"
          show-password-on="mousedown"
          @keyup="handleKeyup"
          placeholder="输入密码"
          :maxlength="8"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          type="info"
          class="bg-info w-full mt-1.5"
          attr-type="button"
          @click="handleValidateClick"
        >
          登录
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<style lang="less" scoped>
@import url(@/assets/styles/login.less);
</style>
