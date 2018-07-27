<template lang='pug'>
  .film-details
    div(v-if='item')
      nav(aria-label="breadcrumb")
        ol.breadcrumb
          li.breadcrumb-item
            router-link(:to="{ name: 'index' }") Home
          li.breadcrumb-item.active(aria-current="page") {{item.attributes.canonicalTitle}}
      article.card
        .card-header {{ item.attributes.canonicalTitle }}
        table.table
          tbody
            tr
              td: img( :src='item.attributes.posterImage.medium')
              td {{ item.attributes.synopsis }}
            tr
              td(colspan=2 align='center')
                iframe(width="854" height="480" :src="`https://www.youtube.com/embed/${item.attributes.youtubeVideoId}?ecver=1`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>)
    .text-center(v-else)
      font-awesome-icon( icon="spinner" size="6x" spin)
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Item',

    head() {
      return {
        title: this.item && this.item.attributes.canonicalTitle
      }
    },

    fetch({ store, route }) {
      return store.dispatch('fetchItem', { id: route.params.id })
    },

    computed: mapState(['item'])
  }
</script>
