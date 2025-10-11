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

export interface CourseDataT {
  courses: CourseT[];
  pagination: PaginationT;
}