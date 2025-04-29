export type User = {
  binusian_id: string;
  student_id?: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  academic_program?: string;
};

export type Announcement = {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  description: string;
  createdAt: string;
};

export type Certificate = {
  id: string;
  title: string;
  type: string;
  method: string;
  createdAt: string;
  imageUrl: string;
};

export type Bootcamp = {
  id: string;
  name: string;
  type_id: string;
  types: BootcampType;
  category_id: string;
  categories: BootcampCategory;
  image_path: string;
  description: string;
  sessions: Session[];
};

export type BootcampCategory = {
  id: string;
  name: string;
  description: string;
};

export type BootcampType = {
  id: string;
  name: string;
};

export type SessionData = {
  id: string;
  link: string;
  description: string;
};

export type Option = {
  id: string;
  name: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export type SessionTest = {
  id: string;
  questions: Question[];
  scores: Result[];
};

export type Session = {
  id: string;
  bootCamp: Bootcamp;
  session_number: number;
  title: string;
  description: string;
  materials: SessionData[];
  preTest: SessionTest;
  postTest: SessionTest;
  assignment: Assignment;
};

export type Result = {
  id: string;
  userId: string;
  testId: string;
  score: number;
};

export type Assignment = {
  id: string;
  question: string;
  answer: string;
};
