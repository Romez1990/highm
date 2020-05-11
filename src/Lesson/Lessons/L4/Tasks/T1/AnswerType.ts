import { object, number } from 'yup';
import { AnswerBase } from '../../../../Answer';
import { intermediateResults, IntermediateResult } from '../IntermediateResult';

export interface Answer1Type extends AnswerBase {
  intermediateResults: IntermediateResult<number>[];
  result: number | '';
}

const validationSchema1 = object().shape({
  intermediateResults,
  result: number().required('Это поле является обязательным'),
});

const initialValues1: Answer1Type = {
  result: '',
  intermediateResults: new Array<IntermediateResult<number>>(11).fill({
    x: '',
    y: '',
  }),
};

export { validationSchema1, initialValues1 };
