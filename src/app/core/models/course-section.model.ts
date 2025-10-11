import { LessonT } from "./lesson.model";

export interface CourseSectionT {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  lessonsCount?: number;
  order: number;
  isPublished?: boolean;
  lessons: LessonT[];
}