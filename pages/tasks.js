import { createComponent, ref } from '@vue/composition-api';
import isAuthorized from '~/mixins/isAuthorized';

export default createComponent({
  mixins: [isAuthorized],
  setup() {
    const dialog = ref(false);

    const tasks = [
      {
        number: 1,
        title: 'Matrices',
      },
      {
        number: 2,
        title: 'Also matrices',
      },
      {
        number: 1,
        title: 'Matrices as well',
      },
    ];

    return {
      dialog,
      tasks,
    };
  },
});
