<template lang="pug">
  div
    v-card(v-for='(task, i) in tasks' :key='i')
      v-card-title.headline(primary-title)
        | Task {{ task.number }}
      v-card-text
        | {{ task.title }}
</template>

<style lang="stylus" scoped></style>

<script src="./tasks.js"></script>
