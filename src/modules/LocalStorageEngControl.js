export default function (KEY) {
  return {
    get () {
      return JSON.parse(window.localStorage.getItem(KEY) || 'true')
    },
    set (val) {
      window.localStorage.setItem(KEY, JSON.stringify(val))
    }
  }
}
