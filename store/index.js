import api from '../api'

export const state = () => ({
  items: {},
  item: null
})

export const actions = {
  async fetchList ({ commit }, { filters } = {}) {
    // возвращаем Promise через `store.dispatch()`
    // чтобы мы могли понять когда данные будут загружены
    const { data: { data: items} } = await api.getList({ filters })
    commit('setItems', { items })
  },
  async fetchItem ({ commit }, { id }) {
    commit('clearItem')
    const { data: { data: item } } = await api.getItem({ id })
    commit('setItem', { item })
  }
}

export const mutations = {
  setItems (state, { items }) {
    state.items = items
  },
  clearItem(state) {
    state.item = null
  },
  setItem (state, { item }) {
    state.item = item
  }
}
