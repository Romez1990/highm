import { createComponent, ref } from '@vue/composition-api';
import movableDialog from '~/mixins/movableDialog';

export default createComponent({
  mixins: [movableDialog],
  setup(_, { root }) {
    root.$vuetify.theme.dark = true;

    const dark = ref(false);
    const drawer = ref(true);
    const calculator = ref(false);

    return {
      dark,
      drawer,
      calculator,
    };
  },
});
