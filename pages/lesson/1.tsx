import { createLessonPageComponent } from '../../src/LessonPage';
import {
  TLessonType,
  lessonPageData,
} from '../../components/Lessons/Lessons/L1/Lesson';

const Lesson1Page = createLessonPageComponent(1, TLessonType, lessonPageData);

export default Lesson1Page;
