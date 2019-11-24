import { createComponent, ref, onMounted } from '@vue/composition-api';
import movableDialog from '~/mixins/movableDialog';

export default createComponent({
  mixins: [movableDialog],
  setup(_, { root }) {
    root.$vuetify.theme.dark = false;

    const dark = ref(false);
    const drawer = ref(true);
    const calculator = ref(false);

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
        number: 3,
        title: 'Matrices as well',
      },
    ];

    onMounted(() => {
      setTimeout(() => {
        calculator.value = true;
      }, 500);
    });

    return {
      dark,
      drawer,
      calculator,
      tasks,
    };
  },
});
