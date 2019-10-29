<template lang="pug">
  v-app(app)
    v-app-bar(app clipped-left)
      v-app-bar-nav-icon(@click='drawer = !drawer')
      v-toolbar-title= 'HighM'

      v-spacer

      v-tooltip(bottom)
        template(v-slot:activator='{ on }')
          v-btn(v-on='on' @click='calculator = true' icon)
            v-icon= 'apps'
        span= 'Calculator'
      v-dialog(model='calculator' width='400' persistent hide-overlay)
        v-card
          v-card-title.headline(primary-title)
            p= 'Calculator'
          v-card-text.pa-0
            iframe(
              width='400'
              height='533'
              frameborder='0'
              src='/calculator.html')
        template(v-slot:activator='{ on }')
          v-btn(v-on='on' @click='calculator = true' icon)
            v-icon= 'apps'

      v-btn(icon)
        v-icon= 'mdi-dots-vertical'

    v-navigation-drawer(app clipped v-model='drawer')
      v-list(dense nav)
        v-list-item(v-for='task in tasks' :key='task.number' link)
          v-list-item-icon= '{{ task.number }}'
          v-list-item-content
            v-list-item-title= '{{ task.title }}'

    v-content
      v-container(fluid fill-height)
        nuxt

    v-footer(app)
      v-spacer
      span.text-center
        | HighM Romez &copy; {{ new Date().getFullYear() }}
      v-spacer
</template>

<script src="./default.js"></script>
