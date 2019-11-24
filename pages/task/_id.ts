import { createComponent } from '@vue/composition-api';

export default createComponent({
  setup(_, { root }) {
    const params = root.$router.currentRoute.params;

    return {
      params,
    };
  },
});
