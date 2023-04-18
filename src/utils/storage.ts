export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string)
}

export const removeStorage = (key: string) => {
  localStorage.removeItem(key)
}

export const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const getSessionStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) as string)
}

export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key)
}
