const BOBLOG_TOKEN = 'BOBLOG_TOKEN'

export function getToken() {
  return localStorage.getItem(BOBLOG_TOKEN)
}
export function setToken(val) {
  return localStorage.setItem('BOBLOG_TOKEN', val)
}
