import { createComponent, ref } from '@vue/composition-api';
import isAuthorized from '~/mixins/isAuthorized';

export default createComponent({
  mixins: [isAuthorized],
  setup() {
    const dialog = ref(false);

    return {
      dialog,
    };
  },
});
