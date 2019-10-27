export default {
  async created() {
    await this.$nextTick();
    if (this.$store.getters['user/token']) return;
    this.$router.replace('/login');
  },
};
