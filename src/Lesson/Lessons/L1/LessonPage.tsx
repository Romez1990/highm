import { createLessonPageComponent } from '../../LessonForm/LessonPageWrapper';
import { TLessonType, lessonPageData } from './Lesson';

const Lesson1Page = createLessonPageComponent(1, TLessonType, lessonPageData);

export default Lesson1Page;
