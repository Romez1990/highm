<template lang="pug">
  v-row
    v-col
      v-card.mx-auto(max-width='350')
        v-card-title= 'Authorization'
        v-card-text
          v-form(
            ref='form'
            v-model='valid'
            @submit.prevent='submit'
            lazy-validation)
            v-text-field(
              v-model='username'
              :rules='usernameRules'
              label='Username'
              @input='resetBadRequest'
              required)
            v-text-field(
              v-model='password'
              :rules='passwordRules'
              type='password'
              label='Password'
              @input='resetBadRequest'
              required)
            v-btn.mr-4(type='submit' :disabled='!valid' color='success')
              | Login
</template>

<style lang="stylus" scoped></style>

<script src="./login.js"></script>
