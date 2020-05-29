import { createLessonPageComponent } from '../../LessonForm/LessonPageWrapper';
import { TLessonType, lessonPageData } from './Lesson';

const Lesson1Page = createLessonPageComponent(3, TLessonType, lessonPageData);

export default Lesson1Page;
