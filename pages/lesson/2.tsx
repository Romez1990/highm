import { createLessonPageComponent } from '../../src/LessonPage';
import {
  TLessonType,
  lessonPageData,
} from '../../components/Lessons/Lessons/L2/Lesson';

const Lesson1Page = createLessonPageComponent(2, TLessonType, lessonPageData);

export default Lesson1Page;
