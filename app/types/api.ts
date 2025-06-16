import type { TestType } from "./enum";

export type User = {
  id: string;
  nim?: string;
  name: string;
  email: string;
  phone: string;
  major?: string;
  future_position:  string;
  skill: string;
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
  option: string;
  question_id: string;
  is_answer: boolean;
};

export type Question = {
  id: string;
  test_id: string;
  question: string;
  number: number;
  options: Option[];
};

export type SessionTest = {
  id: string;
  type: TestType;
  title: string;
  open_date: Date;
  close_date: Date;
  attempt_count: string;
};

export type StudentAttempt = {
  id: string;
  test_id: string;
  user_id:string;
  created_at: Date;
  done_at: Date;
  user: User;
}

export type Session = {
  id: string;
  bootcamp: Bootcamp;
  session_number: number;
  title: string;
  description: string;
  end_date: Date;
  start_attendance_date: Date;
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
  question_file_path: string;
  answer_file_path: string;
  is_shared: boolean;
};

export type AssignmentAnswer = {
  id: string;
  user_id: string;
  assignment_id:string;
  answer_file_path: string;
  user: User;
}

export type Attendance = {
  id: string;
  user: User;
  attendance_type: 'clock_in' | 'clock_out';
  finished_at: Date;
  session_id: string;
}

export type Enrollment = {
  id: string;
  user: User;
  bootcamp: Bootcamp;
  user_id: string;
  bootcamp_id: string;
}