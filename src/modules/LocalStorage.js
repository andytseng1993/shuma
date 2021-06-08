export default function (KEY) {
  return {
    get () {
      return JSON.parse(window.localStorage.getItem(KEY) || '[]')
    },
    set (data) {
      window.localStorage.setItem(KEY, JSON.stringify(data))
    }
  }
}
