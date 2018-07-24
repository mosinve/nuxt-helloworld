<template>
  <div>
    <router-link v-for='item in items'
                 :to = '{ name: "id", params: { id: item.id }}'
                 append
                 :key = 'item.id'
    >
      <img :src='item.attributes.posterImage.small'>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Index',

  fetch({ store }) {
    return store.dispatch('fetchList')
  },

  computed: mapState(['items'])
}
</script>
