export interface LessonT {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  isPublished?: boolean
  video: {
    originalUrl: string;
  };
  isPreview?: boolean;
  duration: number;
  order: number
}