export interface InstructorSocialsT {
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
}

export interface InstructorT {
  _id: string;
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  title: string;
  socials: InstructorSocialsT;
}