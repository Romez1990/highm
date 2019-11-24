import { createComponent, onBeforeMount } from '@vue/composition-api';

export default createComponent({
  setup(_, { root }) {
    onBeforeMount(async () => {
      await root.$nextTick();
      root.$router.replace(
        root.$store.getters['user/token'] ? '/task' : '/login',
      );
    });
  },
});
