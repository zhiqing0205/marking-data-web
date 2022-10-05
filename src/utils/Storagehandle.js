const lsa = window.localStorage
export default {
    get(key) {
        try {
            return JSON.parse(lsa.getItem(key))
        } catch (err) {
            return null
        }
    },
    set(key, val) {
        lsa.setItem(key, JSON.stringify(val))
    },
    clear() {
        lsa.clear()
    },
    keys() {
        return lsa.keys()
    },
    remove(key) {
        lsa.removeItem(key)
    }
}