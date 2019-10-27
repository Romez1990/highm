import nonAuthorized from '~/mixins/nonAuthorized';

let badRequest = false;

export default {
  mixins: [nonAuthorized],
  data: () => ({
    valid: true,
    username: '',
    password: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length < 128 || 'Max 128 characters',
      () => !badRequest || 'Incorrect username or password',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length < 128 || 'Max 128 characters',
      () => !badRequest || 'Incorrect username or password',
    ],
  }),
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;

      const result = await this.$store.dispatch('user/login', {
        username: this.username,
        password: this.password,
      });

      if (!result) {
        badRequest = true;
        this.$refs.form.validate();
        return;
      }

      this.$router.push('/');
    },
    resetBadRequest() {
      badRequest = false;
      this.$refs.form.validate();
    },
  },
};
