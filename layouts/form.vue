<template lang="pug">
  v-app(app)
    v-app-bar(app clipped-left)
      v-app-bar-nav-icon(@click='drawer = !drawer')
      v-toolbar-title= 'HighM'

      v-spacer

      v-btn(icon)
        v-icon= 'mdi-dots-vertical'

    v-navigation-drawer(app clipped v-model='drawer')
      v-list(dense nav)
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
            v-list-item(v-on='on' link)
              v-list-item-icon
                v-icon= 'apps'
              v-list-item-content
                v-list-item-title= 'Calculator'

    v-content
      v-container(fluid fill-height)
        nuxt

    v-footer(app)
      v-spacer
      span.text-center
        | HighM Romez &copy; {{ new Date().getFullYear() }}
      v-spacer
</template>

<script src="./form.js"></script>
