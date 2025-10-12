import { CourseSectionT } from "./course-section.model";
import type { InstructorT } from "./instructor.model";
import type { PaginationT } from "./shared.model";

export interface CourseT {
  id: string;
  title: string;
  description: string;
  instructor: InstructorT;
  price: number;
  thumbnail: string;
  category: string;
  studentsCount?: number;
  createdAt: string;
  lessonsCount?: number;
  isPublished?: boolean
}

export interface CourseEnrollmentT {
  id?: string;
  progressPercentage: number,
  completedLessonsCount: number,
  isCompleted: boolean,
  lastActivityAt: string;
  enrolledAt?: string;
}

export interface CourseDataT {
  courses: CourseT[];
  pagination: PaginationT;
}

export interface CourseWithSectionsT {
  course: CourseT;
  sections: CourseSectionT[]
}

export interface StudentCourseT {
  course: CourseT;
  sections: CourseSectionT[];
  enrollment: CourseEnrollmentT
}